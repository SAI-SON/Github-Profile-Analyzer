import { Moon, Sun } from 'lucide-react'
import { motion } from 'framer-motion'

function ThemeToggle({ isDark, onToggle }) {
  return (
    <motion.button
      whileTap={{ scale: 0.94 }}
      whileHover={{ scale: 1.04 }}
      onClick={onToggle}
      type="button"
      className="glass inline-flex items-center gap-2 rounded-full border border-slate-300/80 bg-white/90 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:border-sky-300 hover:text-sky-800 dark:border-cyan-600/60 dark:bg-cyan-500/10 dark:text-cyan-50 dark:hover:border-cyan-400"
      aria-label="Toggle theme"
    >
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      <span>{isDark ? 'Light mode' : 'Dark mode'}</span>
    </motion.button>
  )
}

export default ThemeToggle
