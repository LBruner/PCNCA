import React from "react";
import {Button, Divider, Input, Tooltip} from "@heroui/react";
import {SearchIcon} from "@heroui/shared-icons";
import {PiPrinterFill} from "react-icons/pi";
import TopContentDropDown from "@/components/estoque/tabela/top-content-dropdown";
import {priceOptions, statusOptions, stockOptions} from "@/models/estoque/filters";
import Link from "next/link";
import paths from "@/paths";
import {FilterCollection} from "@/models/shared/FilterCollection";
import {MdOutlineSell} from "react-icons/md";
import {FaCirclePlus} from "react-icons/fa6";
import {useRouter} from "next/navigation";
import {ProdutoEstoqueComRelacoes} from "@/actions/estoques";

interface TabelaTopContentProps {
    categoriesOptions: FilterCollection[]
    statusFilter: string | string[];
    setStatusFilter: (keys: string | string[]) => void;
    priceFilter: string | string[];
    setPriceFilter: (keys: string | string[]) => void;
    stockFilter: string | string[];
    setStockFilter: (keys: string | string[]) => void;
    categoryFilter: string | string[];
    setCategoryFilter: (keys: string | string[]) => void;
    hasSearchFilter: boolean;
    filterValue: string;
    itemsLenght: number;
    onSearchChange: (value: string) => void;
    onClear: () => void;
    selectedItems: string | string[];
    products: ProdutoEstoqueComRelacoes[],
}

const TabelaEstoquesTopContent: React.FC<TabelaTopContentProps> = (
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
        selectedItems,
        products
    }
) => {
    const size = 'w-full';
    const router = useRouter();

    const handleNewSale = () => {
        localStorage.removeItem('selectedItems');
        localStorage.setItem('selectedItems', JSON.stringify(selectedItems));
        router.push(paths.createVenda());
    }

    const imprimirExcel = () => {

    }

    return (React.useMemo(() => {
        return (
            <div className="flex flex-col gap-4">
                <div className="flex justify-between gap-4">
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
                        <Tooltip color={'foreground'}
                                 content={`${selectedItems.length === 0 ? 'Selecione produtos para criar uma venda' : 'Criar venda com produtos selecionados'}`}>
                            {
                                <Button onClick={handleNewSale} variant={'flat'}
                                        disabled={selectedItems.length === 0} color={'primary'} className={'w-52'}
                                        startContent={<MdOutlineSell size={20}/>}>
                                    Criar Venda
                                </Button>
                            }
                        </Tooltip>
                        <Button className={'w-56'} variant={'flat'} color={'warning'}
                                startContent={<FaCirclePlus size={20}/>}>
                            <Link href={paths.createProduto()}>Adicionar Estoque</Link>
                        </Button>
                        <Button onClick={imprimirExcel} variant={'flat'} color={'default'} className={'w-52'}
                                startContent={<PiPrinterFill size={20}/>}>
                            Imprimir Estoque
                        </Button>
                    </div>
                </div>
                <Divider/>
                <div className="mx-4 flex justify-around gap-8">
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
        handleNewSale,
        statusFilter,
        stockFilter,
        priceFilter,
        categoryFilter,
        onSearchChange,
        onClear,
        setCategoryFilter,
        setPriceFilter,
        setStatusFilter,
        setStockFilter,
        selectedItems
    ]))
}

export default TabelaEstoquesTopContent;