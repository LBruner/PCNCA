import React from "react";
import {BreadcrumbItem, Breadcrumbs} from "@nextui-org/react";
import Link from "next/link";
import paths from "@/paths";

interface  CustomBreadcumbProps {
    breadcumbs: CustomBreadcumb[];
}

type CustomBreadcumb = {
    title: string;
    href?: string;
}

const CustomBreadcumbs: React.FC<CustomBreadcumbProps> = ({breadcumbs}) => {
    return (
        <div className={'px-12 mb-8'}>
            <Breadcrumbs size={'lg'}>
                {breadcumbs.map((breadcumb, index) => (
                    <BreadcrumbItem key={index}>
                        <Link href={breadcumb.href ?? ''}>
                            {breadcumb.title}
                        </Link>
                    </BreadcrumbItem>
                ))}
            </Breadcrumbs>
        </div>
    )
}

export default CustomBreadcumbs;