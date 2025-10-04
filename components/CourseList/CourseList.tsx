"use client";
import React from "react";
import FrontHover from "./StylingFrontEnd";
import BackHover from "./StylingBackEnd";

export default function LearnCoding() {
    const [minHeight, setMinHeight] = React.useState<string>("auto");

    React.useEffect(() => {
        const update = () => {
            const header = document.querySelector("header") as HTMLElement | null;
            const headerHeight = header?.offsetHeight ?? 0;
            setMinHeight(`calc(100vh - ${headerHeight}px)`);
        };
        update();
        window.addEventListener("resize", update);
        return () => window.removeEventListener("resize", update);
    }, []);

    return (
        <div style={{ minHeight, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '3rem 0', background: 'linear-gradient(135deg, #e0f2fe 0%, #e9d5ff 50%, #ffe4e6 100%)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '3rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                <div style={{ textAlign: 'center' }}>
                    <h2 className="font-logo" style={{ fontSize: '2rem', marginBottom: '1rem', letterSpacing: '0.05em' }}>Front-end</h2>
                    <FrontHover />
                </div>
                <div style={{ textAlign: 'center' }}>
                    <h2 className="font-logo" style={{ fontSize: '2rem', marginBottom: '1rem', letterSpacing: '0.05em' }}>Back-end</h2>
                    <BackHover />
                </div>
            </div>
        </div>
    )
}