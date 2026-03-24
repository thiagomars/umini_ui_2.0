import Existe from "@/sections/existe";
import NossosClientes from "@/sections/nossosClientes";
import NossosNumeros from "@/sections/nossosNumeros";
import Parceiros from "@/sections/parceiros";
import Pilares from "@/sections/pilares";
import Selo from "@/sections/selo";
import SobreUmini from "@/sections/sobre";

export default function Sobre() {

    return (
        <div className="pt-44">
            <SobreUmini />
            <Pilares />
            <Selo />
            <Parceiros />

            <section id="numeros">
                <h2 className="text-center text-4xl md:text-5xl font-bold pt-20">Nossos números</h2>
                <NossosNumeros />
            </section>

            <Existe />
            <NossosClientes />
        </div>
    )
}