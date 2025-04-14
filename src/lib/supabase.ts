
import { createClient } from '@supabase/supabase-js';
import { supabase as configuredSupabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

// Use the already properly configured client from the integration
export const supabase = configuredSupabase;

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
