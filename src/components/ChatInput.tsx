import { useState, useRef, useEffect } from 'react';
import { Send, Loader2 } from 'lucide-react';
import { useChatStore } from '@/lib/chat-store';
import { streamMockResponse } from '@/lib/mock-ai';

export function ChatInput() {
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { activeChatId, createChat, addMessage, updateLastAssistantMessage, isStreaming, setIsStreaming, canSendMessage, totalMessages, maxMessages } = useChatStore();

  const remaining = maxMessages - totalMessages;

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 160) + 'px';
    }
  }, [input]);

  const handleSend = async () => {
    const text = input.trim();
    if (!text || isStreaming) return;

    if (!canSendMessage()) return;

    let chatId = activeChatId;
    if (!chatId) {
      chatId = createChat();
    }

    setInput('');
    addMessage(chatId, 'user', text);
    setIsStreaming(true);

    // Add empty assistant message
    addMessage(chatId, 'assistant', '');

    await streamMockResponse(
      (chunk) => updateLastAssistantMessage(chatId!, chunk),
      () => setIsStreaming(false)
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const limitReached = !canSendMessage();

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
              <p className="text-xs text-muted-foreground">
                {remaining} message{remaining !== 1 ? 's' : ''} remaining
              </p>
              <p className="text-xs text-muted-foreground">
                Shift+Enter for new line
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
