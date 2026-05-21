// src/components/Layout/Navbar.jsx — Top Navigation Bar
// Shows the app logo, user email, and logout button.
import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'

const Navbar = () => {
  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/30 backdrop-blur-xl"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-cyan-500 shadow-lg shadow-violet-500/20">
            <Sparkles size={20} />
          </div>

          <div>
            <h1 className="text-xl font-semibold tracking-tight">Zeta</h1>
            <p className="text-xs text-gray-400">
              AI Assistant Platform
            </p>
             </div>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <div className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-300">
            API Online
          </div>

          <button className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm transition hover:bg-white/10">
            Upgrade
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export default Navbar