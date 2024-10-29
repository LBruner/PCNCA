import {db} from "@/db";
import {getServerSession} from "next-auth";
import {User} from "@prisma/client";

export const getCurrentUser = async ():Promise<User | null> =>{
    const session = await getServerSession()

    if(!session?.user?.email) return null;

    return db.user.findUnique({where: {email: session.user.email}});
}
