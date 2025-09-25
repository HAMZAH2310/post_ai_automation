import React from "react";
import { FooterDesktop } from "~/components/templates/footer/FooterDesktop";

export function HomeDesktop() {
    return (
        <main>
            <h1 className="bg-foreground text-background">
                <h1>Home Desktop</h1>
                <p className="font-outfit">Test font</p>
            </h1>
            <FooterDesktop />
        </main>
    );
}
