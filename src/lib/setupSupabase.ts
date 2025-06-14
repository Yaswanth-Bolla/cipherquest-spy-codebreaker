
import { supabase } from '@/integrations/supabase/client';

export async function setupSupabaseSchema() {
  try {
    // Check if we can query the leaderboard view
    const { data: leaderboardData, error } = await supabase
      .from('leaderboard')
      .select('*')
      .limit(1);

    if (error) {
      console.error('Error accessing leaderboard view:', error);
      return false;
    }

    // Check if profiles table is accessible
    const { data: profilesData, error: profilesError } = await supabase
      .from('profiles')
      .select('*')
      .limit(1);

    if (profilesError) {
      console.error('Error accessing profiles table:', profilesError);
      return false;
    }
    
    console.log('Supabase schema verification completed successfully');
    return true;
  } catch (error) {
    console.error("Error setting up Supabase schema:", error);
    return false;
  }
}
