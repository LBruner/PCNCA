import React from "react";
import {pegaTodasVendas} from "@/actions/vendas";
import Apagar from "@/app/producao-internacional/apagar";

const VendasPage: React.FC = async _ => {
    const vendas = await pegaTodasVendas();

    return (
        <div className={'mt-6 w-9/12 flex justify-center'}>
            <Apagar item={vendas}/>
            {/*<VendasRelatorio clientes={[]} vendas={vendas}/>*/}
        </div>
    )
}


export default VendasPage;