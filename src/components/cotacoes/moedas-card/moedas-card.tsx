import React from "react";
import Image from "next/image";
import {FaArrowUp} from "react-icons/fa";
import {Button} from "@nextui-org/react";
import Link from "next/link";
import paths from "@/paths";

const MoedasCard: React.FC = _ => {
    const usFlagURL = 'https://upload.wikimedia.org/wikipedia/commons/d/de/Flag_of_the_United_States.png';

    return (
        <div className={'w-28 '}>
            <div className={'flex gap-3 mb-1'}>
                <Image src={usFlagURL} width={35} height={40} alt={'US Flag'}/>
                <p className={'text-green-600 text-sm'}>R$ 5,65</p>
            </div>
            <div className={'flex gap-3'}>
                <p className={'text-sm'}>Dólar</p>
                <div className={'flex gap-1'}>
                    <p className={'text-sm'}>0,34%</p>
                    <FaArrowUp className={'text-green-400'}/>
                </div>
            </div>
            <Button className={'h-5 bg-white border-1 rounded-md  w-28'} radius={'sm'} size={"sm"}>
                <Link href={paths.cotacoesMoedas()}>Ver em tempo real</Link>
            </Button>
        </div>
    )
}

export default MoedasCard;