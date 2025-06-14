
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
    // Since leaderboard is a view, we can query it directly
    const { data, error } = await supabase
      .from('leaderboard')
      .select('*')
      .order('completedlevels', { ascending: false })
      .order('totaltime', { ascending: true });

    if (error) {
      console.error('Error fetching leaderboard:', error);
      return [];
    }

    if (!data) return [];

    return data.map(entry => ({
      id: entry.id || 'unknown',
      name: entry.name || 'Anonymous Agent',
      completedLevels: entry.completedlevels || 0,
      totalTime: entry.totaltime || '00:00:00',
      rank: entry.rank || 'Recruit',
      created_at: entry.created_at
    }));
  } catch (error) {
    console.error('Exception fetching leaderboard:', error);
    return [];
  }
}

// Function to update user's progress in profiles table
export async function updateUserProgress(completedLevel: number, totalTime: string): Promise<void> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      console.log('No authenticated user, skipping progress update');
      return;
    }

    // Get current profile data
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .select('completed_levels')
      .eq('id', user.id)
      .single();

    if (profileError) {
      console.error('Error fetching user profile:', profileError);
      return;
    }

    if (!profileData) {
      console.error('No profile data found for user');
      return;
    }

    // Append the new completed level to the existing array
    const updatedLevels = [...(profileData.completed_levels || [])];
    if (!updatedLevels.includes(completedLevel)) {
      updatedLevels.push(completedLevel);
    }

    // Update the profile with the new array
    const { error } = await supabase
      .from('profiles')
      .update({
        completed_levels: updatedLevels,
        total_time: totalTime
      })
      .eq('id', user.id);

    if (error) {
      console.error('Error updating user progress:', error);
    } else {
      console.log('Successfully updated user progress');
    }
  } catch (error) {
    console.error('Exception updating user progress:', error);
  }
}

// Function to calculate player rank based on completed missions
function getPlayerRank(completedCount: number): string {
  if (completedCount >= 45) return "Master Cryptographer";
  if (completedCount >= 35) return "Senior Agent";
  if (completedCount >= 25) return "Field Operative";
  if (completedCount >= 15) return "Analyst";
  if (completedCount >= 5) return "Junior Agent";
  return "Recruit";
}

// Function to format time from milliseconds to HH:MM:SS
function formatTime(milliseconds: number): string {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// Function to update leaderboard entry for current user
export async function updateLeaderboardEntry(completedLevels: number, totalTimeMs: number): Promise<void> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      console.log('No authenticated user, skipping leaderboard update');
      return;
    }

    const totalTime = formatTime(totalTimeMs);
    const rank = getPlayerRank(completedLevels);

    // Update user progress in profiles table
    await updateUserProgress(completedLevels, totalTime);
    
    console.log('Leaderboard update completed for user:', user.email);
  } catch (error) {
    console.error('Exception updating leaderboard:', error);
  }
}
