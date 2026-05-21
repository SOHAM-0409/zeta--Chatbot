// src/components/Chat/InputBar.jsx — Message Input
// Text area with send button. Supports Enter to send, Shift+Enter for newline.

import { useState } from 'react'
import { motion } from 'framer-motion'
import { SendHorizonal } from 'lucide-react'

const InputBar = ({ onSend, loading }) => {
  const [prompt, setPrompt] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!prompt.trim()) return

    onSend(prompt)
    setPrompt('')
  }

  return (
    <div className="sticky bottom-0 w-full bg-gradient-to-t from-[#070b14] to-transparent pt-6">
      <form
        onSubmit={handleSubmit}
        className="glass mx-auto flex max-w-4xl items-end gap-3 rounded-3xl p-3 shadow-2xl"
      >
        <textarea
          rows={1}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Ask Zeta anything..."
          className="max-h-40 flex-1 resize-none bg-transparent px-3 py-3 text-white outline-none placeholder:text-gray-500"
        />

        <motion.button
          whileTap={{ scale: 0.94 }}
          whileHover={{ scale: 1.05 }}
          disabled={loading}
          className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-cyan-500 shadow-lg shadow-violet-500/30 transition"
        >
          <SendHorizonal size={18} />
           </motion.button>
      </form>
    </div>
  )
}

export default InputBar