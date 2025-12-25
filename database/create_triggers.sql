CREATE OR REPLACE FUNCTION create_user_points_on_signup()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO user_points (user_id, points, streak)
  VALUES (NEW.id, 0, 0);
  
  INSERT INTO notifications (user_id, message, type)
  VALUES (NEW.id, 'Welcome to Flowva! Start earning points today.', 'success');
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION create_user_points_on_signup();