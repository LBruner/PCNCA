import React from "react";
import CustomFooterBody from "@/components/UI/footer/custom-footer-body";
import {Cultura} from "@prisma/client";
import {pegaCulturasUnicas} from "@/actions/adm";

const Footer: React.FC = async () => {
    const culturas: Cultura[] = await pegaCulturasUnicas();

    return (
        <CustomFooterBody culturas={culturas}/>
    );
};

export default Footer;
