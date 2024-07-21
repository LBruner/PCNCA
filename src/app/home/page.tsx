import React, {Suspense} from "react";
import {getCotacoes} from "@/actions/cotacoes";
import Cotacoes from "@/components/cotacoes/cotacoes";
import {Spinner} from "@nextui-org/react";

const HomePage: React.FC = () => {
    return (
        <div className={'h-screen flex flex-col'}>
            <Suspense fallback={<Spinner/>}>
                <CotacoesWrapper />
            </Suspense>
        </div>
    )
}

const CotacoesWrapper: React.FC = async () => {
    const cotacoes = await getCotacoes();
    return <Cotacoes cotacoes={cotacoes} />;
}

export default HomePage;