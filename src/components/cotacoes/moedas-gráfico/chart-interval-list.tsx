import React from "react"
import ChartIntervalItem from "./chart-interval-item"
import { ChartInterval as ChartInterval, intervals } from "@/models/moedas/grafico/intervals"

interface Props {
    selectedInterval: ChartInterval,
    setSelectInterval: React.Dispatch<React.SetStateAction<ChartInterval>>,
}

const TradingViewChartIntervalPicker: React.FC<Props> = ({ selectedInterval, setSelectInterval }) => {
    return (
        <div className={`my-4 w-full flex justify-center gap-1`}>
            {
                intervals.map((item: ChartInterval) => <ChartIntervalItem interval={item} selectedInterval={selectedInterval} setSelectInterval={setSelectInterval} />)
            }
        </div>
    )
}

export default TradingViewChartIntervalPicker