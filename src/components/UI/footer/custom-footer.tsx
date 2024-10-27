import React from "react";
import CustomFooterBody from "@/components/UI/footer/custom-footer-body";
import {getCategorias} from "@/actions/categorias";
import {Category} from "@prisma/client";

const Footer: React.FC = async () => {
    const categories: Category[] = await getCategorias();

    return (
        <CustomFooterBody categories={categories}/>
    );
};

export default Footer;
