import React, { use, useEffect, useState } from 'react'
import { motion } from "motion/react"
import { Input } from '../ui/input'
import { Button } from "../ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { Filter, Search, Sparkles, Trophy } from 'lucide-react'
import AlgoBox from './AlgoBox'
import { apiFetch } from '@/utils/api'
import { useParams } from 'react-router-dom'

function AlgoDashboard() {
    const [Category, setCategory] = useState("All")
    const [search, setSearch] = useState("")
    const [debouncedSearch, setDebouncedSearch] = useState("")

    const [algos, setAlgos] = useState([])
    const [completedAlgos, setCompletedAlgos] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)



    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch all algorithms
                const algosRes = await apiFetch("algorithms");
                const algosData = await algosRes.json()

                // Fetch user's completed progress
                const progressRes = await apiFetch("progress/user-progress");
                const progressData = await progressRes.json()

                console.log("Progress response:", progressData);

                const progressArray = Array.isArray(progressData) ? progressData : [];

                const completed = progressArray
                    .filter(p => p.completed)
                    .map(p => p.algorithmSlug);


                console.log("Completed algorithms:", completed);
                setCompletedAlgos(completed);

                // Sort algorithms by order
                const sortedAlgos = Array.isArray(algosData) ? [...algosData] : [];
                sortedAlgos.sort((a, b) => (a.order || 999) - (b.order || 999));

                const algosWithUnlockStatus = sortedAlgos.map((algo, index, sortedArray) => {
                    let unlocked = false;

                    if (index === 0) {
                        unlocked = true;
                    } else {
                        // Check if previous algorithm is completed
                        const prevAlgo = sortedArray[index - 1];
                        unlocked = completed.includes(prevAlgo.slug);
                    }

                    return {
                        ...algo,
                        unlocked,
                        isCompleted: completed.includes(algo.slug)
                    };
                });

                setAlgos(algosWithUnlockStatus);
            } catch (err) {
                console.error("Fetch error:", err);
                setError("Failed to load algorithms");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search);
        }, 300);
        return () => clearTimeout(timer);
    }, [search]);

    const categories = [
        "All",
        ...new Set(algos.map((algo) => algo.category).filter(Boolean))
    ];

    const filteredAlgos = algos.filter((algo) => {
        const matchCategory =
            Category === "All" || algo.category === Category;

        const matchSearch =
            (algo.title || "")
                .toLowerCase()
                .includes(debouncedSearch.toLowerCase()) ||
            (algo.theory?.description || "")
                .toLowerCase()
                .includes(debouncedSearch.toLowerCase());

        return matchCategory && matchSearch;
    });

    const completedCount = algos.filter(a => a.isCompleted).length;
    const totalCount = algos.length;
    const progressPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

    const nextToUnlock = algos.find(algo => !algo.unlocked && !algo.isCompleted);

    if (error) {
        return (
            <div className="text-red-400 text-center mt-20 text-lg font-medium">
                {error}
            </div>
        );
    }

    if (loading) {
        return (
            <div className="text-gray-400 text-center mt-20 animate-pulse">
                Loading algorithms...
            </div>
        );
    }

    return (
        <section className='flex flex-col gap-8 px-4 md:px-8 py-6'>
            <div className='flex flex-col gap-3 max-w-3xl'>
                <motion.h1
                    className="text-3xl md:text-4xl font-extrabold leading-tight tracking-tight"
                    initial={{ opacity: 0.3, y: 40, filter: "blur(20px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.6 }}
                >
                    <span className='bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent'>
                        SCiVLab
                    </span>{" "}
                    - Learn Algorithms Visually
                </motion.h1>

                <motion.p
                    className="text-muted-foreground text-base md:text-lg"
                    initial={{ opacity: 0, x: 60 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    Explore, understand, and master{" "}
                    <span className='text-emerald-400 font-semibold'>algorithms</span>{" "}
                    with interactive explanations and visual execution.
                </motion.p>
            </div>

            {/* Progress Stats Card */}
            <motion.div
                className="bg-gradient-to-r from-emerald-900/20 to-blue-900/20 rounded-2xl p-6 border border-emerald-500/20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-emerald-500/20 rounded-full">
                            <Trophy className="text-emerald-400" size={24} />
                        </div>
                        <div>
                            <h3 className="text-white font-semibold text-lg">Your Learning Journey</h3>
                            <p className="text-gray-400 text-sm">
                                {completedCount === 0
                                    ? "Start your first algorithm to begin the journey!"
                                    : completedCount === totalCount
                                        ? "🎉 Amazing! You've mastered all algorithms!"
                                        : nextToUnlock
                                            ? `Keep going! Complete "${nextToUnlock.title}" to unlock the next algorithm`
                                            : "Almost there!"}
                            </p>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="text-2xl font-bold text-emerald-400">
                            {completedCount}/{totalCount}
                        </div>
                        <div className="text-xs text-gray-500">Algorithms Completed</div>
                    </div>
                </div>

                <div className="mt-4">
                    <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                        <motion.div
                            className="bg-gradient-to-r from-emerald-500 to-green-500 h-3 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${progressPercentage}%` }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                        />
                    </div>
                </div>
            </motion.div>

            {/* search bar , filter*/}
            <div className='flex flex-col md:flex-row gap-4 items-center justify-between bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 shadow-lg'>
                <div className="relative w-full md:max-w-md">
                    <Search className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
                    <Input
                        type="search"
                        placeholder="Search algorithms..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-10 rounded-xl bg-black/30 border-white/10 focus:ring-2 focus:ring-emerald-500"
                    />
                </div>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button className="gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 hover:opacity-90 transition shadow-md">
                            <Filter size={16} />
                            {Category}
                        </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent className="rounded-xl border border-white/10 bg-gray-900/95 backdrop-blur-lg text-white">
                        <DropdownMenuGroup>
                            <DropdownMenuRadioGroup
                                value={Category}
                                onValueChange={setCategory}
                            >
                                {categories.map((cat) => (
                                    <DropdownMenuRadioItem
                                        key={cat}
                                        value={cat}
                                        className="cursor-pointer hover:bg-emerald-500/20"
                                    >
                                        {cat}
                                    </DropdownMenuRadioItem>
                                ))}
                            </DropdownMenuRadioGroup>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <div className='flex items-center gap-2 text-xl font-semibold'>
                <Sparkles className="text-emerald-400" size={18} />
                Browse Algorithms
                <span className="text-sm text-gray-500 font-normal ml-2">
                    (Sorted by difficulty)
                </span>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                {filteredAlgos.length === 0 ? (
                    <div className="col-span-full text-center text-gray-400 py-10">
                        No algorithms found
                    </div>
                ) : (
                    filteredAlgos
                        .sort((a, b) => (a.order || 999) - (b.order || 999))
                        .map((algo, index) => (
                            <motion.div
                                key={algo._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.05 }}
                                whileHover={{ scale: algo.unlocked ? 1.03 : 1 }}
                            >
                                <AlgoBox algo={algo} />
                            </motion.div>
                        ))
                )}
            </div>

            {/* Completion Celebration Banner */}
            {completedCount === totalCount && totalCount > 0 && (
                <motion.div
                    className="mt-4 p-6 bg-gradient-to-r from-emerald-500/20 to-yellow-500/20 rounded-2xl border border-emerald-500/30 text-center"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <h3 className="text-2xl font-bold text-emerald-400 mb-2">🎉 Congratulations! 🎉</h3>
                    <p className="text-gray-300">
                        You've completed all algorithms! You're now a master of fundamental algorithms.
                    </p>
                </motion.div>
            )}

        </section>
    );
}

export default AlgoDashboard;