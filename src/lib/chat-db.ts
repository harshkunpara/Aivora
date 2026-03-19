import { supabase } from '@/integrations/supabase/client';
import type { Chat, Message } from '@/lib/chat-store';

export async function fetchUserChats(userId: string): Promise<Chat[]> {
  const { data, error } = await supabase
    .from('chats')
    .select('*')
    .eq('user_id', userId)
    .order('updated_at', { ascending: false });

  if (error || !data) return [];

  return data.map((c) => ({
    id: c.id,
    title: c.title,
    messages: [],
    createdAt: new Date(c.created_at).getTime(),
    updatedAt: new Date(c.updated_at).getTime(),
  }));
}

export async function fetchChatMessages(chatId: string): Promise<Message[]> {
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .eq('chat_id', chatId)
    .order('created_at', { ascending: true });

  if (error || !data) return [];

  return data.map((m) => ({
    id: m.id,
    role: m.role as 'user' | 'assistant',
    content: m.content,
    timestamp: new Date(m.created_at).getTime(),
  }));
}

export async function createDbChat(userId: string, title: string): Promise<string | null> {
  const { data, error } = await supabase
    .from('chats')
    .insert({ user_id: userId, title })
    .select('id')
    .single();

  if (error || !data) return null;
  return data.id;
}

export async function updateChatTitle(chatId: string, title: string) {
  await supabase.from('chats').update({ title }).eq('id', chatId);
}

export async function insertMessage(chatId: string, userId: string, role: string, content: string): Promise<string | null> {
  const { data, error } = await supabase
    .from('messages')
    .insert({ chat_id: chatId, user_id: userId, role, content })
    .select('id')
    .single();

  if (error || !data) return null;
  return data.id;
}

export async function updateMessageContent(messageId: string, content: string) {
  await supabase.from('messages').update({ content }).eq('id', messageId);
}

export async function incrementMessageCount(userId: string): Promise<number | null> {
  const { data, error } = await supabase.rpc('increment_message_count', { _user_id: userId });
  if (error) return null;
  return data as number;
}
