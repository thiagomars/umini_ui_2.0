import SmoothScrolling from "@/components/SmoothScrolling";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <SmoothScrolling>
            {children}
        </SmoothScrolling>
    );
}
