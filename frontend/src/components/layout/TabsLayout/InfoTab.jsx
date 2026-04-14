import React from 'react'
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';
import { motion } from "motion/react"
import ComplexityGraph from './ComplexityGraph';
import { Check } from 'lucide-react';

function InfoTab({ algo, setMarkAsRead, markAsRead }) {
    if (!algo) return <div>Loading...</div>;

    return (
        <div className='flex flex-col gap-6 p-6 rounded-3xl bg-gradient-to-br from-[#0f172a] to-[#020617] border border-white/10'>

            <div className="flex flex-col md:flex-row gap-6 w-full">

                <div className="flex-1 space-y-6">

                    <h1 className='text-2xl font-semibold underline underline-offset-4 text-(--success-soft)'>
                        {algo.title}
                    </h1>

                    <section>
                        <h2 className="text-xl font-semibold text-indigo-400">Overview</h2>
                        <p className="text-gray-300">
                            {algo.overview || algo.theory?.description || "No description available"}
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-indigo-400">Key Points</h2>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {(algo.keyPoints || []).map((point, i) => (
                                <motion.span
                                    key={i}
                                    whileHover={{ scale: 1.05 }}
                                    className="px-3 py-1 text-xs rounded-full bg-indigo-500/20 text-indigo-300"
                                >
                                    {point}
                                </motion.span>
                            ))}
                        </div>
                    </section>

                    <section className='max-w-96 flex flex-col gap-3'>
                        <h2 className="text-xl font-bold">Complexity</h2>

                        <ComplexityGraph
                            complexity={algo.complexity || {
                                time: algo.theory?.timeComplexity,
                                space: algo.theory?.spaceComplexity
                            }}
                        />
                    </section>

                </div>

                <div className="w-full md:w-1/3 space-y-6">

                    <section>
                        <h2 className="text-lg text-green-400">Pros</h2>
                        <TagList items={algo.prosCons?.pros || []} type="pro" />
                    </section>

                    <section>
                        <h2 className="text-lg text-red-400">Cons</h2>
                        <TagList items={algo.prosCons?.cons || []} type="con" />
                    </section>

                </div>
            </div>

            <Button
                className="w-max bg-(--success-soft)/50 font-serif"
                onClick={() => {
                    setMarkAsRead(true);
                    localStorage.setItem(`algo-${algo.id}-read`, "true");
                    toast.success("Info marked as complete!");
                }}
            >
                {markAsRead ? (
                    <>
                        <Check /> Completed
                    </>
                ) : (
                    "Mark as complete"
                )}
            </Button>
        </div>
    );
}

const TagList = ({ items, type }) => (
    <div className="flex flex-wrap gap-3">
        {items.map((item, i) => (
            <motion.span
                key={i}
                whileHover={{ scale: 1.1 }}
                className={`px-3 py-2 text-xs rounded-full ${type === "pro"
                        ? "bg-green-500/20 text-green-300"
                        : "bg-red-500/20 text-red-300"
                    }`}
            >
                {item}
            </motion.span>
        ))}
    </div>
);

export default InfoTab;