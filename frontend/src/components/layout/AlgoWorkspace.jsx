import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '../ui/button';
import { ChevronLeft } from 'lucide-react';

function AlgoWorkspace() {
    const { id } = useParams();

    const navigate = useNavigate();
    const [data, setData] = useState([])
    const [activeTab, setActiveTab] = useState("info");

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
    return (
        <div className='flex flex-col gap-3'>
            <Button onClick={() => navigate("/")} className={` w-max`}>
                <ChevronLeft className='' />
            </Button>
            <div className={`bg-[var(--bg-primary)] p-4 rounded-md`}>


                <div className="w-full flex gap-2  p-2 ">

                    <Button
                        onClick={() => setActiveTab("info")}
                        className={activeTab === "info" ? "bg-[var(--bg-secondary)] border-blue-200/80" : ""}
                    >
                        Info
                    </Button>

                    <Button
                        onClick={() => setActiveTab("flow")}
                        className={activeTab === "flow" ? "bg-[var(--bg-secondary)] border-blue-200/80" : ""}
                    >
                        FlowChart
                    </Button>

                    <Button
                        onClick={() => setActiveTab("code")}
                        className={activeTab === "code" ? "bg-[var(--bg-secondary)] border-blue-200/80" : ""}
                    >
                        CodeEditor
                    </Button>
                </div>

                <div className="mt-4">
                    {activeTab === "info" && (
                        <div>
                            <h1 className="text-xl font-bold">{algo?.header}</h1>
                            <p className="mt-2">{algo?.description}</p>
                        </div>
                    )}

                    {activeTab === "flow" && (
                        <div>
                            <h2 className="font-bold">Flow Visualization</h2>
                            <p>Coming soon: step-by-step algorithm animation</p>
                        </div>
                    )}

                    {activeTab === "code" && (
                        <div>
                            <h2 className="font-bold">Code Editor</h2>
                            <p>Coming soon: Monaco Editor / CodeMirror</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default AlgoWorkspace