'use client';
import { useState, useEffect } from 'react';
import {ArrowUpIcon} from "@radix-ui/react-icons";
import {BsBoxArrowUp} from "react-icons/bs";
import {FiArrowUp} from "react-icons/fi";

const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            setIsVisible(window.scrollY > 300);
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <>
            {isVisible && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-4 right-4 p-2 bg-opacity-75 bg-green-800 hover:bg-gray-700 text-white rounded-full shadow-lg transition-all duration-300 hover:scale-110"
                    aria-label="Scroll to top"
                >
                    <FiArrowUp size={30}/>
                </button>
            )}
        </>
    );
};

export default ScrollToTop;