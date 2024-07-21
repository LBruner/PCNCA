import React from "react";
import {IoIosArrowBack, IoIosArrowForward} from "react-icons/io";
import CarouselButton from "@/components/UI/carousel/carouse-button";
import CarouselIndicator from "@/components/UI/carousel/carousel-indicator";

interface CarouselProps {
    children: React.ReactNode;
    hasMoreItems: boolean;
    paginationIndex: number;
    goToPage: (page: number) => void;
    pageCount: number;
}

const Carousel: React.FC<CarouselProps> = (props) => {
    const {children, goToPage, paginationIndex, hasMoreItems, pageCount} = props;

    const startIndex = paginationIndex * 6;
    return (
        <div>
            <div className="flex mt-14 gap-1 items-center justify-center">
                <CarouselButton icon={<IoIosArrowBack color={'grey'}/>} paginationIndex={paginationIndex} disabled={startIndex === 0}
                                goToPage={() => goToPage(paginationIndex - 1)}/>
                {children}
                <CarouselButton icon={<IoIosArrowForward color={'grey'}/>} paginationIndex={paginationIndex} disabled={!hasMoreItems}
                                goToPage={() => goToPage(paginationIndex + 1)}/>
            </div>
            <CarouselIndicator pageCount={pageCount} goToPage={goToPage} paginationIndex={paginationIndex}/>
        </div>
    )
}

export default Carousel;