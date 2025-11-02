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
            <Image className={`max-h-[20.4rem]`} width={300} height={50} alt={produto.produto} src={produto.imagemLink!}/>
            <p className="text-center text-lg font-semibold dark:text-green-600 text-green-800">{produto.produto}</p>
        </Link>
    );
}

export default ProdutosItem;