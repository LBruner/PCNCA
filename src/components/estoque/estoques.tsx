import React from "react";
import EstoqueFiltragemCard, {ProdutoEstoqueComRelacoes} from "@/components/estoque/estoque-filtragem-card";

const Estoques: React.FC<{products: ProdutoEstoqueComRelacoes[]}> = ({products}) => {
    return (
        <div className={'flex flex-col justify-center items-center mt-40'}>
            <EstoqueFiltragemCard products={products}/>
        </div>
    )
}

export default Estoques;