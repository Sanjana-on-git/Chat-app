import React from 'react';
import { format } from 'date-fns';
import { useChatStore } from '../store/chat';

interface ChatMessageProps {
  id: number;
  userId: string;
  username: string;
  text: string;
  timestamp: string;
}

export default function ChatMessage({
  userId,
  username,
  text,
  timestamp,
}: ChatMessageProps) {
  const currentUsername = useChatStore((state) => state.username);
  const isOwnMessage = username === currentUsername;

  return (
    <div
      className={`flex ${
        isOwnMessage ? 'justify-end' : 'justify-start'
      } mb-4`}
    >
      <div
        className={`max-w-[70%] rounded-lg px-4 py-2 ${
          isOwnMessage
            ? 'bg-primary text-white'
            : 'bg-gray-100 text-gray-900'
        }`}
      >
        {!isOwnMessage && (
          <span className="block text-sm font-semibold">{username}</span>
        )}
        <p className="text-sm">{text}</p>
        <span className="mt-1 block text-xs opacity-75">
          {format(new Date(timestamp), 'HH:mm')}
        </span>
      </div>
    </div>
  );
}