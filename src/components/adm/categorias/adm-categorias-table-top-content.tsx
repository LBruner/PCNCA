import React from "react";
import {Button, Input} from "@nextui-org/react";
import {SearchIcon} from "@nextui-org/shared-icons";
import {PlusIcon} from "@/components/estoque/plus-icon";

interface TabelaTopContentProps {
    hasSearchFilter: boolean;
    filterValue: string;
    itemsLenght: number;
    openCreateCategoryModal: () => void;
    onSearchChange: (value: string) => void;
    onClear: () => void;
}

const AdmCategoriasTableTopContent: React.FC<TabelaTopContentProps> = (
    {
        filterValue,
        onSearchChange,
        onClear,
        itemsLenght,
        hasSearchFilter,
        openCreateCategoryModal,
    }
) => {
    return (React.useMemo(() => {
        return (
            <div className="flex justify-between gap-3">
                <div className={'flex gap-1 w-10/12'}>
                    <Input
                        size={'md'}
                        isClearable
                        className=" h-3"
                        placeholder="Procurar por título..."
                        startContent={<SearchIcon/>}
                        value={filterValue}
                        onClear={() => onClear()}
                        onValueChange={onSearchChange}
                    />
                </div>
                <div className="flex gap-1 ">
                    <Button onClick={openCreateCategoryModal} className={'text-white bg-orange-600 w-44'} startContent={<PlusIcon/>}>
                        Adicionar categoria
                    </Button>
                </div>
            </div>
        );
    }, [
        filterValue,
        itemsLenght,
        onSearchChange,
        hasSearchFilter,
    ]))
}

export default AdmCategoriasTableTopContent;