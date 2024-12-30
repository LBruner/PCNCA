import React from "react";
import {Button, Input} from "@nextui-org/react";
import {SearchIcon} from "@nextui-org/shared-icons";
import {PlusIcon} from "@/components/estoque/plus-icon";
import TopContentDropDown from "@/components/estoque/tabela/top-content-dropdown";
import {FilterCollection} from "@/models/shared/FilterCollection";
import Link from "next/link";
import paths from "@/paths";

interface TabelaPessoasTopContentProps {
    categoryColletion: FilterCollection[];
    categoryFilter: string | string[];
    setCategoryFilter: (keys: string | string[]) => void;
    hasSearchFilter: boolean;
    filterValue: string;
    itemsLenght: number;
    onSearchChange: (value: string) => void;
    onClear: () => void;
}

const TabelaPessoasTopContent: React.FC<TabelaPessoasTopContentProps> = (
    {
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
                <Link href={paths.createPessoa()}>
                    <Button size={'sm'} className={'text-white py-4 bg-orange-600 w-56'} startContent={<PlusIcon/>}>
                        Nova Pessoa
                    </Button>
                </Link>
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