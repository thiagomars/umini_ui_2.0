'use client'

import Button from '@/components/button';
import { MaskedInput, NumericInput, SelectInput } from '@/components/input';
import { useEffect, useState } from 'react';
import listaEstados from '@/database/estados.json';
import listaCidades from '@/database/cidades.json';
import listaPvout from '@/database/pvout.json';
import { cn } from '@/lib/utils';

export default function DimensionamentoForm() {

    const [consumo, setConsumo] = useState<number>(0);
    const [cep, setCep] = useState<number>();
    const [estado, setEstado] = useState<string>("");
    const [cidade, setCidade] = useState<string>("");

    const [consumoError, setConsumoError] = useState<boolean>(false);
    const [cepError, setCepError] = useState<boolean>(false);
    const [estadoError, setEstadoError] = useState<boolean>(false);
    const [cidadeError, setCidadeError] = useState<boolean>(false);

    const [resultadoPotencia, setResultadoPotencia] = useState<number>(0);
    const [resultadoGeracao, setResultadoGeracao] = useState<number>(0);

    const handleCalcular = () => {
        if (!consumo)
            setConsumoError(true);

        if (!cidade)
            setCidadeError(true);

        if (!estado)
            setEstadoError(true);

        if (!!cep && cep?.toString()?.replace(/\D/g, "").length < 8)
            setCepError(true);

        if (!consumo || !cidade || !estado)
            return;

        const dadosSolar = listaPvout.find(x => x.id.toString() === cidade);

        if (!dadosSolar || !dadosSolar.pvout) {
            alert("Dados solares não encontrados para esta região.");
            return;
        }

        const potenciaKwp = (consumo * 12) / (dadosSolar.pvout ?? 0);
        const geracaoMensal = potenciaKwp * dadosSolar.pvout / 12;

        setResultadoPotencia(potenciaKwp + (potenciaKwp * 0.12)); // Adicionando 12% de margem
        setResultadoGeracao(geracaoMensal);
    };

    useEffect(() => {
        if (cep?.toString()?.replace(/\D/g, "").length === 8) {
            fetch(`https://viacep.com.br/ws/${cep.toString().replace(/\D/g, "")}/json/`)
                .then(res => res.json())
                .then(data => {
                    if (!data.erro) {
                        if (!!data?.estado) {
                            const estadoEncontrado = listaEstados.find(e => e.state?.toLocaleLowerCase() == data.estado?.toLocaleLowerCase());
                            setEstado(estadoEncontrado ? estadoEncontrado.id.toString() : "");
                        }

                        if (!!data?.localidade) {
                            const cidadeEncontrada = listaCidades.find(c => c.name?.toLocaleLowerCase() == data.localidade?.toLocaleLowerCase());
                            setCidade(cidadeEncontrada ? cidadeEncontrada.id.toString() : "");
                        }
                    } else {
                        setEstado("");
                        setCidade("");
                    }
                })
                .catch(error => {
                    setEstado("");
                    setCidade("");
                });
        }
    }, [cep])

    return (
        <div className="flex justify-center items-center">
            <div className="bg-primary w-full rounded-[40px] p-10 text-white shadow-xl">

                <h2 className="text-center text-2xl md:text-3xl font-bold mb-8">
                    Dimensionamento rápido
                </h2>

                <form className="space-y-4 max-w-md mx-auto" onSubmit={e => e.preventDefault()}>
                    <NumericInput
                        label='Consumo médio da geradora + rateios (kWh/mês)'
                        name='consumo'
                        id='consumo'
                        onChange={setConsumo}
                        value={consumo}
                        min={0}
                        hasError={consumoError}
                        setHasError={setConsumoError}
                    />

                    <MaskedInput
                        label='CEP'
                        name='cep'
                        id='name'
                        mask='99.999-999'
                        onChange={setCep}
                        value={cep}
                        placeholder='00.000-000'
                        hasError={cepError}
                        setHasError={setCepError}
                    />

                    <SelectInput
                        label='Estado'
                        name='estado'
                        id='estado'
                        onChange={setEstado}
                        value={estado}
                        options={[
                            { value: "0", label: "Selecione..." },
                            ...listaEstados?.map(x => ({
                                value: x.id.toString(),
                                label: x.state
                            }))
                        ]}
                        hasError={estadoError}
                        setHasError={setEstadoError}
                    />

                    <SelectInput
                        label='Cidade'
                        name='cidade'
                        id='cidade'
                        onChange={setCidade}
                        value={cidade}
                        disabled={!estado}
                        options={[
                            { value: "0", label: "Selecione..." },
                            ...(!!estado ? listaCidades?.filter(x => x.state == listaEstados?.find(s => s.id?.toString() == estado)?.state)?.map(x => ({
                                value: x.id.toString(),
                                label: x.name
                            })) : [])
                        ]}
                        hasError={cidadeError}
                        setHasError={setCidadeError}
                    />

                    <Button
                        outline
                        className='w-full mt-2'
                        onClick={handleCalcular}
                    >
                        CALCULAR
                    </Button>
                </form>


                <div className={cn(
                    !!resultadoGeracao && !!resultadoPotencia ? "max-h-150" : "max-h-0",
                    "mt-10 text-center space-y-8 overflow-hidden transition-all duration-500 ease-in-out"
                )}>
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-wider">Potência do Sistema</p>
                        <h3 className="text-4xl lg:text-5xl font-bold transition-all duration-300">
                            {resultadoPotencia?.toFixed(2).replace(".", ",")} kWp
                        </h3>
                    </div>

                    <div>
                        <p className="text-sm font-semibold uppercase tracking-wider">Geração média mensal</p>
                        <h3 className="text-5xl lg:text-6xl font-bold">
                            {resultadoGeracao?.toFixed(2).replace(".", ",")} kWh
                        </h3>
                    </div>
                </div>
            </div>
        </div>
    );
}

