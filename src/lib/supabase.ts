
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

// Add extensive logging!
export async function getLeaderboard(): Promise<LeaderboardEntry[]> {
  try {
    const { data, error } = await supabase
      .from('leaderboard')
      .select('*')
      .order('completedlevels', { ascending: false })
      .order('totaltime', { ascending: true });

    if (error) {
      console.error('Error fetching leaderboard:', error);
      return [];
    }

    if (!data) {
      console.warn('No leaderboard data returned from Supabase.');
      return [];
    }

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

// LOG EVERY STEP
export async function updateUserProgress(newCompletedLevel: number, totalTime: string): Promise<void> {
  try {
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError) {
      console.error('Failed to fetch supabase user:', authError);
      return;
    }
    if (!user) {
      console.warn('No authenticated user, skipping progress update');
      return;
    }
    console.log('User for progress update:', user);

    // Fetch the profile
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .select('completed_levels')
      .eq('id', user.id)
      .maybeSingle();

    if (profileError) {
      console.error('Error fetching user profile:', profileError);
      return;
    }

    if (!profileData) {
      console.error('No profile data found for user:', user.id);
      return;
    }

    // Always push new levels into completed_levels if not present
    const existingLevels: number[] = Array.isArray(profileData.completed_levels)
      ? profileData.completed_levels
      : [];
    const updatedLevels = existingLevels.includes(newCompletedLevel)
      ? existingLevels
      : [...existingLevels, newCompletedLevel];

    // Now update profile
    const { error: updateError } = await supabase
      .from('profiles')
      .update({
        completed_levels: updatedLevels,
        total_time: totalTime
      })
      .eq('id', user.id);

    if (updateError) {
      console.error('Error updating user progress:', updateError);
    } else {
      console.log('Successfully updated user progress:', { updatedLevels, totalTime });
    }
  } catch (error) {
    console.error('Exception updating user progress:', error);
  }
}

// Function to calculate player rank (15-mission version)
function getPlayerRank(completedCount: number): string {
  if (completedCount >= 13) return "Master Cryptographer";
  if (completedCount >= 10) return "Senior Agent";
  if (completedCount >= 7) return "Field Operative";
  if (completedCount >= 4) return "Analyst";
  if (completedCount >= 1) return "Junior Agent";
  return "Recruit";
}

// Function to format time from ms to HH:MM:SS
function formatTime(milliseconds: number): string {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// Receives the ARRAY of completed levels and calculates time as before.
export async function updateLeaderboardEntry(completedLevels: number[], totalTimeMs: number): Promise<void> {
  try {
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError) {
      console.error('Failed to fetch supabase user:', authError);
      return;
    }
    if (!user) {
      console.warn('No authenticated user, skipping leaderboard update');
      return;
    }
    const totalTime = formatTime(totalTimeMs);
    const rank = getPlayerRank(completedLevels.length);
    console.log('Updating leaderboard for user:', user.id, { completedLevels, totalTime, rank });

    // Update the user profile progress
    await updateUserProgress(
      completedLevels[completedLevels.length - 1], // send the latest completed level
      totalTime
    );
    // Optionally: other leaderboard data could be synced here if your schema requires!

    console.log('Leaderboard update completed for user:', user.email, { completedLevels, totalTime, rank });
  } catch (error) {
    console.error('Exception updating leaderboard:', error);
  }
}
