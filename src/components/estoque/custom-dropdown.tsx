'use client';
import React from "react";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";

export default function CustomDropdown() {
    const [selectedKeys, setSelectedKeys] = React.useState(new Set(["Mostrar: Todos"]));

    const selectedValue = React.useMemo(
        () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
        [selectedKeys]
    );

    return (
        <Dropdown>
            <DropdownTrigger className={'w-40'}>
                <Button
                    variant="bordered"
                    className="capitalize"
                >
                    {selectedValue}
                </Button>
            </DropdownTrigger>
            <DropdownMenu
                aria-label="Single selection example"
                variant="bordered"
                disallowEmptySelection
                selectionMode="single"
                selectedKeys={selectedKeys}
                onSelectionChange={(keys) => setSelectedKeys(keys as Set<string>)}>
                <DropdownItem
                    key="Mostrar: Todos">Todos</DropdownItem>
                <DropdownItem key="Mostrar: Ativos">Ativos</DropdownItem>
                <DropdownItem key="Mostrar: Desativados">Desativados</DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
}

