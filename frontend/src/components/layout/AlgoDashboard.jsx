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
import { Filter, TextSelectIcon } from 'lucide-react'
import AlgoBox from './AlgoBox'

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
                const res = await fetch("http://localhost:3000/api/algorithms")
                const data = await res.json()
                setAlgos(data)
            } catch (err) {
                console.error(err)
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
        ...new Set(
            algos
                .map((algo) => algo.category)
                .filter(Boolean)
        )
    ]

    const filteredAlgos = algos.filter((algo) => {
        const matchCategory =
            Category === "All" || algo.category === Category

        const matchSearch =
            (algo.header || "")
                .toLowerCase()
                .includes(debouncedSearch.toLowerCase()) ||
            (algo.description || "")
                .toLowerCase()
                .includes(debouncedSearch.toLowerCase())

        return matchCategory && matchSearch
    })

    if (error) {
        return (
            <div className="text-red-400 text-center mt-10">
                {error}
            </div>
        )
    }

    if (loading) {
        return (
            <div className="text-gray-400 text-center mt-10">
                Loading algorithms...
            </div>
        )
    }

    return (
        <section className='flex flex-col gap-4'>

            <div className='flex flex-col gap-2'>

                <motion.h1
                    className="text-xl font-bold leading-loose"
                    initial={{ opacity: 0.3, x: -60, filter: "blur(30px)" }}
                    animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                >
                    <span className='text-(--success-soft)'> Welcome</span>{" "}
                    to the{" "}
                    <span className='underline underline-offset-8'>AlgoLab!</span>
                </motion.h1>

                <motion.p
                    className="text-[var(--text-secondary)]"
                    initial={{ opacity: 0, x: 90 }}
                    whileInView={{
                        opacity: 1,
                        x: 0,
                        transition: { duration: 0.6, ease: "easeInOut" }
                    }}
                    viewport={{ once: true }}
                >
                    Explore a library of core{" "}
                    <span className='text-(--error-soft) font-semibold'>algorithms</span>.{" "}
                    Study the logic, visualize the execution, and submit your implementation.
                </motion.p>

            </div>

            <div className='flex flex-col md:flex-row justify-between items-center gap-4 md:gap-8'>

                <Field orientation="horizontal" className="max-w-lg">
                    <Input
                        type="search"
                        placeholder="Search..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </Field>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button className="bg-(--bg-hover) p-5">
                            <Filter /> Filter by Category
                        </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent>
                        <DropdownMenuGroup>
                            <DropdownMenuRadioGroup
                                value={Category}
                                onValueChange={setCategory}
                            >
                                {categories.map((cat) => (
                                    <DropdownMenuRadioItem key={cat} value={cat}>
                                        {cat}
                                    </DropdownMenuRadioItem>
                                ))}
                            </DropdownMenuRadioGroup>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>

            </div>

            <div className='flex flex-col gap-2'>

                <h1 className='text-lg md:text-xl font-bold leading-loose'>
                    Select an Algorithm
                    <TextSelectIcon className='inline mx-2' />
                </h1>

                <div className='w-full flex flex-col md:flex-row flex-wrap gap-6 justify-center items-center'>
                    {filteredAlgos.length === 0 ? (
                        <p className="text-gray-400">No algorithms found</p>
                    ) : (
                        filteredAlgos.map((algo) => (
                            <AlgoBox key={algo.id} algo={algo} />
                        ))
                    )}
                </div>

            </div>

        </section>
    )
}

export default AlgoDashboard