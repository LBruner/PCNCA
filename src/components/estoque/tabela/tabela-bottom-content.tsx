import React from "react";

interface TabelaBottomContentProps {
    currentPage: number;
    setCurrentPage: (page: number) => void;
    totalPagesQuantity: number;
    selectedKeys: string | string[];
    filteredItemsLength: number;
    hasSearchFilter: boolean;
}

const TabelaBottomContent: React.FC<TabelaBottomContentProps> = (
    {
        setCurrentPage,
        currentPage,
        totalPagesQuantity,
        selectedKeys,
        filteredItemsLength,
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
          {selectedKeys === "all"
              ? "Todos produtos selecionados"
              : `${typeof selectedKeys !== "string" && selectedKeys ? selectedKeys?.length : 0} de ${filteredItemsLength} items selecionado${typeof selectedKeys !== "string" && selectedKeys?.length != 1 ? "s" : ""}`}
        </span>
            </div>
        );
    }, [selectedKeys, filteredItemsLength, currentPage, totalPagesQuantity, setCurrentPage, onNextPage, onPreviousPage]);
}


export default TabelaBottomContent;