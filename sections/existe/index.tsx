import Section from "@/components/section";
import Comentarios from "../comentarios";


export default function Existe() {

    return (
        <section id="existe">
            <Section>
                <div className="flex flex-col md:flex-row gap-10 p-8 md:p-20">
                    <div className="md:w-1/2 py-20 text-center md:text-left">
                        <h1 className="text-primary font-bold text-3xl pb-6">Por que a Umini existe?</h1>

                        <p>Para democratizar a engenharia.</p>
                        <p>Para aproximar tecnologia de pessoas.</p>
                        <p>Para transformar conhecimento em resultados.</p>
                        <p>Para criar soluções eficientes, humanizadas e acessíveis.</p>
                    </div>

                    <div className="md:w-1/2">
                        <Comentarios />
                    </div>
                </div>
            </Section>
        </section>
    )
}