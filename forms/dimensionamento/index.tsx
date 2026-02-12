'use client'

import Button from '@/components/button';
import { MaskedInput, NumericInput, SelectInput } from '@/components/input';
import { useState } from 'react';
import listaEstados from '../../database/estados.json'
import listaCidades from '../../database/cidades.json'

export default function DimensionamentoForm() {

    const [consumo, setConsumo] = useState<number>(0);
    const [cep, setCep] = useState<number>();
    const [estado, setEstado] = useState<string>("");
    const [cidade, setCidade] = useState<string>("");

    return (
        <div className="flex justify-center items-center">
            <div className="bg-primary w-full rounded-[40px] p-10 text-white shadow-xl">

                <h2 className="text-center text-3xl font-bold mb-8">
                    Dimensionamento rápido
                </h2>

                <form className="space-y-2.5" onSubmit={e => e.preventDefault()}>
                    <NumericInput
                        label='Consumo médio'
                        name='consumo'
                        id='consumo'
                        onChange={setConsumo}
                        value={consumo}
                        min={0}
                    />

                    <MaskedInput
                        label='CEP'
                        name='cep'
                        id='name'
                        mask='999.999.999-59'
                        onChange={setCep}
                        value={cep}
                        placeholder='000.000.000-00'
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
                    />

                    <Button outline className='w-full mt-2'>CALCULAR</Button>
                </form>

                <div className="mt-12 text-center space-y-8">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-wider">Potência do Sistema</p>
                        <h3 className="text-4xl lg:text-5xl font-bold">110 kWp</h3>
                    </div>

                    <div>
                        <p className="text-sm font-semibold uppercase tracking-wider">Geração média mensal</p>
                        <h3 className="text-5xl lg:text-6xl font-bold">340 kWh</h3>
                    </div>
                </div>

            </div>
        </div>
    );
}

