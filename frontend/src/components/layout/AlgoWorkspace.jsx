import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '../ui/button';
import { ChevronLeft } from 'lucide-react';
import InfoTab from './TabsLayout/InfoTab';
import VisualTab from './TabsLayout/VisualTab';
import CodeTab from './TabsLayout/CodeTab';
import Tabs from './TabsLayout/Tabs';
import { motion } from "motion/react"
function AlgoWorkspace() {
    const { id } = useParams();

    const navigate = useNavigate();
    const [data, setData] = useState([])
    const [activeTab, setActiveTab] = useState("info");
    const [markAsRead, setMarkAsRead] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch("/data/algorithms.json");
                const json = await res.json();
                setData(json);
            } catch (err) {
                console.error(err);
            }
        };

        fetchData();
    }, []);

    const algo = data.find((item) => item.id === id);
    if (!algo) return <div>Loading...</div>
    return (
        <div className='flex flex-col gap-3'>
            <Button onClick={() => navigate("/")} className={` w-max`}>
                <ChevronLeft className='' />
            </Button>


            <div className={`bg-[var(--bg-primary)] p-4 rounded-md`}>

                <Tabs activeTab={activeTab} setActiveTab={setActiveTab} markAsRead={markAsRead} />


                <div className="mt-4">
                    {activeTab === "info" && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                            viewport={{ once: true }}
                        >

                            <InfoTab algo={algo} setMarkAsRead={setMarkAsRead} markAsRead={markAsRead}/>
                        </motion.div>
                    )}

                    {activeTab === "flow" && (
                        <div>
                           <VisualTab algo={algo} />
                        </div>
                    )}

                    {activeTab === "code" && (
                        <div>
                            <CodeTab algo={algo} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default AlgoWorkspace