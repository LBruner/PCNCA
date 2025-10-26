import Image from "next/image";
import {Estoque} from "@prisma/client";
import React from "react";
import Link from "next/link";
import paths from "@/paths";

interface ProdutosItemProps {
    produto: Estoque;
}

const ProdutosItem: React.FC<ProdutosItemProps> = ({ produto }) => {
    return (
        <Link href={paths.ecommerceProdutoView(produto.id.toString())} className="flex flex-col gap-2">
            <Image className={``} width={300} height={900} alt={produto.produto} src={produto.imagemLink!}/>
            <p className="text-center text-lg font-semibold text-green-800">{produto.produto}</p>
        </Link>
    );
}

export default ProdutosItem;