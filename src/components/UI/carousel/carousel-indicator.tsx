import React from "react";
import {GoDot, GoDotFill} from "react-icons/go";

interface CarouselIndicatorProps {
    paginationIndex: number;
    goToPage: (page: number) => void;
    pageCount: number;
}

const CarouselIndicator: React.FC<CarouselIndicatorProps> = ({pageCount, paginationIndex, goToPage}) => {
    const generateDots = () => {

        return Array.from({length: pageCount}, (_, i) => (
            <button
                key={i}
                onClick={() => goToPage(i)}
                className={`outline-none focus:outline-none ${paginationIndex === i ? 'text-blue-500' : 'text-gray-500'}`}
            >
                {paginationIndex === i ? <GoDotFill color={'grey'} size={20}/> : <GoDot size={20}/>}
            </button>
        ));
    };

    return (
        <div className={'flex items-center justify-center mt-8'}>
            {generateDots()}
        </div>
    )
}

export default CarouselIndicator;