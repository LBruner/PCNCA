import React from "react";
import CustomFooterBody from "@/components/UI/footer/custom-footer-body";
import {pegaCulturas} from "@/actions/culturas";
import {Category} from "@prisma/client";

const Footer: React.FC = async () => {
    const categories: Category[] = await pegaCulturas();

    return (
        <CustomFooterBody categories={categories}/>
    );
};

export default Footer;
