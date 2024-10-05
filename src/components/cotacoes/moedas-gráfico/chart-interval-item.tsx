import { ChartInterval } from "@/models/moedas/grafico/intervals";
import { Button } from "@nextui-org/react";
import React from "react"

interface ChartIntervalItem {
    interval: ChartInterval;
    selectedInterval: ChartInterval;
    setSelectInterval: React.Dispatch<React.SetStateAction<ChartInterval>>,
}

const ChartIntervalItem: React.FC<ChartIntervalItem> = ({ interval, selectedInterval, setSelectInterval }) => {
    const isSelected = selectedInterval === interval;

    const onSelectionChange = () =>{
        setSelectInterval(interval)
    }

    return (
        <div className={`py-1 flex justify-center items-center}`}>
            <Button onClick={onSelectionChange} color={`${isSelected ? 'primary' : 'default'}`}>{interval.interval}</Button>
        </div>
    )
}

export default ChartIntervalItem