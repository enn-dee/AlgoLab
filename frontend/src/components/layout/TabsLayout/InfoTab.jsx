import React, { useState } from 'react'
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';
import { motion } from "motion/react"
import ComplexityGraph from './ComplexityGraph';
import { Check } from 'lucide-react';

function InfoTab({ algo, setMarkAsRead, markAsRead }) {
    return (
        <div className='flex  flex-col gap-6 p-6 rounded-3xl bg-gradient-to-br from-[#0f172a] to-[#020617] border border-white/10'>
            <div className="flex flex-col md:flex-row gap-6 w-full">
                {/* LEFT SIDE */}
                <div className="flex-1 space-y-6">
                    <h1 className='text-2xl font-semibold underline underline-offset-4 text-(--success-soft)'>{algo.header}</h1>

                    <section>
                        <h2 className="text-xl font-semibold text-indigo-400">Overview</h2>
                        <p className="text-gray-300">{algo.overview}</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-indigo-400">Key Points</h2>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {algo.keyPoints.map((point, i) => (
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

                        <ComplexityGraph complexity={algo.complexity} />
                    </section>

                </div>

                {/* RIGHT SIDE */}
                <div className="w-full md:w-1/3 space-y-6">
                    <section>
                        <h2 className="text-lg text-green-400">Pros</h2>
                        <TagList items={algo.prosCons.pros} type="pro" />
                    </section>

                    <section>
                        <h2 className="text-lg text-red-400">Cons</h2>
                        <TagList items={algo.prosCons.cons} type="con" />
                    </section>


                </div>
            </div>
            <Button className={`w-max bg-(--success-soft)/50 font-serif`}
                onClick={() => {
                    setMarkAsRead(true)
                    toast.success("Info marked as complete! FlowChart and CodeEditor unlocked.")
                }} >{markAsRead ? (
                    <>
                        <Check /> Completed
                    </>
                ) : (
                    "Mark as complete"
                )}</Button>
        </div>
    );
}

const TagList = ({ items, type }) => (
    <div className="flex flex-wrap gap-3">
        {items.map((item, i) => (
            <motion.span
                key={i}
                whileHover={{ scale: 1.1 }}
                className={`px-3 py-2 text-xs  rounded-full ${type === "pro"
                    ? "bg-green-500/20 text-green-300"
                    : "bg-red-500/20 text-red-300"
                    }`}
            >
                {item}
            </motion.span>
        ))}
    </div>
);

const ComplexityBar = ({ label, value }) => {
    const map = {
        "O(1)": 10,
        "O(log n)": 30,
        "O(n)": 60,
        "O(n log n)": 75,
        "O(n^2)": 100,
        "O(2^n)": 100
    };

    return (
        <div>
            <div className="flex justify-between text-xs mb-1">
                <span>{label}</span>
                <span>{value}</span>
            </div>
            <div className="h-2 bg-gray-700 rounded">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${map[value] || 50}%` }}
                    className="h-2 bg-gradient-to-r from-green-400 to-red-500 rounded"
                />
            </div>
        </div>
    );
};

export default InfoTab;