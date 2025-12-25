CREATE OR REPLACE FUNCTION claim_daily_points(user_uuid UUID)
RETURNS JSON AS $$
DECLARE
  current_points INTEGER;
  current_streak INTEGER;
  last_check DATE;
  points_to_add INTEGER := 5;
  new_points INTEGER;
BEGIN
  SELECT points, streak, last_checkin 
  INTO current_points, current_streak, last_check
  FROM user_points 
  WHERE user_id = user_uuid;
  
  IF NOT FOUND THEN
    INSERT INTO user_points (user_id, points, streak, last_checkin)
    VALUES (user_uuid, points_to_add, 1, CURRENT_DATE)
    RETURNING points INTO new_points;
    
    INSERT INTO points_transactions (user_id, points, type, reason)
    VALUES (user_uuid, points_to_add, 'earned', 'Daily check-in (first time)');
    
    RETURN json_build_object(
      'success', true,
      'points', new_points,
      'streak', 1,
      'message', 'First check-in completed!'
    );
  END IF;
  
  IF last_check = CURRENT_DATE THEN
    RETURN json_build_object(
      'success', false, 
      'message', 'Already claimed today',
      'points', current_points,
      'streak', current_streak
    );
  END IF;
  
  IF last_check = CURRENT_DATE - INTERVAL '1 day' THEN
    UPDATE user_points 
    SET points = points + points_to_add, streak = streak + 1, last_checkin = CURRENT_DATE, updated_at = NOW()
    WHERE user_id = user_uuid
    RETURNING points, streak INTO new_points, current_streak;
  ELSE
    UPDATE user_points 
    SET points = points + points_to_add, streak = 1, last_checkin = CURRENT_DATE, updated_at = NOW()
    WHERE user_id = user_uuid
    RETURNING points, streak INTO new_points, current_streak;
  END IF;
  
  INSERT INTO points_transactions (user_id, points, type, reason)
  VALUES (user_uuid, points_to_add, 'earned', 'Daily check-in');
  
  RETURN json_build_object(
    'success', true,
    'points', new_points,
    'streak', current_streak,
    'message', 'Points claimed successfully'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;