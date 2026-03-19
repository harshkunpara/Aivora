import { ChatSidebar } from '@/components/ChatSidebar';
import { ChatMessages } from '@/components/ChatMessages';
import { ChatInput } from '@/components/ChatInput';
import { ChatHeader } from '@/components/ChatHeader';

export default function ChatPage() {
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
