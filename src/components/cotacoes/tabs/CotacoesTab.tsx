import React from "react";
import {Tab, Tabs} from "@nextui-org/react";
import {IoTrophy} from "react-icons/io5";
import {BiSolidReport, BiStore} from "react-icons/bi";
import {GoGraph} from "react-icons/go";

interface CotacoesTabProps {
    showMaisVistos: boolean,
    setShowMaisVistos: (value: boolean) => void
}

const CotacoesTab: React.FC<CotacoesTabProps> = ({setShowMaisVistos, showMaisVistos}) => {
    return (
        <div className={'flex'}>
            <Tabs onSelectionChange={event => {
                setShowMaisVistos(event === 'mais-vistos')
                console.log(showMaisVistos)
            }} aria-label="Options" color="default" variant="bordered">
                <Tab
                    key="mais-vistos"
                    title={
                        <div className="flex items-center space-x-2">
                            <IoTrophy/>
                            <span className={'font-bold'}>Mais Vistos</span>
                        </div>
                    }
                />
                <Tab
                    key="todos-produtos"
                    title={
                        <div className="flex items-center space-x-2">
                            <BiStore/>
                            <span>Todos Produtos</span>
                        </div>
                    }
                />
                <Tab
                    key="relatorio"
                    title={
                        <div className="flex items-center space-x-2">
                            <BiSolidReport/>
                            <span>Relatórios</span>
                        </div>
                    }
                />
                <Tab
                    key="gráfico"
                    title={
                        <div className="flex items-center space-x-2">
                            <GoGraph/>
                            <span>Gráfico</span>
                        </div>
                    }
                />
            </Tabs>
        </div>
    )
}

export default CotacoesTab;