import React from "react";
import {Button} from "@nextui-org/react";

interface CarouselButtonProps {
    paginationIndex: number;
    goToPage: (page: number) => void;
    disabled: boolean;
    icon: React.ReactNode;
}

const CarouselButton: React.FC<CarouselButtonProps> = ({paginationIndex, goToPage, disabled, icon}) => {
    return (
        <Button className={`bg-transparent`} disableAnimation={true}
                disabled={disabled}>
            {React.cloneElement(icon as React.ReactElement, {
                onClick: () => goToPage(paginationIndex - 1),
                size: 50,
                className: `bg-transparent ${disabled ? 'opacity-0' : 'opacity-100'}`
            })}
        </Button>
    )
}

export default CarouselButton;