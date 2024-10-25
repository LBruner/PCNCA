import React from "react";
import {Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger} from "@nextui-org/react";
import {ChevronDownIcon} from "@nextui-org/shared-icons";
import {FilterCollection} from "@/models/shared/FilterCollection";

interface TopContentDropDownProps {
    width: string;
    label: string;
    allSelectedLabel: string;
    multipleSelectedLabel: string;
    selectionType?: 'single' | 'multiple';
    filterStatus: string | string[];
    setFilterStatus: (status: string | string[]) => void;
    collection: FilterCollection[]
}
const TopContentDropDown: React.FC<TopContentDropDownProps> = (
    {
        width,
        collection,
        label,
        filterStatus,
        setFilterStatus,
        multipleSelectedLabel,
        allSelectedLabel,
        selectionType
    }) => {
    return (
        <div className={`flex flex-col ${width}`}>
            <p className={'text-sm mb-2'}>{label}</p>
            <Dropdown size={'sm'}>
                <DropdownTrigger className="hidden justify-between sm:flex font-semibold h-9">
                    <Button endContent={<ChevronDownIcon className="text-small"/>} variant="flat">
                        {filterStatus.length === 1 ? Array.from(filterStatus)[0] : filterStatus.length === collection.length || filterStatus === 'all' ? allSelectedLabel : Array.from(filterStatus)[0] === 'Desativado' ? 'Desativado' :multipleSelectedLabel}
                    </Button>
                </DropdownTrigger>
                <DropdownMenu
                    disallowEmptySelection
                    aria-label="Table Columns"
                    closeOnSelect={false}
                    selectedKeys={filterStatus}
                    selectionMode={selectionType ?? 'multiple'}
                    onSelectionChange={(keys) => { setFilterStatus([...keys as unknown as string[]])}}
                >
                    {collection.map((status) => (
                        <DropdownItem key={status.uid} className="capitalize">
                            {capitalize(status.name)}
                        </DropdownItem>
                    ))}
                </DropdownMenu>
            </Dropdown>
        </div>
    )
}

function capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export default TopContentDropDown;