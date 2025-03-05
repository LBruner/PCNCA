import React from "react";
import {Button, Pagination} from "@heroui/react";

interface TabelaBottomContentProps {
    currentPage: number;
    setCurrentPage: (page: number) => void;
    totalPagesQuantity: number;
    selectedKeys: string | string[];
    filteredItemsLength: number;
    hasSearchFilter: boolean;
    showPagination?: boolean;
}

const TabelaEstoqueBottomContent: React.FC<TabelaBottomContentProps> = (
    {
        setCurrentPage,
        currentPage,
        totalPagesQuantity,
        selectedKeys,
        filteredItemsLength,
        showPagination
    }
) => {
    const onNextPage = React.useCallback(() => {
        if (currentPage < totalPagesQuantity) {
            setCurrentPage(currentPage + 1);
        }
    }, [currentPage, totalPagesQuantity, setCurrentPage]);

    const onPreviousPage = React.useCallback(() => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    }, [currentPage, setCurrentPage]);

    return React.useMemo(() => {
        return (
            <div className="py-2 px-2 flex justify-between items-center">
        <span className="w-[30%] text-small text-default-400">
        </span>
                {showPagination && <>
                    <Pagination
                        showControls
                        showShadow
                        color="primary"
                        page={currentPage}
                        total={totalPagesQuantity}
                        onChange={setCurrentPage}
                    />
                    <div className="hidden sm:flex w-[30%] justify-end gap-2">
                        <Button isDisabled={totalPagesQuantity === 1} size="sm" variant="flat" onPress={onPreviousPage}>
                            Anterior
                        </Button>
                        <Button isDisabled={totalPagesQuantity === 1} size="sm" variant="flat" onPress={onNextPage}>
                            Próximo
                        </Button>
                    </div>
                </>
                }

            </div>
        );
    }, [selectedKeys, showPagination, filteredItemsLength, currentPage, totalPagesQuantity, setCurrentPage, onNextPage, onPreviousPage]);
}


export default TabelaEstoqueBottomContent;