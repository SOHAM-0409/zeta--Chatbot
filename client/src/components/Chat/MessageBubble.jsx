// src/components/Chat/MessageBubble.jsx — Individual Message
// Renders a single chat message differently for "user" vs "assistant".

import { motion } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
import { Bot, User } from 'lucide-react'

const MessageBubble = ({ message }) => {
  const isUser = message.role === 'user'

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={`flex w-full gap-4 ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      {!isUser && (
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-cyan-500 shadow-lg shadow-violet-500/20">
          <Bot size={18} />
        </div>
      )}

      <div
        className={`message-enter max-w-[82%] rounded-3xl px-5 py-4 text-[15px] leading-7 shadow-xl ${
          isUser
            ? 'bg-gradient-to-br from-violet-600 to-indigo-600 text-white'
            : 'glass text-gray-100'
        }`}
      >
        <ReactMarkdown>{message.content}</ReactMarkdown>
      </div>

      {isUser && (
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white/10 border border-white/10">
          <User size={18} />
        </div>
      )}
    </motion.div>
  )
}

export default MessageBubble