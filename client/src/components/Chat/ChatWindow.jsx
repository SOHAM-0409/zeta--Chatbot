// src/components/Chat/ChatWindow.jsx — Chat Display Area
// Shows all messages and auto-scrolls to the bottom on new messages.

import { useEffect, useRef } from 'react'
import MessageBubble from './MessageBubble'

const ChatWindow = ({ messages, loading }) => {
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-6 px-4 py-10 md:px-6">
      {messages.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="mb-6 rounded-3xl border border-violet-500/20 bg-violet-500/10 px-5 py-2 text-sm text-violet-300">
            Zeta AI Assistant
          </div>

          <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-white md:text-5xl">
            Build, brainstorm, learn, and create faster.
          </h1>

          <p className="mt-5 max-w-xl text-gray-400 leading-7">
            Zeta helps you write code, generate ideas, solve problems, and automate repetitive work.
          </p>
        </div>
      )}

      {messages.map((msg, idx) => (
        <MessageBubble key={idx} message={msg} />
      ))}
      {loading && (
        <div className="glass flex w-fit items-center gap-3 rounded-2xl px-5 py-4 text-gray-300">
          <div className="h-2 w-2 animate-bounce rounded-full bg-violet-400"></div>
          <div className="h-2 w-2 animate-bounce rounded-full bg-cyan-400 [animation-delay:0.15s]"></div>
          <div className="h-2 w-2 animate-bounce rounded-full bg-white [animation-delay:0.3s]"></div>
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  )
}

export default ChatWindow