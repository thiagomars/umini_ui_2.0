'use client'

import Button from '@/components/button';
import { CheckboxInput, MaskedInput, TextInput } from '@/components/input';
import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { toast } from 'react-toastify';
import { cn } from '@/lib/utils';

export default function CadastroForm() {
    emailjs.init("eKqMVPsDah9Vse9UI");

    const [nome, setNome] = useState<string>("");
    const [empresa, setEmpresa] = useState<string>("");
    const [cnpj, setCnpj] = useState<number>();
    const [whatsapp, setWhatsapp] = useState<number>();
    const [email, setEmail] = useState<string>("");
    const [termos, setTermos] = useState<boolean>(false);

    const [nomeError, setNomeError] = useState<boolean>(false);
    const [empresaError, setEmpresaError] = useState<boolean>(false);
    const [cnpjError, setCnpjError] = useState<boolean>(false);
    const [whatsappError, setWhatsappError] = useState<boolean>(false);
    const [emailError, setEmailError] = useState<boolean>(false);

    const [enviado, setEnviado] = useState<boolean>(false);
    const [carregando, setCarregando] = useState<boolean>(false);

    function validateForm(): boolean {
        if (!nome || !empresa || !cnpj || !whatsapp || !email) {
            setNomeError(!nome);
            setEmpresaError(!empresa);
            setCnpjError(!cnpj);
            setWhatsappError(!whatsapp);
            setEmailError(!email);

            toast.warning("Por favor, preencha todos os campos.");
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            toast.warning("Por favor, insira um endereço de e-mail válido.");
            return false;
        }

        if (!termos) {
            toast.warning("Você deve aceitar os termos para se cadastrar.");
            return false;
        }

        return true;
    }


    function handleSubmit() {
        setCarregando(true);

        if (!validateForm()) {
            setCarregando(false);
            return;
        }

        emailjs.send("service_b9pxwev", "template_qkgpy2v", {
            name: nome,
            message: `
Empresa: ${empresa}
CNPJ: ${cnpj}
WhatsApp: ${whatsapp}
E-mail: ${email}
Termos: ${termos ? "Aceito" : "Não aceito"}
`,
            title: "Cadastro Plataforma Umini",
            email: email
        }).then(() => {
            toast.success("Cadastro realizado com sucesso!");

            setNome("");
            setEmpresa("");
            setCnpj(undefined);
            setWhatsapp(undefined);
            setEmail("");
            setTermos(false);

            setEnviado(true);
        }, () => {
            toast.error("Ocorreu um erro ao realizar o cadastro. Por favor, tente novamente mais tarde.");
            setCarregando(false);
        });
    }

    return (
        <div className='relative'>
            <h2 className={cn(
                "text-center text-3xl font-bold mb-8",
                enviado ? "opacity-0" : "opacity-100",
                "transition-opacity duration-500"
            )}>
                Cadastre-se
            </h2>

            <form className={cn("space-y-4 z-10", !enviado ? "opacity-100" : "opacity-0", "transition-opacity duration-500")} onSubmit={e => e.preventDefault()}>
                <TextInput
                    label='Nome completo'
                    name='nome'
                    id='nome'
                    onChange={setNome}
                    value={nome}
                    setHasError={setNomeError}
                    hasError={nomeError}
                />

                <TextInput
                    label='Nome da empresa'
                    name='empresa'
                    id='empresa'
                    onChange={setEmpresa}
                    value={empresa}
                    setHasError={setEmpresaError}
                    hasError={empresaError}
                />

                <MaskedInput
                    label='CNPJ'
                    name='cnpj'
                    id='cnpj'
                    mask='99.999.999/9999-99'
                    onChange={setCnpj}
                    value={cnpj}
                    placeholder='000.000.000-00'
                    setHasError={setCnpjError}
                    hasError={cnpjError}
                />

                <MaskedInput
                    label='WhatsApp'
                    name='whatsapp'
                    id='whatsapp'
                    mask='(99) 99999-9999'
                    onChange={setWhatsapp}
                    value={whatsapp}
                    placeholder='(00) 91234-5678'
                    setHasError={setWhatsappError}
                    hasError={whatsappError}
                />

                <TextInput
                    label='Email'
                    name='email'
                    id='email'
                    onChange={setEmail}
                    value={email}
                    type='email'
                    setHasError={setEmailError}
                    hasError={emailError}

                />

                <CheckboxInput
                    label={<span>Declaro que li e aceito os <a href='' className='text-primary hover:text-gray-700 hover:underline'>Termos de Uso e Compromisso</a>.</span>}
                    name='termos'
                    checked={termos}
                    onChange={setTermos}
                    accent='accent-secondary'
                />

                <Button
                    className='w-full mt-6 text-white'
                    onClick={handleSubmit}
                    disabled={carregando}
                >
                    CADASTRAR
                </Button>
            </form>

            {enviado && <p className={cn(
                "text-center text-lg px-4 absolute top-1/3 z-2",
                enviado ? "opacity-100" : "opacity-0",
                "transition-opacity duration-500 delay-300"
            )}>
                <span className='text-3xl font-bold'>Cadastro realizado com sucesso!</span> <br /><br />Em breve, um de nossos consultores entrará em contato
                via WhatsApp para dar continuidade ao cadastro.
            </p>}
        </div >
    );
}

