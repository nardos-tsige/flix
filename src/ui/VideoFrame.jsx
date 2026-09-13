import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ExternalLink } from 'lucide-react'

export default function VideoFrame({ videoKey, onClose }) {
  if (!videoKey) return null
  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[60] grid place-items-center p-4 sm:p-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/90 backdrop-blur-md cursor-pointer"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="
            relative z-10 w-full max-w-5xl rounded-2xl overflow-hidden shadow-2xl
            bg-day-card border border-day-line
            dark:bg-night-soft dark:border-night-line
          "
        >
          <div className="
            flex items-center justify-between px-5 py-3 border-b
            border-day-line bg-day-soft
            dark:border-night-line dark:bg-night-base/80
          ">
            <span className="text-[11px] uppercase tracking-[0.3em] text-brand-goldDark dark:text-brand-gold font-semibold">
              Now Playing
            </span>
            <div className="flex items-center gap-2">
              <a
                href={`https://www.youtube.com/watch?v=${videoKey}`}
                target="_blank"
                rel="noreferrer"
                className="
                  flex items-center gap-1.5 text-[11px] transition-colors
                  text-ink-darkSoft hover:text-brand-goldDark
                  dark:text-ink-muted dark:hover:text-brand-gold
                "
              >
                YouTube <ExternalLink className="w-3 h-3" />
              </a>
              <button
                onClick={onClose}
                className="
                  cursor-pointer p-1 rounded-lg transition-colors
                  text-ink-darkSoft hover:text-ink-dark hover:bg-black/5
                  dark:text-ink-soft dark:hover:text-ink-main dark:hover:bg-white/10
                "
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="relative aspect-video bg-black">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${videoKey}?autoplay=1&rel=0`}
              title="Trailer"
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}