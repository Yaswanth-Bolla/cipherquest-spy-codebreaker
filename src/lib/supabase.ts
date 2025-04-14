
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL as string,
  import.meta.env.VITE_SUPABASE_ANON_KEY as string
);

export type LeaderboardEntry = {
  id: number;
  name: string;
  completedLevels: number;
  totalTime: string;
  rank: string;
  created_at?: string;
};

// Function to get all leaderboard entries
export async function getLeaderboard(): Promise<LeaderboardEntry[]> {
  const { data, error } = await supabase
    .from('leaderboard')
    .select('*')
    .order('completedLevels', { ascending: false });

  if (error) {
    console.error('Error fetching leaderboard:', error);
    return [];
  }

  return data || [];
}

// Function to add a new leaderboard entry
export async function addLeaderboardEntry(entry: Omit<LeaderboardEntry, 'id' | 'created_at'>): Promise<LeaderboardEntry | null> {
  const { data, error } = await supabase
    .from('leaderboard')
    .insert(entry)
    .select()
    .single();

  if (error) {
    console.error('Error adding leaderboard entry:', error);
    return null;
  }

  return data;
}

// Function to update a leaderboard entry
export async function updateLeaderboardEntry(id: number, updates: Partial<LeaderboardEntry>): Promise<LeaderboardEntry | null> {
  const { data, error } = await supabase
    .from('leaderboard')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating leaderboard entry:', error);
    return null;
  }

  return data;
}
