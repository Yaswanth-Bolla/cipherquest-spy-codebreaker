
import { createClient } from '@supabase/supabase-js';
import { supabase as configuredSupabase } from '@/integrations/supabase/client';

export const supabase = configuredSupabase;

export type LeaderboardEntry = {
  id: string;
  name: string;
  completedLevels: number;
  totalTime: string;
  rank: string;
  created_at?: string;
};

export async function getLeaderboard(): Promise<LeaderboardEntry[]> {
  try {
    const { data, error } = await supabase
      .from('leaderboard')
      .select('*');

    if (error) {
      console.error('Error fetching leaderboard:', error);
      return [];
    }

    return data.map(entry => ({
      id: entry.id,
      name: entry.name,
      completedLevels: entry.completedlevels,
      totalTime: entry.totaltime,
      rank: entry.rank,
      created_at: entry.created_at
    }));
  } catch (error) {
    console.error('Exception fetching leaderboard:', error);
    return [];
  }
}

// Function to update user's progress
export async function updateUserProgress(completedLevel: number, totalTime: string): Promise<void> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('No authenticated user');

    const { error } = await supabase
      .from('profiles')
      .update({
        completed_levels: supabase.sql`array_append(completed_levels, ${completedLevel})`,
        total_time: totalTime
      })
      .eq('id', user.id);

    if (error) {
      console.error('Error updating user progress:', error);
    }
  } catch (error) {
    console.error('Exception updating user progress:', error);
  }
}
