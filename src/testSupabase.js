import { supabase } from './services/supabase';

const testConnection = async () => {
  console.log('Testing Supabase connection...');
  
  try {
    const { data, error } = await supabase
      .from('rewards')
      .select('*')
      .limit(1);
    
    if (error) {
      console.error('❌ Error:', error);
    } else {
      console.log('✅ Success! Found rewards:', data);
    }
  } catch (err) {
    console.error('❌ Connection failed:', err);
  }
};

testConnection();