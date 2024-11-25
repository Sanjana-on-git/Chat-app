import React from 'react';
import { Users } from 'lucide-react';
import { useChatStore } from '../store/chat';

export default function UserList() {
  const users = useChatStore((state) => state.users);

  return (
    <div className="border-l border-gray-200 bg-gray-50 p-4">
      <div className="mb-4 flex items-center gap-2">
        <Users className="h-5 w-5 text-gray-500" />
        <h2 className="font-semibold text-gray-700">Online Users</h2>
      </div>
      <div className="space-y-2">
        {users.map((user) => (
          <div
            key={user.id}
            className="flex items-center gap-2 rounded-lg bg-white p-2"
          >
            <div className="h-2 w-2 rounded-full bg-green-500" />
            <span className="text-sm">{user.username}</span>
          </div>
        ))}
      </div>
    </div>
  );
}