'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase';

const supabase = createClient();

type Message = {
  id: number;
  role: 'user' | 'assistant';
  content: string;
};

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');

  async function addMessage() {
    if (!input.trim()) return;

    const newMessage: Message = {
      id: messages.length + 1,
      role: 'user',
      content: input,
    };
    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    setInput('');

    const { error } = await supabase
      .from('messages')
      .insert({ role: newMessage.role, content: newMessage.content });

    if (error) {
      console.error('Failed to save message:', error.message);
    }

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: updatedMessages.map(({ role, content }) => ({ role, content })),
      }),
    });
    const { reply } = await res.json();

    setMessages((prev) => [
      ...prev,
      { id: prev.length + 1, role: 'assistant', content: reply },
    ]);
  }

  return (
    <div className="max-w-xl mx-auto mt-10 flex flex-col gap-4 p-4">
      <div className="flex flex-col gap-2 border rounded-lg p-4 min-h-64">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <span
              className={`px-4 py-2 rounded-2xl text-sm max-w-xs ${
                msg.role === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}
            >
              {msg.content}
            </span>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          className="flex-1 border rounded-lg px-3 py-2 text-sm"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addMessage()}
        />
        <button
          onClick={addMessage}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm"
        >
          Send
        </button>
      </div>
    </div>
  );
}
