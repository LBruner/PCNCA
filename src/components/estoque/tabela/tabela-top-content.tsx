import React from "react";
import {Button, Divider, Input} from "@nextui-org/react";
import {SearchIcon} from "@nextui-org/shared-icons";
import {PlusIcon} from "@/components/estoque/plus-icon";
import {PiPrinterFill} from "react-icons/pi";
import TopContentDropDown from "@/components/estoque/tabela/top-content-dropdown";
import {priceOptions, statusOptions, stockOptions} from "@/models/estoque/filters";
import Link from "next/link";
import paths from "@/paths";
import {FilterCollection} from "@/models/shared/FilterCollection";
interface TabelaTopContentProps {
    categoriesOptions: FilterCollection[]
    statusFilter: string | string[];
    setStatusFilter: (keys:string | string[]) => void;
    priceFilter: string | string[];
    setPriceFilter: (keys: string | string[] ) => void;
    stockFilter: string | string[];
    setStockFilter: (keys:string | string[]) => void;
    categoryFilter: string | string[];
    setCategoryFilter: (keys:string | string[]) => void;
    hasSearchFilter: boolean;
    filterValue: string;
    itemsLenght: number;
    onSearchChange: (value: string) => void;
    onClear: () => void;
    selectedItems?: string | string[];
}

const TabelaTopContent: React.FC<TabelaTopContentProps> = (
    {
        categoriesOptions,
        categoryFilter,
        setCategoryFilter,
        setStatusFilter,
        statusFilter,
        filterValue,
        stockFilter,
        setStockFilter,
        priceFilter,
        setPriceFilter,
        onSearchChange,
        onClear,
        itemsLenght,
    }
) => {
    const size = 'w-1/5';

    return (React.useMemo(() => {
        return (
            <div className="flex flex-col gap-4">
                <div className="flex justify-between gap-3">
                    <div className={'flex gap-1 w-10/12'}>
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
                        <Button className={'text-white bg-orange-600 w-56'} startContent={<PlusIcon/>}>
                            <Link href={paths.createProduto()}>Adicionar novo produto</Link>
                        </Button>
                        <Button variant={'bordered'} className={'w-52'} startContent={<PiPrinterFill size={20}/>}>
                            Imprimir Estoque
                        </Button>
                    </div>
                </div>
                <Divider/>
                <div className="flex justify-center gap-8 items-center">
                    <TopContentDropDown collection={categoriesOptions} label={'Categoria'} width={size}
                                        filterStatus={categoryFilter} setFilterStatus={setCategoryFilter}
                                        allSelectedLabel={'Todas Categorias'}
                                        multipleSelectedLabel={'Várias Categorias'}/>
                    <TopContentDropDown collection={statusOptions} label={'Status'} width={size}
                                        filterStatus={statusFilter} setFilterStatus={setStatusFilter}
                                        multipleSelectedLabel={'Vários Status'} allSelectedLabel={'Todos Status'}/>
                    <TopContentDropDown collection={priceOptions} label={'Preço'} width={size}
                                        filterStatus={priceFilter} setFilterStatus={setPriceFilter}
                                        multipleSelectedLabel={'Varios'} allSelectedLabel={'Desativado'}
                                        selectionType={'single'}/>
                    <TopContentDropDown collection={stockOptions} label={'Estoque'} width={size}
                                        filterStatus={stockFilter} setFilterStatus={setStockFilter}
                                        multipleSelectedLabel={'Varios'} allSelectedLabel={'Desativado'}
                                        selectionType={'single'}/>
                </div>
            </div>
        );
    }, [
        filterValue,
        categoriesOptions,
        statusFilter,
        stockFilter,
        priceFilter,
        categoryFilter,
        itemsLenght,
        onSearchChange,
        onClear,
        setCategoryFilter,
        setPriceFilter,
        setStatusFilter,
        setStockFilter
    ]))
}

export default TabelaTopContent;