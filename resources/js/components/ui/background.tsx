import React from 'react';

export function Background() {
    return (
        <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
            {/* Soft grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:36px_36px]" />

            {/* Glow accents */}
            <div className="absolute -top-24 left-1/2 h-[42rem] w-[42rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,theme(colors.violet.600/30),transparent_60%)] blur-3xl" />
            <div className="absolute bottom-[-10rem] right-[-10rem] h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle_at_center,theme(colors.cyan.500/20),transparent_60%)] blur-3xl" />
        </div>
    );
}

export default Background;

