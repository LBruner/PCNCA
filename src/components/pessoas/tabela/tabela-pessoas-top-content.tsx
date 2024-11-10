import React from "react";
import {Button, Divider, Input} from "@nextui-org/react";
import {SearchIcon} from "@nextui-org/shared-icons";
import {PlusIcon} from "@/components/estoque/plus-icon";
import {PiPrinterFill} from "react-icons/pi";
import TopContentDropDown from "@/components/estoque/tabela/top-content-dropdown";
import Link from "next/link";
import paths from "@/paths";
import {FilterCollection} from "@/models/shared/FilterCollection";

interface TabelaPessoasTopContentProps {
    categoryColletion: FilterCollection[];
    categoryFilter: string | string[];
    setCategoryFilter: (keys: string | string[]) => void;
    hasSearchFilter: boolean;
    filterValue: string;
    itemsLenght: number;
    onOpenCreatePessoaModal: () => void;
    onSearchChange: (value: string) => void;
    onClear: () => void;
}

const TabelaPessoasTopContent: React.FC<TabelaPessoasTopContentProps> = (
    {
        onOpenCreatePessoaModal,
        categoryColletion,
        categoryFilter,
        setCategoryFilter,
        filterValue,
        onSearchChange,
        onClear,
        itemsLenght,
    }
) => {
    const size = 'w-1/5';

    return (React.useMemo(() => {
        return (
            <div className="flex gap-4 justify-center  items-center ">
                <Input
                    size={'md'}
                    isClearable
                    placeholder="Procurar por nome..."
                    startContent={<SearchIcon/>}
                    value={filterValue}
                    onClear={() => onClear()}
                    onValueChange={onSearchChange}
                />
                    <TopContentDropDown
                        size={'lg'}
                        collection={categoryColletion} label={''} width={size}
                        filterStatus={categoryFilter} setFilterStatus={setCategoryFilter}
                        allSelectedLabel={'Todas Categorias'}
                        multipleSelectedLabel={'Várias Categorias'}/>
                    <Button onClick={onOpenCreatePessoaModal} size={'sm'} className={'text-white py-4 bg-orange-600 w-56'} startContent={<PlusIcon/>}>
                       Nova Pessoa
                    </Button>
            </div>
        );
    }, [
        filterValue,
        categoryFilter,
        itemsLenght,
        onSearchChange,
        onClear,
        setCategoryFilter,
    ]))
}

export default TabelaPessoasTopContent;