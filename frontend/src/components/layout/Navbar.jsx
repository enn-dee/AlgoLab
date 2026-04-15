import React, { useEffect, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import "../../app.css"
import { Axe, ShieldUser, Verified } from 'lucide-react'
import { motion } from "motion/react"
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'

function Navbar() {

    // const role = localStorage.getItem("role");
    const [role, setRole] = useState(null);
    const [token, setToken] = useState(null)
    useEffect(() => {
        setRole(localStorage.getItem("role"));
        setToken(localStorage.getItem("token"))
    }, []);
    const navigate = useNavigate();

    return (
        <nav className='flex w-full max-h-12 h-full justify-between items-center bg-(--bg-secondary) text-(--text-primary) font-[Inter] py-2 px-4 border-b-2 border-(--border-primary)' >

            <div className='flex flex-row items-center justify-center gap-2'>
                <h1 className='text-lg font-bold'> <span className=' text-[#9ED3DC]'>Algo</span> <span className=''>Lab </span></h1>
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1, rotate: 360 }}
                    transition={{ duration: 0.3 }}
                >

                    <Axe size={25} color='#F45B26' />
                </motion.div>
            </div>
            <div className='flex flex-row gap-4'>

                {
                    role === "student" ? (
                        <div className='flex flex-row gap-3 items-center'>


                            <motion.div
                                // initial={{ opacity: 0, scale: 0.5 }}
                                // animate={{ opacity: 1, scale: 1 }}
                                // // transition={{ duration: 0.2 }}
                                className=' rounded-full group relative hidden md:block'
                            >
                                <Verified color='green' />

                                <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 
               scale-0 group-hover:scale-100 transition 
               bg-gray-800 text-white text-sm px-2 py-1 rounded ">
                                    Verified User
                                </span>
                            </motion.div>


                            <h2 className='hidden md:block'>Welcome!</h2>
                            <div className="flex flex-row flex-wrap items-center gap-6 md:gap-12  ">
                                <Avatar>
                                    <AvatarImage
                                        src="https://avatars.githubusercontent.com/u/89350768?s=400&u=ba7b71cf3554988f67df7f9e04172adb0c353600&v=4"
                                        alt="@enn-dee"
                                    />

                                    <AvatarFallback>ND</AvatarFallback>
                                </Avatar>
                            </div>
                        </div>
                    ) : <>
                        {token && (<ShieldUser color='orange' size={30} />)}
                    </>

                }
                {token && (
                    <Button onClick={() => {
                        localStorage.clear();
                        window.location.href = "/login";

                    }}>Logout</Button>
                )}
            </div>
        </nav>
    )
}

export default Navbar