import React from "react";
import {Input} from "@nextui-org/react";
import {SearchIcon} from "@nextui-org/shared-icons";
import TopContentDropDown from "@/components/estoque/tabela/top-content-dropdown";
import {FilterCollection} from "@/models/shared/FilterCollection";
import paths from "@/paths";
import {FaCirclePlus} from "react-icons/fa6";
import NovoItemButton from "@/components/UI/NovoItemButton";

interface TabelaPessoasTopContentProps {
    categoryColletion: FilterCollection[];
    tipoPessoaColletion: FilterCollection[];
    categoryFilter: string | string[];
    tipoPessoaFilter: string | string[];
    setCategoryFilter: (keys: string | string[]) => void;
    setTipoPessoaFilter: (keys: string | string[]) => void;
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
        tipoPessoaColletion,
        tipoPessoaFilter,
        setTipoPessoaFilter,
        filterValue,
        onSearchChange,
        onClear,
        itemsLenght,
    }
) => {
    const size = 'w-1/5';

    return (React.useMemo(() => {
        return (
            <div className="flex gap-4 justify-center items-center ">
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
                <TopContentDropDown
                    size={'lg'}
                    collection={tipoPessoaColletion} label={''} width={size}
                    filterStatus={tipoPessoaFilter} setFilterStatus={setTipoPessoaFilter}
                    allSelectedLabel={'Todos Tipos'}
                    multipleSelectedLabel={'Vários Tipos'}/>
                <NovoItemButton label={'Nova Pessoa'} href={paths.createPessoa()} icon={<FaCirclePlus size={20}/>}/>
            </div>
        );
    }, [
        filterValue,
        categoryFilter,
        tipoPessoaFilter,
        setTipoPessoaFilter,
        categoryColletion,
        tipoPessoaColletion,
        itemsLenght,
        onSearchChange,
        onClear,
        setCategoryFilter,
    ]))
}

export default TabelaPessoasTopContent;