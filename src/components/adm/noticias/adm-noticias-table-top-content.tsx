import React from "react";
import {DateRangePicker, DateValue, Divider, Input, RangeValue} from "@heroui/react";
import {SearchIcon} from "@heroui/shared-icons";
import TopContentDropDown from "@/components/estoque/tabela/top-content-dropdown";
import paths from "@/paths";
import {FilterCollection} from "@/models/shared/FilterCollection";
import {I18nProvider} from "@react-aria/i18n";
import {FaCirclePlus} from "react-icons/fa6";
import NovoItemButton from "@/components/UI/NovoItemButton";

interface TabelaTopContentProps {
    categoryFilterCollection: FilterCollection[];
    statusFilter: string | string[];
    setStatusFilter: (keys: string | string[]) => void;
    categoryFilter: string | string[];
    setCategoryFilter: (keys: string | string[]) => void;
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
        categoryFilterCollection,
        categoryFilter,
        setCategoryFilter,
        setStatusFilter,
        statusFilter,
        filterValue,
        onSearchChange,
        onClear,
        setDatesRange
    }
) => {
    const size = 'w-full';

    return (React.useMemo(() => {
        return (
            <div className="flex flex-col gap-4">
                <div className="flex justify-center gap-4 w-full">
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
                    <div className="flex gap-1">
                        <NovoItemButton label={'Adicionar Notícia'} href={paths.criarNoticia()}
                                        icon={<FaCirclePlus size={20}/>}/>
                    </div>
                </div>
                <Divider/>
                <div className="flex justify-center gap-8 items-center">
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
                            // @ts-ignore
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
        categoryFilter,
        categoryFilterCollection,
        onClear,
        setCategoryFilter,
        setDatesRange,
        setStatusFilter,
        onSearchChange,
    ]))
}

export default AdmNoticiasTableTopContent;