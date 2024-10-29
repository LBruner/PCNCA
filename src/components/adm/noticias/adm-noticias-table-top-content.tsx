import React from "react";
import {Button, DateRangePicker, DateValue, Divider, Input, RangeValue} from "@nextui-org/react";
import {SearchIcon} from "@nextui-org/shared-icons";
import {PlusIcon} from "@/components/estoque/plus-icon";
import TopContentDropDown from "@/components/estoque/tabela/top-content-dropdown";
import Link from "next/link";
import paths from "@/paths";
import {FilterCollection} from "@/models/shared/FilterCollection";
import {I18nProvider} from "@react-aria/i18n";

interface TabelaTopContentProps {
    authorFilterCollection: FilterCollection[];
    categoryFilterCollection: FilterCollection[];
    statusFilter: string | string[];
    authorFilter: string | string[];
    setStatusFilter: (keys: string | string[]) => void;
    categoryFilter: string | string[];
    setCategoryFilter: (keys: string | string[]) => void;
    setAuthorFilter: (keys: string | string[]) => void;
    hasSearchFilter: boolean;
    filterValue: string;
    itemsLenght: number;
    onSearchChange: (value: string) => void;
    onClear: () => void;
    datesRange: RangeValue<DateValue>,
    setDatesRange: (range: RangeValue<DateValue>) => void;
}

const AdmNoticiasTableTopContent: React.FC<TabelaTopContentProps> = (
    {
        authorFilterCollection,
        categoryFilterCollection,
        categoryFilter,
        setCategoryFilter,
        setAuthorFilter,
        authorFilter,
        setStatusFilter,
        statusFilter,
        filterValue,
        onSearchChange,
        onClear,
        setDatesRange
    }
) => {
    const size = 'w-1/5';

    console.log(authorFilterCollection)
    return (React.useMemo(() => {
        return (
            <div className="flex flex-col gap-4">
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
                        <Button className={'text-white bg-orange-600 w-44'} startContent={<PlusIcon/>}>
                            <Link href={paths.criarNoticia()}>Adicionar notícia</Link>
                        </Button>
                    </div>
                </div>
                <Divider/>
                <div className="flex justify-center gap-8 items-center">
                    <TopContentDropDown collection={authorFilterCollection} label={'Autor'} width={size}
                                        filterStatus={authorFilter} setFilterStatus={setAuthorFilter}
                                        allSelectedLabel={'Todos autores'}
                                        multipleSelectedLabel={'Vários Autores'}/>
                    <TopContentDropDown collection={categoryFilterCollection} label={'Categoria'} width={size}
                                        filterStatus={categoryFilter} setFilterStatus={setCategoryFilter}
                                        multipleSelectedLabel={'Várias Categorias'}
                                        allSelectedLabel={'Todas Categorias'}/>
                    <TopContentDropDown
                        collection={[{name: 'Publicado', uid: 'Publicado'}, {name: 'Rascunho', uid: 'Rascunho'}]}
                        label={'Status'} width={size}
                        filterStatus={statusFilter} setFilterStatus={setStatusFilter}
                        multipleSelectedLabel={'Vários Status'} allSelectedLabel={'Todos Status'}/>
                    <I18nProvider locale="pt-BR">
                        <DateRangePicker
                            label={'Datas'}
                            labelPlacement={'outside'}
                            className="max-w-xs"
                            onChange={setDatesRange}
                            disableAnimation={false} size={'md'} variant={'flat'} color={'default'} isDisabled={false}
                            radius={'lg'}/>
                    </I18nProvider>
                </div>
            </div>
        );
    }, [
        filterValue,
        statusFilter,
        authorFilter,
        categoryFilter,
        authorFilterCollection,
        categoryFilterCollection,
        onClear,
        setAuthorFilter,
        setCategoryFilter,
        setDatesRange,
        setStatusFilter,
        onSearchChange,
    ]))
}

export default AdmNoticiasTableTopContent;