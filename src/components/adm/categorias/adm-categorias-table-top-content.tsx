import React from "react";
import {Button, Input} from "@heroui/react";
import {SearchIcon} from "@heroui/shared-icons";
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
        openCreateCategoryModal,
    }
) => {
    return (React.useMemo(() => {
        return (
            <div className="flex justify-between gap-3">
                <div className={'flex gap-1 w-full'}>
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
                    <Button onPress={openCreateCategoryModal} className={'text-white bg-orange-600 w-44'} startContent={<PlusIcon/>}>
                        Adicionar Cultura
                    </Button>
                </div>
            </div>
        );
    }, [
        onClear,
        openCreateCategoryModal,
        filterValue,
        onSearchChange,
    ]))
}

export default AdmCategoriasTableTopContent;