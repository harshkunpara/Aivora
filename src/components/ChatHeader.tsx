import { PanelLeft } from 'lucide-react';
import { useChatStore } from '@/lib/chat-store';

export function ChatHeader() {
  const { sidebarOpen, toggleSidebar, getActiveChat } = useChatStore();
  const chat = getActiveChat();

  return (
    <header className="h-12 flex items-center gap-3 px-4 border-b border-border shrink-0">
      {!sidebarOpen && (
        <button
          onClick={toggleSidebar}
          className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
        >
          <PanelLeft className="h-4 w-4" />
        </button>
      )}
      <h1 className="text-sm font-medium text-foreground truncate">
        {chat?.title || 'Aivora'}
      </h1>
    </header>
  );
}
