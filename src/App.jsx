import { motion } from "motion/react"

export default function App() {
  return (
    <div className="h-full w-full flex justify-center items-center">
      <motion.div className="w-32 h-48 bg-amber-300"

        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onHoverStart={() => console.log('hover started!')}
      >App</motion.div>
    </div>
  )
}
