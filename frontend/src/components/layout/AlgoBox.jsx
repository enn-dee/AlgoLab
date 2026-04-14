import { Info, Verified } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function AlgoBox({ algo }) {
    const navigate = useNavigate();

    const title = algo?.header || "Untitled Algorithm";
    const descriptionText = algo?.description || "No description available";

    const description =
        descriptionText.length > 100
            ? descriptionText.slice(0, 100) + "..."
            : descriptionText;

    return (
        <section
            className='max-w-80 h-36 md:max-w-56 bg-cover bg-center p-4 rounded-lg shadow-md flex flex-col backdrop-blur-md gap-3 overflow-hidden cursor-pointer hover:scale-105 transition-all ease-in-out'
            
            onClick={() => {
                if (!algo?.id) return;
                navigate(`/algo/${algo.id}`);
            }}

            style={{
                backgroundImage: `linear-gradient(var(--card-bg), var(--card-bg)), url('/algo_box_bg.jpg')`
            }}
        >
            <div className='flex flex-row justify-between items-center'>
                <h2 className='text-(--text-primary) font-semibold text-lg'>
                    {title}
                </h2>

                {algo?.verified ? (
                    <Verified size={25} color='green' />
                ) : (
                    <Info size={20} color='orange' />
                )}
            </div>

            <p className='text-sm'>
                {description}
            </p>
        </section>
    )
}

export default AlgoBox