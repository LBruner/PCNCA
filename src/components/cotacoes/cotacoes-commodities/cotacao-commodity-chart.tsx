import React, {useEffect, useRef, useState} from "react";
import {LineChartData} from "@/models/graficos/charts";
import {LineChart} from "@mui/x-charts";

interface CotacaoCommodityChartProps {
    chartData: LineChartData;
}

const CotacaoCommodityChart: React.FC<CotacaoCommodityChartProps> = ({chartData}) => {

    const containerRef = useRef<HTMLDivElement>(null);
    const [containerWidth, setContainerWidth] = useState(0);

    useEffect(() => {
        if (containerRef.current) {
            setContainerWidth(containerRef.current.offsetWidth);
        }

        const handleResize = () => {
            if (containerRef.current) {
                setContainerWidth(containerRef.current.offsetWidth);
            }
        };

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <div className="h-[400px] my-12" ref={containerRef} style={{width: "100%"}}>
            <LineChart
                colors={["#4a946f"]}
                grid={{vertical: true, horizontal: true}}
                width={containerWidth}
                height={400}
                slotProps={{
                    legend: {
                        hidden: true,
                    },
                }}
                margin={{left: 80, right: 20, top: 20, bottom: 40}}
                yAxis={[
                    {
                        tickLabelStyle: {fontSize: 15},
                        tickSize: 6,
                        valueFormatter: (value) => `R\$ ${value}`,
                    },
                ]}
                series={chartData.datasets.map((item) => {
                    return {data: item.data, label: item.label, id: item.label};
                })}
                xAxis={[
                    {
                        scaleType: "point",
                        data: chartData.xLabels,
                        tickSize: 12,
                        tickLabelStyle: {fontSize: 14},
                    },
                ]}
            />
        </div>
    );
};

export default CotacaoCommodityChart;
