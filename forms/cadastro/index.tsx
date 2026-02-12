'use client'

import Button from '@/components/button';
import { CheckboxInput, MaskedInput, NumericInput, SelectInput, TextInput } from '@/components/input';
import React, { useState } from 'react';

export default function CadastroForm() {

    const [nome, setNome] = useState<string>("");
    const [empresa, setEmpresa] = useState<string>("");
    const [cnpj, setCnpj] = useState<number>();
    const [whatsapp, setWhatsapp] = useState<number>();
    const [email, setEmail] = useState<string>("");
    const [termos, setTermos] = useState<boolean>(false);

    return (
        <div>
            <h2 className="text-center text-3xl font-bold mb-8">
                Cadastre-se
            </h2>

            <form className="space-y-4" onSubmit={e => e.preventDefault()}>
                <TextInput
                    label='Nome completo'
                    name='nome'
                    id='nome'
                    onChange={setNome}
                    value={nome}
                />

                <TextInput
                    label='Nome da empresa'
                    name='empresa'
                    id='empresa'
                    onChange={setEmpresa}
                    value={empresa}
                />

                <MaskedInput
                    label='CNPJ'
                    name='cnpj'
                    id='cnpj'
                    mask='99.999.999/9999-99'
                    onChange={setCnpj}
                    value={cnpj}
                    placeholder='000.000.000-00'
                />

                <MaskedInput
                    label='WhatsApp'
                    name='whatsapp'
                    id='whatsapp'
                    mask='(99) 99999-9999'
                    onChange={setWhatsapp}
                    value={whatsapp}
                    placeholder='(00) 91234-5678'
                />

                <TextInput
                    label='Email'
                    name='email'
                    id='email'
                    onChange={setEmail}
                    value={email}
                    type='email'
                />

                <CheckboxInput
                    label={<span>Declaro que li e aceito os <a href='' className='text-primary hover:text-gray-700 hover:underline'>Termos de Uso e Compromisso</a>.</span>}
                    name='termos'
                    checked={termos}
                    onChange={setTermos}
                    accent='accent-secondary'
                />

                <Button className='w-full mt-6 text-white'>CALCULAR</Button>
            </form>
        </div>
    );
}

