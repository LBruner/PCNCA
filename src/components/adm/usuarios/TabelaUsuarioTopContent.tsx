import React from "react";
import {Divider, Input} from "@nextui-org/react";
import {SearchIcon} from "@nextui-org/shared-icons";
import {FilterCollection} from "@/models/shared/FilterCollection";
import {UsuarioComEmpresa} from "@/actions/usuarios";
import TopContentDropDown from "@/components/estoque/tabela/top-content-dropdown";

interface TabelaUsuarioTopContentProps {
    empresasFilterCollection: FilterCollection[]
    empresaFilter: string | string[];
    setEmpresaFilter: (keys: string | string[]) => void;
    hasSearchFilter: boolean;
    filterValue: string;
    itemsLenght: number;
    onSearchChange: (value: string) => void;
    onClear: () => void;
    selectedItems: string | string[];
    products: UsuarioComEmpresa[],
}

const TabelaUsuarioTopContent: React.FC<TabelaUsuarioTopContentProps> = (
    {
        empresasFilterCollection,
        setEmpresaFilter,
        empresaFilter,
        filterValue,
        onSearchChange,
        onClear,
        itemsLenght,
    }
) => {
    const size = 'w-full';

    const imprimirExcel = ()=>{

    }

    return (React.useMemo(() => {
        return (
            <div className="flex flex-col gap-4">
                <div className="flex justify-between gap-2">
                    <div className={'flex gap-1 w-full'}>
                        <Input
                            size={'md'}
                            isClearable
                            className=" h-3"
                            placeholder="Procurar por nome..."
                            startContent={<SearchIcon/>}
                            value={filterValue}
                            onClear={() => onClear()}
                            onValueChange={onSearchChange}
                        />
                    </div>
                    <div className="flex gap-1 ">
                        <TopContentDropDown collection={empresasFilterCollection} label={''} width={size}
                                            filterStatus={empresaFilter} setFilterStatus={setEmpresaFilter}
                                            allSelectedLabel={'Todas empresas'}
                                            multipleSelectedLabel={'Várias empresas'}/>
                    </div>
                </div>
                <Divider/>
            </div>
        );
    }, [
        empresasFilterCollection,
        filterValue,
        empresaFilter,
        itemsLenght,
        onSearchChange,
        onClear,
        setEmpresaFilter,
    ]))
}

export default TabelaUsuarioTopContent;