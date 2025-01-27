import {PessoaCriacao, PessoaFisJurEnd} from "@/actions/pessoas";

export const getFlatPessoa = (pessoaCriada?: PessoaFisJurEnd): PessoaCriacao => {
    if(pessoaCriada){
        return{
            id: pessoaCriada?.id!,
            nome: pessoaCriada?.pessoaFisica?.nome! ?? pessoaCriada?.pessoaJuridica?.razaoSocial,
            categoria: pessoaCriada?.pessoaFisica != null ? 'Física' : 'Jurídica',
            tipo: pessoaCriada?.categoriaId,
            dataNascimento: pessoaCriada?.pessoaFisica?.dataNascimento.toISOString().slice(0, 10),
            rg: pessoaCriada?.pessoaFisica?.rg!.toString()!,
            cpf: pessoaCriada?.pessoaFisica?.cpf!.toString()!,
            email: pessoaCriada.email,
            imagemLink: pessoaCriada.imagemLink!,
            cep: pessoaCriada?.enderecos[0]?.cep!.toString()!,
            cidade: pessoaCriada?.enderecos[0]?.cidade!,
            estado: pessoaCriada?.enderecos[0]?.estado!,
            pais: pessoaCriada?.enderecos[0]?.pais!,
            bairro: pessoaCriada?.enderecos[0]?.bairro!,
            logradouro: pessoaCriada?.enderecos[0]?.logradouro!,
            complemento: pessoaCriada?.enderecos[0]?.complemento!,
            numero: pessoaCriada?.enderecos[0]?.numero!,
            cnpj: pessoaCriada?.pessoaJuridica?.cnpj.toString()!,
            inscricaoEstadual: pessoaCriada?.pessoaJuridica?.inscricaoEstadual.toString()!,
            razaoSocial: pessoaCriada?.pessoaJuridica?.razaoSocial.toString()!,
            nomeFantasia: pessoaCriada?.pessoaJuridica?.nomeFantasia!,
            telefone: pessoaCriada?.telefones[0]?.numero.toString()!,
        };
    }
    return {
        dataNascimento: new Date().toISOString().slice(0, 10)
    }
}