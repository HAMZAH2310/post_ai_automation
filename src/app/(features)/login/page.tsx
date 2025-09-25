import { LoginDesktop } from "~/app/(features)/login/pages/LoginDesktop";
import { LoginMobile } from "~/app/(features)/login/pages/LoginMobile";
import { Metadata } from "next";
import { headers } from "next/headers";
import { isMobileDevice } from "~/lib/iseMobileDevice";

export const metadata: Metadata = {
    title: "Nextjs - Template by Daffa Fathan",
    description: "Nextjs - Template",
};

export default async function Login() {
    const header = await headers();
    const ua = header.get("user-agent") || "";
    const isMobile = isMobileDevice(ua);

    return isMobile ? <LoginMobile /> : <LoginDesktop />;
}
