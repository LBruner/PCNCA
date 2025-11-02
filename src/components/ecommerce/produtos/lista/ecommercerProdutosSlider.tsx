"use client";

import React, { useState } from "react";
import { Estoque } from "@prisma/client";
import { Button } from "@heroui/react";
import Image from "next/image";
import { formatToBrazilianCurrency } from "@/helpers";

interface Props {
  productList: Estoque[];
}

const stepButtonStyle =
  "text-xl transition-all duration-200 hover:text-green-800 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:text-2xl disabled:hover:text-current";

const ProdutosSlider: React.FC<Props> = ({ productList }) => {
  const WINDOW_SIZE = 4; 
  const total = productList.length;
  const [index, setIndex] = useState(0);

  const handlePrevious = () => {
    if (index > 0) setIndex(index - 1);
  };

  const handleNext = () => {
    if (index < total - WINDOW_SIZE) setIndex(index + 1);
  };

  return (
    <div className="w-full flex justify-center dark:bg-slate-800">
      <div className="w-8/12 my-12">
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{
              // largura total do "inner" relativa ao viewport
              width: `${(total * 100) / WINDOW_SIZE}%`,
              // translate em % RELATIVO ao próprio "inner" — por isso usamos / total
              transform: `translateX(-${(index * 100) / total}%)`,
            }}
          >
            {productList.map((prod) => (
              <div
                key={prod.id}
                className="flex flex-col p-2"
                // largura do item relativa ao "inner" — 100/total %
                style={{ width: `${100 / total}%` }}
              >
                {prod.imagemLink && (
                  <>
                    <div className="relative w-full aspect-square mb-3 rounded-lg overflow-hidden bg-gray-100 dark:bg-slate-950">
                      <Image
                        src={prod.imagemLink}
                        alt={prod.produto}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-col gap-6">
                      <div>
                        <p className="font-semibold text-sm dark:text-white">{prod.produto}</p>
                        <p className="text-lg font-bold dark:text-white">
                          {formatToBrazilianCurrency(prod.preco)}
                        </p>
                      </div>
                      <Button className="p-6 bg-green-800 dark:bg-green-700 text-white hover:bg-green-900 dark:hover:bg-green-800 transition-colors">
                        Adicionar ao carrinho
                      </Button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        {total > WINDOW_SIZE && (
          <div className="flex justify-center items-center mt-12 gap-6">
            <button
              onClick={handlePrevious}
              disabled={index === 0}
              className={`${stepButtonStyle} dark:bg-slate-800 dark:text-white dark:border-slate-600 dark:hover:bg-slate-700 dark:disabled:bg-slate-900 dark:disabled:text-slate-600 dark:disabled:border-slate-800`}
            >
              ‹
            </button>
            <span className="text-md text-gray-900 dark:text-slate-300 font-light">
              {index + 1}/{total - WINDOW_SIZE + 1}
            </span>
            <button
              onClick={handleNext}
              disabled={index >= total - WINDOW_SIZE}
              className={`${stepButtonStyle} dark:bg-slate-800 dark:text-white dark:border-slate-600 dark:hover:bg-slate-700 dark:disabled:bg-slate-900 dark:disabled:text-slate-600 dark:disabled:border-slate-800`}
            >
              ›
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProdutosSlider;
