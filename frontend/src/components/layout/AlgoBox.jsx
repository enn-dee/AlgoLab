import { Info, Verified } from 'lucide-react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// todo: pass algo as prop
function AlgoBox({ algo }) {
    // const [algo, setAlgo] = useState({
    //     header: "Linear Search",
    //     description: "Sequentially checks each element in a list.",
    //     verified: true,
    //     category: "Searching",
    // })

    const navigate = useNavigate();

    const description = algo.description.length > 100 ? algo.description.slice(0, 100) + "..." : algo.description
    return (
        <section className='max-w-80 h-36 md:max-w-56    bg-cover bg-center p-4 rounded-lg shadow-md flex flex-col backdrop-blur-md gap-3 overflow-hidden cursor-pointer hover:scale-105 transition-all ease-in-out' onClick={() =>
            navigate(`/algo/${algo.header.toLowerCase().replace(/\s+/g, "-")}`)}

            style={{
                backgroundImage: `linear-gradient(var(--card-bg), var(--card-bg)), url('/algo_box_bg.jpg')`
            }}
        >
            <div className='flex flex-row  justify-between items-center'>

                <h2 className='text-(--text-primary) font-semibold text-lg'>
                    {algo.header}
                </h2>
                {algo.verified ? <Verified size={25} color='green' /> : <Info size={20} color='orange' />}
            </div>
            <p className='text-sm '>{description}</p>

        </section>
    )
}

export default AlgoBox