import { Plus, MessageSquare, PanelLeftClose, Sparkles } from 'lucide-react';
import { useChatStore } from '@/lib/chat-store';
import { motion, AnimatePresence } from 'framer-motion';

export function ChatSidebar() {
  const { chats, activeChatId, createChat, setActiveChat, sidebarOpen, toggleSidebar } = useChatStore();

  return (
    <AnimatePresence>
      {sidebarOpen && (
        <motion.aside
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 280, opacity: 1 }}
          exit={{ width: 0, opacity: 0 }}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
          className="h-full flex flex-col overflow-hidden border-r border-border"
          style={{ background: 'hsl(var(--sidebar-bg))' }}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <span className="font-display font-semibold text-foreground text-lg">Aivora</span>
            </div>
            <button
              onClick={toggleSidebar}
              className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            >
              <PanelLeftClose className="h-4 w-4" />
            </button>
          </div>

          {/* New Chat */}
          <div className="p-3">
            <button
              onClick={createChat}
              className="flex items-center gap-2 w-full px-3 py-2.5 rounded-lg border border-border text-secondary-foreground hover:bg-secondary transition-colors text-sm font-medium"
            >
              <Plus className="h-4 w-4" />
              New Chat
            </button>
          </div>

          {/* Chat List */}
          <div className="flex-1 overflow-y-auto scrollbar-thin px-3 pb-3 space-y-1">
            {chats.map((chat) => (
              <button
                key={chat.id}
                onClick={() => setActiveChat(chat.id)}
                className={`flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm text-left transition-colors truncate ${
                  chat.id === activeChatId
                    ? 'bg-secondary text-foreground'
                    : 'text-muted-foreground hover:bg-secondary/50 hover:text-secondary-foreground'
                }`}
              >
                <MessageSquare className="h-3.5 w-3.5 shrink-0" />
                <span className="truncate">{chat.title}</span>
              </button>
            ))}
          </div>

          {/* Footer */}
          <div className="p-3 border-t border-border">
            <div className="text-xs text-muted-foreground text-center">
              Aivora — Mock AI Mode
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
