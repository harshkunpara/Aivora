import { Plus, MessageSquare, PanelLeftClose, Sparkles, LogOut, Shield } from 'lucide-react';
import { useChatStore } from '@/lib/chat-store';
import { useAuth } from '@/lib/auth-context';
import { motion, AnimatePresence } from 'framer-motion';
import { createDbChat, fetchChatMessages } from '@/lib/chat-db';
import { useNavigate } from 'react-router-dom';

export function ChatSidebar() {
  const { chats, activeChatId, createChat, setActiveChat, sidebarOpen, toggleSidebar, setMessages } = useChatStore();
  const { user, role, signOut } = useAuth();
  const navigate = useNavigate();
  const isAdmin = role === 'admin';

  const handleNewChat = async () => {
    if (!user) return;
    const dbId = await createDbChat(user.id, 'New Chat');
    if (dbId) {
      createChat(dbId, 'New Chat');
    }
  };

  const handleSelectChat = async (chatId: string) => {
    setActiveChat(chatId);
    const messages = await fetchChatMessages(chatId);
    setMessages(chatId, messages);
  };

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

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
              {isAdmin && (
                <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/15 text-primary text-[10px] font-semibold uppercase tracking-wide">
                  <Shield className="h-3 w-3" />
                  Admin
                </span>
              )}
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
              onClick={handleNewChat}
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
                onClick={() => handleSelectChat(chat.id)}
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
          <div className="p-3 border-t border-border space-y-2">
            <div className="text-xs text-muted-foreground truncate px-1">
              {user?.email}
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
            >
              <LogOut className="h-3.5 w-3.5" />
              Sign Out
            </button>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
