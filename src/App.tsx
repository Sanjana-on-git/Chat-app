import React, { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { socket } from './lib/socket';
import { useChatStore } from './store/chat';
import ChatMessage from './components/ChatMessage';
import ChatInput from './components/ChatInput';
import UserList from './components/UserList';

function App() {
  const [isJoining, setIsJoining] = useState(true);
  const { messages, username, setUsername, addMessage, setMessages, addUser, removeUser } = useChatStore();

  useEffect(() => {
    socket.on('message', addMessage);
    socket.on('previousMessages', setMessages);
    socket.on('userJoined', addUser);
    socket.on('userLeft', ({ id }) => removeUser(id));

    return () => {
      socket.off('message');
      socket.off('previousMessages');
      socket.off('userJoined');
      socket.off('userLeft');
    };
  }, []);

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username) {
      socket.emit('join', username);
      setIsJoining(false);
    }
  };

  if (isJoining) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <form onSubmit={handleJoin} className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
          <h1 className="mb-6 text-2xl font-bold text-gray-900">Join Chat</h1>
          <input
            type="text"
            placeholder="Enter your username"
            value={username || ''}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
          <button
            type="submit"
            className="mt-4 w-full rounded-lg bg-primary py-2 font-medium text-white hover:bg-primary/90"
          >
            Join
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-white">
      <Toaster position="top-center" />
      <div className="flex flex-1 flex-col">
        <div className="flex-1 space-y-4 overflow-y-auto p-4">
          {messages.map((message) => (
            <ChatMessage key={message.id} {...message} />
          ))}
        </div>
        <ChatInput />
      </div>
      <UserList />
    </div>
  );
}

export default App;