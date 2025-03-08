import React from "react";
import {Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger} from "@heroui/react";
import {ChevronDownIcon} from "@heroui/shared-icons";
import {FilterCollection} from "@/models/shared/FilterCollection";

interface TopContentDropDownProps {
    width: string;
    label: string;
    allSelectedLabel: string;
    multipleSelectedLabel: string;
    selectionType?: 'single' | 'multiple';
    filterStatus: string | string[];
    setFilterStatus: (status: string | string[]) => void;
    collection: FilterCollection[],
    size?: 'sm' | 'md' | 'lg';
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
        selectionType,
        size
    }) => {
    return (
        <div className={`flex flex-col ${width}`}>
            {label && <p className="mb-2">{label}</p>}
            <Dropdown shouldBlockScroll={false} size={size ?? 'sm'}>
                <DropdownTrigger className="hidden justify-between p-5 sm:flex font-semibold h-9">
                    <Button endContent={<ChevronDownIcon className="text-small"/>} variant="flat">
                        {filterStatus.length === 1 ? Array.from(filterStatus)[0] : filterStatus.length === collection.length || filterStatus === 'all' ? allSelectedLabel : Array.from(filterStatus)[0] === 'Desativado' ? 'Desativado' :multipleSelectedLabel}
                    </Button>
                </DropdownTrigger>
                <DropdownMenu
                    aria-label={' '}
                    disallowEmptySelection
                    closeOnSelect={false}
                    selectedKeys={filterStatus}
                    selectionMode={selectionType ?? 'multiple'}
                    onSelectionChange={(keys) => { setFilterStatus([...keys as unknown as string[]])}}
                >
                    {collection.map((status) => (
                        <DropdownItem textValue={status.name} key={status.name} className="capitalize">
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