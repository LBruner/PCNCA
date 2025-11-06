'use client';

import Image from "next/image";
import {Estoque} from "@prisma/client";
import React from "react";
import Link from "next/link";
import paths from "@/paths";
import { motion } from "framer-motion";

interface ProdutosItemProps {
    produto: Estoque;
    animationDelay: number;
}

const fadeIn = {
    hidden: { opacity: 0, x: -16 },
    visible: { opacity: 1, x: 0 },
};

const ProdutosItem: React.FC<ProdutosItemProps> = ({ produto, animationDelay }) => {
    return (
        <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: animationDelay, duration: 0.8, ease: "easeOut" }}
            className="h-full"
        >
            <Link
                href={paths.ecommerceProdutoView(produto.id.toString())}
                className="group flex h-full flex-col gap-2"
            >
                <motion.div
                    className="overflow-hidden rounded-lg"
                    whileHover={{ scale: 1.04 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                >
                    <Image
                        className="h-auto max-h-[20.4rem] w-full object-cover transition-transform duration-200 ease-out group-hover:scale-105"
                        width={300}
                        height={200}
                        alt={produto.produto}
                        src={produto.imagemLink!}
                    />
                </motion.div>
                <p className="text-center text-lg font-semibold dark:text-green-600 text-green-800">{produto.produto}</p>
            </Link>
        </motion.div>
    );
};

export default ProdutosItem;
