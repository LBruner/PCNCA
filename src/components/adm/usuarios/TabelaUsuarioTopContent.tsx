import React from "react";
import {Divider, Input} from "@heroui/react";
import {SearchIcon} from "@heroui/shared-icons";
import {FilterCollection} from "@/models/shared/FilterCollection";
import {UsuarioComEmpresa} from "@/actions/usuarios";

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
    }
) => {

    return (React.useMemo(() => {
        return (
            <div className="flex flex-col gap-4 pb-4">
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
                    {/*<div className="flex gap-1 ">*/}
                    {/*    <TopContentDropDown collection={empresasFilterCollection} label={''} width={size}*/}
                    {/*                        filterStatus={empresaFilter} setFilterStatus={setEmpresaFilter}*/}
                    {/*                        allSelectedLabel={'Todas empresas'}*/}
                    {/*                        multipleSelectedLabel={'Várias empresas'}/>*/}
                    {/*</div>*/}
                </div>
                <Divider/>
            </div>
        );
    }, [
        filterValue,
        onSearchChange,
        onClear,
    ]))
}

export default TabelaUsuarioTopContent;