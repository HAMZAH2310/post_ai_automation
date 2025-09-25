import { headers } from "next/headers";
import { HomeDesktop, HomeMobile } from "~/components/templates/home";
import { isMobileDevice } from "~/lib/iseMobileDevice";

export default async function Home() {
    const header = await headers();
    const ua = header.get("user-agent") || "";
    const isMobile = isMobileDevice(ua);

    return isMobile ? <HomeMobile /> : <HomeDesktop />;
}
