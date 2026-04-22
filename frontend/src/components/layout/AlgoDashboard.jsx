import React, { useEffect, useState } from 'react'
import { motion } from "motion/react"
import { Input } from '../ui/input'
import { Field } from '../ui/field'
import { Button } from "../ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { Filter, Search, Sparkles } from 'lucide-react'
import AlgoBox from './AlgoBox'
import { apiFetch } from '@/utils/api'

function AlgoDashboard() {
    const [Category, setCategory] = useState("All")
    const [search, setSearch] = useState("")
    const [debouncedSearch, setDebouncedSearch] = useState("")

    const [algos, setAlgos] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchAlgos = async () => {
            try {
                const res = await apiFetch("algorithms");
                const data = await res.json()
                setAlgos(data)
            } catch (err) {
                setError("Failed to load algorithms")
            } finally {
                setLoading(false)
            }
        }
        fetchAlgos()
    }, [])

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search)
        }, 300)
        return () => clearTimeout(timer)
    }, [search])

    const categories = [
        "All",
        ...new Set(algos.map((algo) => algo.category).filter(Boolean))
    ]

    const filteredAlgos = algos.filter((algo) => {
        const matchCategory =
            Category === "All" || algo.category === Category

        const matchSearch =
            (algo.title || "")
                .toLowerCase()
                .includes(debouncedSearch.toLowerCase()) ||
            (algo.theory?.description || "")
                .toLowerCase()
                .includes(debouncedSearch.toLowerCase())

        return matchCategory && matchSearch
    })

    if (error) {
        return (
            <div className="text-red-400 text-center mt-20 text-lg font-medium">
                 {error}
            </div>
        )
    }

    if (loading) {
        return (
            <div className="text-gray-400 text-center mt-20 animate-pulse">
                Loading algorithms...
            </div>
        )
    }

    return (
        <section className='flex flex-col gap-8 px-4 md:px-8 py-6'>

            {/* HERO */}
            <div className='flex flex-col gap-3 max-w-3xl'>

                <motion.h1
                    className="text-3xl md:text-4xl font-extrabold leading-tight tracking-tight"
                    initial={{ opacity: 0.3, y: 40, filter: "blur(20px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.6 }}
                >
                    <span className='bg-linear-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent'>
                        SCiVLab
                    </span>{" "}
                    - Learn Algorithms Visually
                </motion.h1>

                <motion.p
                    className="text-muted-foreground text-base md:text-lg"
                    initial={{ opacity: 0, x: 60 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    Explore, understand, and master{" "}
                    <span className='text-emerald-400 font-semibold'>algorithms</span>{" "}
                    with interactive explanations and visual execution.
                </motion.p>

            </div>

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

                    <DropdownMenuContent className="rounded-xl border border-white/10 bg-gray/80 backdrop-blur-lg text-white">
                        <DropdownMenuGroup>
                            <DropdownMenuRadioGroup
                                value={Category}
                                onValueChange={setCategory}
                            >
                                {categories.map((cat) => (
                                    <DropdownMenuRadioItem
                                        key={cat}
                                        value={cat}
                                        className="cursor-pointer"
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
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>

                {filteredAlgos.length === 0 ? (
                    <div className="col-span-full text-center text-gray-400 py-10">
                        No algorithms found
                    </div>
                ) : (
                    filteredAlgos.map((algo) => (
                        <motion.div
                            key={algo._id}
                            whileHover={{ scale: 1.03 }}
                            transition={{ type: "spring", stiffness: 200 }}
                        >
                            <AlgoBox algo={algo} />
                        </motion.div>
                    ))
                )}

            </div>

        </section>
    )
}

export default AlgoDashboard