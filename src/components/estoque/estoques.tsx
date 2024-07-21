import React from "react";
import EstoqueFiltragemCard from "@/components/estoque/estoque-filtragem-card";
import type {Product} from "@prisma/client";

const Estoques: React.FC<{products: Product[]}> = ({products}) => {
    return (
        <div className={'flex flex-col justify-center items-center mt-40'}>
            <EstoqueFiltragemCard products={products}/>
        </div>
    )
}

export default Estoques;