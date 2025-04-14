
import { supabase } from './supabase';

export async function setupSupabaseSchema() {
  try {
    // Check if Supabase is properly initialized
    if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
      console.warn('Supabase environment variables are not set. Skipping schema setup.');
      return false;
    }

    // Check if the leaderboard table exists
    const { data: tableExists, error } = await supabase
      .from('leaderboard')
      .select('*')
      .limit(1);

    // If table does not exist, create it (note: this approach won't work in production)
    // In production, you should use Supabase migrations or the Supabase dashboard
    if (!tableExists || error || tableExists.length === 0) {
      console.log('Creating leaderboard table...');
      
      // In a real app, you would create tables through Supabase dashboard or migrations
      // This is just for demonstration purposes
      const initialData = [
        { name: "Agent Shadow", completedLevels: 10, totalTime: "01:45:22", rank: "Master Cryptographer" },
        { name: "CodeBreaker", completedLevels: 9, totalTime: "02:10:45", rank: "Senior Agent" },
        { name: "CipherHunter", completedLevels: 8, totalTime: "02:30:18", rank: "Field Operative" },
        { name: "NightCoder", completedLevels: 7, totalTime: "02:55:40", rank: "Analyst" },
        { name: "BinaryPhantom", completedLevels: 6, totalTime: "03:15:50", rank: "Recruit" },
      ];
      
      // Insert initial data
      for (const entry of initialData) {
        await supabase.from('leaderboard').insert(entry);
      }
      
      console.log('Leaderboard data initialized');
    }
    
    return true;
  } catch (error) {
    console.error("Error setting up Supabase schema:", error);
    return false;
  }
}
