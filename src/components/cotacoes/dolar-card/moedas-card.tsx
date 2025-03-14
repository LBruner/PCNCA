import React from "react";
import TradingViewWidget from "../moedas-card/trading-view-header";
import Link from "next/link";
import paths from "@/paths";

const MoedasCard: React.FC = _ => {
    return (
        <Link href={paths.cotacoesMoedas()} className="h-20 mt-2 fixed left-0 top-0" >
            <div className="h-24 overflow-hidden scale-80 dark:border-none bg-white border bg-opacity-10 rounded-xl pointer-events-none">
                <TradingViewWidget />
            </div>
        </Link>
    )
}

export default MoedasCard;