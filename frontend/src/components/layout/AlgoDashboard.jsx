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
    const [search, setSearch] = useState("");

    const categories = ["All", "Sorting", "Searching", "Maths", "Arrays"];
    const demoAlgos = [
        {
            id: "linear-search",
            header: "Linear Search",
            description:
                "Sequentially checks each element in a list until the target is found.",
            verified: true,
            category: "Searching",
        },
        {
            id: "binary-search",
            header: "Binary Search",
            description:
                "Divides sorted array in half repeatedly to find the target efficiently.",
            verified: true,
            category: "Searching",
        },
        {
            id: "bubble-sort",
            header: "Bubble Sort",
            description:
                "Repeatedly swaps adjacent elements if they are in wrong order.",
            verified: true,
            category: "Sorting",
        },
        {
            id: "merge-sort",
            header: "Merge Sort",
            description:
                "Divides array into halves, sorts them, then merges sorted halves.",
            verified: true,
            category: "Sorting",
        },
        {
            id: "quick-sort",
            header: "Quick Sort",
            description:
                "Uses pivot to partition array and recursively sort partitions.",
            verified: true,
            category: "Sorting",
        },
        {
            id: "fibonacci-recursion",
            header: "Fibonacci (Recursion)",
            description:
                "Computes Fibonacci numbers using recursive relation.",
            verified: true,
            category: "Maths",
        },
        {
            id: "factorial",
            header: "Factorial",
            description:
                "Multiplies all numbers from 1 to n recursively or iteratively.",
            verified: true,
            category: "Maths",
        },
        {
            id: "two-sum",
            header: "Two Sum",
            description:
                "Finds two numbers in array that add up to target value.",
            verified: false,
            category: "Arrays",
        },
    ];


    const filteredAlgos = demoAlgos.filter((algo) => {
        const matchCategory =
            Category === "All" || algo.category === Category;

        const matchSearch =
            algo.header.toLowerCase().includes(search.toLowerCase()) ||
            algo.description.toLowerCase().includes(search.toLowerCase());

        return matchCategory && matchSearch;
    });



    // debouncing search input -> in future to prevent heaving filtering on every keystroke.
    useEffect(() => {
        const timer = setTimeout(() => {
        }, 200);

        return () => clearTimeout(timer);
    }, [search]);

    return (
        <section className='flex flex-col gap-4'>

            <div className='flex flex-col gap-2'>

                <motion.h1
                    className="text-xl font-bold leading-loose"
                    initial={{ opacity: 0.3, x: -60, filter: "blur(30px)" }}
                    animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                ><span className='text-(--success-soft) '
                > Welcome</span>{' '} to the{' '}
                    <span className='underline underline-offset-8 '>AlgoLab!</span></motion.h1>

                <motion.p
                    className="text-[var(--text-secondary)]"
                    initial={{ opacity: 0, x: 90 }}
                    whileInView={{
                        opacity: 1,
                        x: 0,
                        transition: { duration: 0.6, ease: "easeInOut" }
                    }}
                    viewport={{ once: true }}
                >Explore a library of core {" "}<span className='text-(--error-soft) font-semibold'> algorithms</span>.{" "} Study the logic, visualize the execution, and submit your implementation for instructor verification.</motion.p>

            </div>

            <div className='flex flex-col md:flex-row justify-between items-center gap-4 md:gap-8'>
                <div>

                    <Field orientation="horizontal" className={`max-w-lg`}>

                        {/* todo: add search functionality */}
                        <Input type="search" placeholder={` Search...`} onChange={(e) => setSearch(e.target.value)} />

                    </Field>
                </div>

                <DropdownMenu >
                    <DropdownMenuTrigger asChild>
                        <Button variant="" className={`bg-(--bg-hover) p-5`}><Filter /> Filter by Category
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent >
                        <DropdownMenuGroup>

                            <DropdownMenuRadioGroup
                                value={Category}
                                onValueChange={(value) => setCategory(value)}
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

            {/* Alogrithm section */}
            <div className='flex flex-col gap-2'>

                <h1 className='text-lg md:text-xl  font-bold  leading-loose '>
                    Select and Algorithm
                    <TextSelectIcon className='inline mx-2' />
                </h1>

                <div className='w-full flex flex-col md:flex-row flex-wrap gap-6 justify-center items-center'>
                    {/* todo : call actual algos */}
                    {filteredAlgos.length === 0 ? (
                        <p>No algorithms found</p>
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