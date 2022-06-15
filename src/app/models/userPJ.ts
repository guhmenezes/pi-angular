export class UserPJ {
  empresaId?: string;
  cnpj!: string;
  senha!: string;
  corporateName!: string;
  nome!: string;
  startDate!: string;
  email!: string;
  phoneNumber!: string;
  cpf?: string;
}

// body = {
  //   cnpj: cnpj,
  //   senha: senha
  //   razaoSocial: corporateName,
  //   nomeFantasia: tradeName,
  //   dataInicio: startDate,
  //   contatoEmail: email,
  //   contatoTelefone: telefone,
// }