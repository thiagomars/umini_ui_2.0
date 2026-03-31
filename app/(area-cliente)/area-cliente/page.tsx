import { ArrowRightIcon, CalendarIcon, Rocket } from 'lucide-react';

export default function AreaDoClienteEmConstrucao() {

    const GearIcon = ({ className = "", style = {} }) => (
        <svg viewBox="0 0 24 24" fill="none" className={className} style={style}>
            <path
                d="M12 15a3 3 0 100-6 3 3 0 000 6z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );

    return (
        <div className="relative flex items-center justify-center min-h-screen overflow-hidden bg-white py-14">

            <div className="relative z-10 flex flex-col items-center px-6 text-center">

                <div className='relative w-28 h-28'>
                    <GearIcon className="w-28 h-28 text-primary/20 animate-spin animation-duration-[6s] absolute inset-0" />
                    <GearIcon className="w-14 h-14 text-secondary/30 animate-spin animation-duration-[6s] absolute top-1 right-0" />

                    <div className='absolute inset-0 flex items-center justify-center'>
                        <div className="relative w-fit bg-linear-to-r from-primary to-secondary items-center justify-center p-4 border border-gray-100 rounded-full shadow-2xl">
                            <Rocket className="w-6 h-6 text-white" />
                        </div>
                    </div>
                </div>

                <h1 className="mb-8 mt-4 text-4xl font-extrabold tracking-tight text-gray-800 md:text-5xl">
                    Sua <span className="text-primary">Área do Cliente</span>
                    <br /> está sendo construída!
                </h1>

                <p className="max-w-2xl mb-2 text-lg leading-relaxed text-gray-600">
                    Estamos preparando uma experiência incrível e cheia de novidades para você. Nossa equipe está trabalhando nos bastidores para entregar a melhor plataforma possível.
                </p>

                <div className="max-w-xl mt-6 p-6 rounded-3xl bg-linear-to-br from-primary/10 to-secondary/10 border border-primary/10">
                    <p className="text-gray-500 text-sm font-medium uppercase tracking-widest mb-2">Não perca tempo</p>

                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        Enquanto isso, marque uma{" "}
                        <span className="shimmer-text">reunião com nossa equipe</span>
                    </h3>

                    <p className="text-gray-500 mb-6 text-sm leading-relaxed">
                        Nossos especialistas estão prontos para entender as suas necessidades e apresentar as melhores soluções para o seu negócio.
                    </p>

                    <a
                        href="https://wa.me/5588988377485?text=Ol%C3%A1%2C%20preciso%20de%20mais%20informa%C3%A7%C3%B5es%20sobre%20os%20planos%20de%20projetos"
                        target='_blank'
                        className="hover:-translate-y-1 hover:shadow-xl cursor-pointer duration-400 transition-discrete bg-linear-to-r from-primary to-secondary inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl text-white font-semibold text-sm shadow-md"
                    >
                        <CalendarIcon />
                        Agendar reunião
                        <span className={`transition-transform duration-300`}>
                            <ArrowRightIcon />
                        </span>
                    </a>

                    <p className='mt-4'>
                        <a href='/' className='text-secondary text-sm hover:text-primary transition-colors duration-300'>
                            Página inicial
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}