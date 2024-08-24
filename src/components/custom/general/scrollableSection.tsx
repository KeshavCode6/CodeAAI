"use client";

import React, { useEffect } from 'react'
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const ScrollableSection = ({ children, className }: { children: React.ReactNode, className?: string }) => {
    const controls = useAnimation();
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    useEffect(() => {
        if (inView) {
            controls.start("visible");
        }
    }, [controls, inView]);

    return (
        <motion.div
            ref={ref}
            animate={controls}
            className={className}
            initial="hidden"
            variants={{
                visible: { opacity: 1, y: 0 },
                hidden: { opacity: 0, y: 50 }
            }}
            transition={{ duration: 0.5 }}
        >
            {children}
        </motion.div>
    );
};

export default ScrollableSection;