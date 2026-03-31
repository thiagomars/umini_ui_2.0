import Navbar from "@/components/navbar";
import SmoothScrolling from "@/components/SmoothScrolling";
import Footer from "@/sections/footer";

export default function RootLayoutSite({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Navbar />
            <SmoothScrolling>
                {children}
            </SmoothScrolling>
            <Footer />
        </>
    );
}
