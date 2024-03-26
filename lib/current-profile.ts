import { cookies } from "next/headers";

export const currentProfile = async () => {

    const cookieStore = cookies()
    const user = cookieStore.get('user')
    if (!user) throw new Error("Unauthorized");
    return user;
}