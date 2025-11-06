import React from "react";
import CustomFooterBody from "@/components/UI/footer/custom-footer-body";
import {Cultura} from "@prisma/client";
import {pegaCulturasUnicas} from "@/actions/adm";
import { pegaUsuario } from "@/actions/usuarios";

const Footer: React.FC = async () => {
    const culturas: Cultura[] = await pegaCulturasUnicas();
    const user = await pegaUsuario()

    return (
        <CustomFooterBody user={user} culturas={culturas}/>
    );
};

export default Footer;
