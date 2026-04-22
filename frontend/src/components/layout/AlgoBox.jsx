import { Info, Verified, ArrowUpRight } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from "motion/react"

function AlgoBox({ algo }) {
    const navigate = useNavigate();

    const title = algo?.title || "Untitled Algorithm";
    const descriptionText = algo?.theory?.description || "No description available";

    const description =
        descriptionText.length > 80
            ? descriptionText.slice(0, 80) + "..."
            : descriptionText;

    return (
        <motion.section
            whileHover={{ y: -6, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 200 }}
            className='
                relative w-full max-w-sm h-40
                rounded-2xl p-4
                bg-white/5 backdrop-blur-lg
                border border-white/10
                shadow-lg
                overflow-hidden
                cursor-pointer
                group
            '

            onClick={() => {
                if (!algo?.slug) return;
                navigate(`/algo/${algo.slug}`);
            }}
        >

            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300
                bg-gradient-to-br from-emerald-500/10 via-transparent to-blue-500/10" />

            <div className='flex justify-between items-start relative z-10'>

                <h2 className='text-white font-semibold text-lg leading-tight'>
                    {title}
                </h2>

                {/* STATUS BADGE */}
                <div className={`
                    flex items-center gap-1 px-2 py-1 rounded-full text-xs
                    ${algo?.verified
                        ? "bg-green-500/20 text-green-400 border border-green-400/30"
                        : "bg-orange-500/20 text-orange-400 border border-orange-400/30"}
                `}>
                    {algo?.verified ? (
                        <>
                            <Verified size={14} />
                            Verified
                        </>
                    ) : (
                        <>
                            <Info size={14} />
                            Draft
                        </>
                    )}
                </div>

            </div>

            <p className='text-sm text-gray-400 mt-2 leading-relaxed relative z-10'>
                {description}
            </p>

            <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition">
                <ArrowUpRight className="text-gray-400 group-hover:text-white" size={18} />
            </div>

        </motion.section>
    )
}

export default AlgoBox