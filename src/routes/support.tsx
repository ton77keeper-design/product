import { createFileRoute } from '@tanstack/react-router';
import { AppShell } from '@/components/AppShell';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Send } from 'lucide-react';
import { useAppStore } from '@/lib/store';

export const Route = createFileRoute('/support')({ 
  component: SupportPage,
});

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: number;
}

const initialMessages: Message[] = [
  {
    id: '1',
    text: 'Привет! 👋 Как я могу вам помочь?',
    isUser: false,
    timestamp: Date.now(),
  },
];

function SupportPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const { addNotification } = useAppStore();

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessage: Message = {
      id: Math.random().toString(),
      text: input,
      isUser: true,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput('');

    // Simulate bot response
    setTimeout(() => {
      const responses = [
        'Спасибо за ваше сообщение! Мы скоро ответим.',
        'Я помогу вам решить эту проблему.',
        'Благодарим за обратную связь!',
      ];
      const response: Message = {
        id: Math.random().toString(),
        text: responses[Math.floor(Math.random() * responses.length)],
        isUser: false,
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, response]);
    }, 500);
  };

  return (
    <AppShell>
      <div className="max-w-2xl mx-auto h-screen flex flex-col bg-white dark:bg-gray-900">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-green-600 text-white p-4 flex items-center gap-3"
        >
          <MessageCircle className="w-6 h-6" />
          <div>
            <h1 className="text-lg font-bold">Поддержка</h1>
            <p className="text-xs text-green-100">Онлайн</p>
          </div>
        </motion.div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, idx) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs px-4 py-2 rounded-lg ${
                  msg.isUser
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-800'
                }`}
              >
                <p>{msg.text}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Input */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-800">
          <div className="flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Введите сообщение..."
              className="flex-1 px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg dark:bg-gray-800 focus:outline-none focus:border-green-600"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSend}
              className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-lg"
            >
              <Send className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
