import { useEffect } from 'react';
import { ChatSidebar } from '@/components/ChatSidebar';
import { ChatMessages } from '@/components/ChatMessages';
import { ChatInput } from '@/components/ChatInput';
import { ChatHeader } from '@/components/ChatHeader';
import { useAuth } from '@/lib/auth-context';
import { useChatStore } from '@/lib/chat-store';
import { fetchUserChats } from '@/lib/chat-db';
import { Navigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

export default function ChatPage() {
  const { user, loading } = useAuth();
  const { setChats, reset } = useChatStore();

  useEffect(() => {
    if (user) {
      fetchUserChats(user.id).then(setChats);
    } else {
      reset();
    }
  }, [user]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      <ChatSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <ChatHeader />
        <ChatMessages />
        <ChatInput />
      </div>
    </div>
  );
}
