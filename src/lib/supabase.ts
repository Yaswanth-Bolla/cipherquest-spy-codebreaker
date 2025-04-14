
import { createClient } from '@supabase/supabase-js';

// Get environment variables with fallback for development
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Check if we have the required values
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.');
}

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
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
  try {
    const { data, error } = await supabase
      .from('leaderboard')
      .select('*')
      .order('completedLevels', { ascending: false });

    if (error) {
      console.error('Error fetching leaderboard:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Exception fetching leaderboard:', error);
    return [];
  }
}

// Function to add a new leaderboard entry
export async function addLeaderboardEntry(entry: Omit<LeaderboardEntry, 'id' | 'created_at'>): Promise<LeaderboardEntry | null> {
  try {
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
  } catch (error) {
    console.error('Exception adding leaderboard entry:', error);
    return null;
  }
}

// Function to update a leaderboard entry
export async function updateLeaderboardEntry(id: number, updates: Partial<LeaderboardEntry>): Promise<LeaderboardEntry | null> {
  try {
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
  } catch (error) {
    console.error('Exception updating leaderboard entry:', error);
    return null;
  }
}
