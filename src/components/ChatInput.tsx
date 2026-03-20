import { useState, useRef, useEffect, useCallback } from 'react';
import { Send, Loader2 } from 'lucide-react';
import { useChatStore } from '@/lib/chat-store';
import { useAuth } from '@/lib/auth-context';
import { streamMockResponse } from '@/lib/mock-ai';
import { createDbChat, insertMessage, updateChatTitle, updateMessageContent, incrementMessageCount } from '@/lib/chat-db';

export function ChatInput() {
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { activeChatId, createChat, addMessage, updateLastAssistantMessage, isStreaming, setIsStreaming, setActiveChat } = useChatStore();
  const { user, profile, role, refreshProfile } = useAuth();

  const isAdmin = role === 'admin';
  const maxMessages = 10;
  const remaining = isAdmin ? Infinity : maxMessages - (profile?.message_count ?? 0);
  const limitReached = !isAdmin && remaining <= 0;

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 160) + 'px';
    }
  }, [input]);

  const handleSend = useCallback(async () => {
    const text = input.trim();
    if (!text || isStreaming || !user || limitReached) return;

    setInput('');

    let chatId = activeChatId;

    // Create chat in DB if needed
    if (!chatId) {
      const title = text.slice(0, 40) + (text.length > 40 ? '...' : '');
      const dbId = await createDbChat(user.id, title);
      if (!dbId) return;
      chatId = createChat(dbId, title);
    }

    // Increment message count
    await incrementMessageCount(user.id);
    await refreshProfile();

    // Insert user message in DB
    addMessage(chatId, 'user', text);
    await insertMessage(chatId, user.id, 'user', text);

    // Update chat title if first message
    const chat = useChatStore.getState().chats.find(c => c.id === chatId);
    if (chat && chat.messages.length === 1) {
      const title = text.slice(0, 40) + (text.length > 40 ? '...' : '');
      await updateChatTitle(chatId, title);
    }

    setIsStreaming(true);
    addMessage(chatId, 'assistant', '');

    // Insert placeholder assistant message to get ID
    const assistantMsgId = await insertMessage(chatId, user.id, 'assistant', '');

    let finalContent = '';
await streamMockResponse(
  (chunk) => {
    finalContent = chunk;
    updateLastAssistantMessage(chatId!, chunk);
  },
  async () => {
    setIsStreaming(false);
    if (assistantMsgId) {
      await updateMessageContent(assistantMsgId, finalContent);
    }
  }
);
  }, [input, isStreaming, user, limitReached, activeChatId]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="border-t border-border p-4">
      <div className="max-w-3xl mx-auto">
        {limitReached ? (
          <div className="text-center py-4">
            <div className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-primary/10 border border-primary/20">
              <span className="text-sm text-foreground font-medium">
                🚀 Upgrade to continue using Aivora
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              You've used all {maxMessages} free messages.
            </p>
          </div>
        ) : (
          <>
            <div className="relative flex items-end gap-2 rounded-2xl border border-border bg-secondary/50 p-2 focus-within:border-primary/50 transition-colors">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Message Aivora..."
                rows={1}
                disabled={isStreaming}
                className="flex-1 resize-none bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none px-2 py-1.5 max-h-40 scrollbar-thin"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isStreaming}
                className="shrink-0 p-2 rounded-xl bg-primary text-primary-foreground disabled:opacity-30 hover:opacity-90 transition-opacity"
              >
                {isStreaming ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </button>
            </div>
            <div className="flex justify-between mt-2 px-1">
              {!isAdmin && (
                <p className="text-xs text-muted-foreground">
                  {remaining} message{remaining !== 1 ? 's' : ''} remaining
                </p>
              )}
              <p className="text-xs text-muted-foreground ml-auto">
                Shift+Enter for new line
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
