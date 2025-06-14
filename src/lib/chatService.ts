
import { supabase } from '@/integrations/supabase/client';

export async function sendChatMessage(message: string): Promise<string> {
  try {
    const { data, error } = await supabase.functions.invoke('chat', {
      body: { message },
    });

    if (error) {
      console.error('Chat service error:', error);
      throw new Error('Failed to send message to chat service');
    }

    return data.response || 'I apologize, but I couldn\'t process your request.';
  } catch (error) {
    console.error('Error calling chat service:', error);
    throw error;
  }
}
