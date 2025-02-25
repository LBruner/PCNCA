'use client';
import React from "react";
import {VendasAgrupadas} from "@/actions/vendas";

const Apagar: React.FC<{item: VendasAgrupadas[][]}> = ({item}) => {
    item.forEach((item)=>{
        console.log(item[0].venda.pessoas[0].pessoa.imagemLink)
    })
    return (
        <div>

        </div>
    )
}

export default Apagar;