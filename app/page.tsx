import HomePage from "@/sections/home-page";
import NumberSections from "@/sections/number-sections";
import Image from "next/image";

export default function Home() {
    return (
        <div>
            <HomePage />
            <NumberSections />
        </div>
    );
}
