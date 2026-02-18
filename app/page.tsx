import BrazilMap from "@/components/BrazilMap";
import SmoothScrolling from "@/components/SmoothScrolling";
import CadastroPlataforma from "@/sections/cadastroPlataforma";
import Combos from "@/sections/combos";
import Duvidas from "@/sections/duvidas";
import HomePage from "@/sections/home-page";
import Modelagem3d from "@/sections/modelagem3d";
import NossosClientes from "@/sections/nossosClientes";
import NumberSections from "@/sections/number-sections";
import Parceiros from "@/sections/parceiros";
import Servicos from "@/sections/servicos";

export default function Home() {
    return (
        <SmoothScrolling>
            <div className="relative">
                <HomePage />
                <NumberSections />
                <NossosClientes />
                <Parceiros />
                <Duvidas />
                <Combos />
                <Servicos />
                <Modelagem3d />
                <CadastroPlataforma />
            </div>
        </SmoothScrolling>
    );
}
