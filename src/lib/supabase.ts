
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

    // Fix: Instead of using supabase.sql, use a direct array append approach
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .select('completed_levels')
      .eq('id', user.id)
      .single();

    if (profileError) {
      console.error('Error fetching user profile:', profileError);
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

    // Get user's display name from profile or use email
    const { data: profileData } = await supabase
      .from('profiles')
      .select('first_name, last_name')
      .eq('id', user.id)
      .single();

    const displayName = profileData?.first_name && profileData?.last_name 
      ? `${profileData.first_name} ${profileData.last_name}`
      : user.email?.split('@')[0] || 'Anonymous Agent';

    const totalTime = formatTime(totalTimeMs);
    const rank = getPlayerRank(completedLevels);

    // Check if user already has a leaderboard entry
    const { data: existingEntry } = await supabase
      .from('leaderboard')
      .select('id')
      .eq('user_id', user.id)
      .single();

    if (existingEntry) {
      // Update existing entry
      const { error } = await supabase
        .from('leaderboard')
        .update({
          name: displayName,
          completedlevels: completedLevels,
          totaltime: totalTime,
          rank: rank
        })
        .eq('user_id', user.id);

      if (error) {
        console.error('Error updating leaderboard entry:', error);
      }
    } else {
      // Create new entry
      const { error } = await supabase
        .from('leaderboard')
        .insert({
          user_id: user.id,
          name: displayName,
          completedlevels: completedLevels,
          totaltime: totalTime,
          rank: rank
        });

      if (error) {
        console.error('Error creating leaderboard entry:', error);
      }
    }
  } catch (error) {
    console.error('Exception updating leaderboard:', error);
  }
}
