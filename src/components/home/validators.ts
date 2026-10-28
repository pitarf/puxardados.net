/**
 * Funções utilitárias e algoritmos oficiais de validação cadastral e de identificadores.
 * Padrões suportados:
 * - CPF (Dígitos verificadores oficiais Módulo 11)
 * - CNPJ (Numérico tradicional e Alfanumérico oficial da Receita Federal vigente a partir de julho/2026)
 * - Telefone (Padrão nacional com DDD e 10 ou 11 dígitos, suporte a celulares e fixos)
 * - Placa (Padrão tradicional LLL-NNNN e Padrão Mercosul LLLNLNN)
 * - Nome (Caracteres válidos e tamanho mínimo)
 */

/**
 * Validação de CPF com conferência dos dígitos verificadores via Módulo 11
 */
export function validarCPF(cpf: string): { valido: boolean; mensagem?: string } {
  const limpo = cpf.replace(/\D/g, '');

  if (!limpo) {
    return { valido: false, mensagem: 'Informe o CPF para começar.' };
  }

  if (limpo.length !== 11) {
    return { valido: false, mensagem: 'Confira o CPF informado. O documento deve conter 11 dígitos.' };
  }

  // Sequências inválidas conhecidas com todos os dígitos repetidos
  if (/^(\d)\1{10}$/.test(limpo)) {
    return { valido: false, mensagem: 'Confira o CPF informado. A sequência não corresponde a um formato válido.' };
  }

  // Primeiro dígito verificador
  let soma = 0;
  for (let i = 0; i < 9; i++) {
    soma += parseInt(limpo.charAt(i), 10) * (10 - i);
  }
  let resto = 11 - (soma % 11);
  let dv1 = resto >= 10 ? 0 : resto;

  if (dv1 !== parseInt(limpo.charAt(9), 10)) {
    return { valido: false, mensagem: 'Confira o CPF informado. A sequência não corresponde a um formato válido.' };
  }

  // Segundo dígito verificador
  soma = 0;
  for (let i = 0; i < 10; i++) {
    soma += parseInt(limpo.charAt(i), 10) * (11 - i);
  }
  resto = 11 - (soma % 11);
  let dv2 = resto >= 10 ? 0 : resto;

  if (dv2 !== parseInt(limpo.charAt(10), 10)) {
    return { valido: false, mensagem: 'Confira o CPF informado. A sequência não corresponde a um formato válido.' };
  }

  return { valido: true };
}

/**
 * Mapeamento de caracteres para o algoritmo oficial de CNPJ alfanumérico da Receita Federal (2026):
 * O valor do caractere é obtido através do seu código ASCII subtraído de 48 (valor ASCII de '0').
 * Caracteres '0' a '9' valem de 0 a 9.
 * Caracteres 'A' a 'Z' valem de 17 a 42 (ex: 'A' é 65 - 48 = 17).
 */
function valorCaractereCnpj(c: string): number {
  return c.charCodeAt(0) - 48;
}

/**
 * Validação de CNPJ suportando tanto o formato puramente numérico tradicional
 * quanto o formato alfanumérico regulamentado pela Receita Federal a partir de 2026.
 * As primeiras 12 posições são alfanuméricas (letras maiúsculas e números) e os 2 últimos dígitos (DV) são numéricos.
 */
export function validarCNPJ(cnpj: string): { valido: boolean; tipo?: 'numerico' | 'alfanumerico'; mensagem?: string } {
  // Remove pontuação de formatação comum: pontos, barras, traços e espaços
  const limpo = cnpj.trim().toUpperCase().replace(/[.\-\/\s]/g, '');

  if (!limpo) {
    return { valido: false, mensagem: 'Informe o CNPJ para começar.' };
  }

  if (limpo.length !== 14) {
    return { valido: false, mensagem: 'Revise o CNPJ informado e tente novamente. Deve conter 14 caracteres.' };
  }

  // Verifica se contém apenas caracteres permitidos: [0-9A-Z]
  if (!/^[0-9A-Z]{14}$/.test(limpo)) {
    return { valido: false, mensagem: 'Revise o CNPJ informado e tente novamente. Caracteres inválidos encontrados.' };
  }

  // Os dois últimos caracteres (DVs) devem ser dígitos numéricos [0-9] conforme regra oficial
  if (!/^[0-9]{2}$/.test(limpo.slice(12, 14))) {
    return { valido: false, mensagem: 'Revise o CNPJ informado. Os dois últimos caracteres verificadores devem ser numéricos.' };
  }

  const isAlfanumerico = /[A-Z]/.test(limpo.slice(0, 12));

  // Sequências com 14 caracteres idênticos repetidos são inválidas
  if (/^(.)\1{13}$/.test(limpo)) {
    return { valido: false, mensagem: 'Revise o CNPJ informado e tente novamente.' };
  }

  // Cálculo dos DVs utilizando os pesos oficiais de Módulo 11
  // Pesos para o 1º DV: 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2
  const pesos1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  let soma1 = 0;
  for (let i = 0; i < 12; i++) {
    soma1 += valorCaractereCnpj(limpo[i]) * pesos1[i];
  }
  let resto1 = soma1 % 11;
  let dv1 = resto1 < 2 ? 0 : 11 - resto1;

  if (dv1 !== parseInt(limpo.charAt(12), 10)) {
    return { valido: false, mensagem: 'Revise o CNPJ informado e tente novamente.' };
  }

  // Pesos para o 2º DV: 6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2
  const pesos2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  let soma2 = 0;
  for (let i = 0; i < 13; i++) {
    soma2 += valorCaractereCnpj(limpo[i]) * pesos2[i];
  }
  let resto2 = soma2 % 11;
  let dv2 = resto2 < 2 ? 0 : 11 - resto2;

  if (dv2 !== parseInt(limpo.charAt(13), 10)) {
    return { valido: false, mensagem: 'Revise o CNPJ informado e tente novamente.' };
  }

  return { valido: true, tipo: isAlfanumerico ? 'alfanumerico' : 'numerico' };
}

/**
 * Validação de telefone brasileiro com DDD
 */
export function validarTelefone(telefone: string): { 
  valido: boolean; 
  tipo?: 'celular' | 'fixo'; 
  ddd?: string;
  mensagem?: string 
} {
  let limpo = telefone.replace(/\D/g, '');

  if (!limpo) {
    return { valido: false, mensagem: 'Informe um telefone brasileiro completo com DDD.' };
  }

  // Remove código do país +55 se houver
  if (limpo.startsWith('55') && (limpo.length === 12 || limpo.length === 13)) {
    limpo = limpo.slice(2);
  }

  if (limpo.length !== 10 && limpo.length !== 11) {
    return { valido: false, mensagem: 'Informe um telefone brasileiro completo com DDD.' };
  }

  // Sequências com todos os dígitos repetidos
  if (/^(\d)\1+$/.test(limpo)) {
    return { valido: false, mensagem: 'Informe um telefone brasileiro completo com DDD.' };
  }

  const ddd = limpo.substring(0, 2);
  const dddNum = parseInt(ddd, 10);

  // Lista de DDDs válidos no Brasil
  const dddsValidos = [
    11, 12, 13, 14, 15, 16, 17, 18, 19, // SP
    21, 22, 24, // RJ
    27, 28, // ES
    31, 32, 33, 34, 35, 37, 38, // MG
    41, 42, 43, 44, 45, 46, // PR
    47, 48, 49, // SC
    51, 53, 54, 55, // RS
    61, // DF
    62, 64, // GO
    63, // TO
    65, 66, // MT
    67, // MS
    68, // AC
    69, // RO
    71, 73, 74, 75, 77, // BA
    79, // SE
    81, 87, // PE
    82, // AL
    83, // PB
    84, // RN
    85, 88, // CE
    86, 89, // PI
    91, 93, 94, // PA
    92, 97, // AM
    95, // RR
    96, // AP
    98, 99 // MA
  ];

  if (!dddsValidos.includes(dddNum)) {
    return { valido: false, mensagem: `DDD (${ddd}) informado não é reconhecido no Brasil.` };
  }

  const numero = limpo.substring(2);

  if (limpo.length === 11) {
    // Celulares no Brasil iniciam com 9
    if (numero[0] !== '9') {
      return { valido: false, mensagem: 'Celulares com 11 dígitos devem iniciar com o dígito 9.' };
    }
    return { valido: true, tipo: 'celular', ddd };
  } else {
    // Fixos possuem 8 dígitos e geralmente começam com 2, 3, 4 ou 5
    if (!['2', '3', '4', '5'].includes(numero[0])) {
      return { valido: false, mensagem: 'Informe um telefone brasileiro completo com DDD.' };
    }
    return { valido: true, tipo: 'fixo', ddd };
  }
}

/**
 * Validação de placa de veículo (Mercosul ou Tradicional Brasileira)
 */
export function validarPlaca(placa: string): { 
  valido: boolean; 
  tipo?: 'mercosul' | 'tradicional'; 
  mensagem?: string 
} {
  const limpo = placa.trim().toUpperCase().replace(/[^A-Z0-9]/g, '');

  if (!limpo) {
    return { valido: false, mensagem: 'Informe a placa do veículo para começar.' };
  }

  if (limpo.length !== 7) {
    return { valido: false, mensagem: 'Confira os sete caracteres da placa.' };
  }

  // Padrão Tradicional: LLLNNNN (Ex: ABC1234)
  const regexTradicional = /^[A-Z]{3}[0-9]{4}$/;
  if (regexTradicional.test(limpo)) {
    return { valido: true, tipo: 'tradicional' };
  }

  // Padrão Mercosul: LLLNLNN (Ex: ABC1D23)
  const regexMercosul = /^[A-Z]{3}[0-9][A-Z][0-9]{2}$/;
  if (regexMercosul.test(limpo)) {
    return { valido: true, tipo: 'mercosul' };
  }

  return { valido: false, mensagem: 'Confira os sete caracteres da placa.' };
}

/**
 * Validação básica de nome para pesquisa
 */
export function validarNome(nome: string): { valido: boolean; mensagem?: string } {
  const limpo = nome.trim();

  if (!limpo) {
    return { valido: false, mensagem: 'Digite um nome para continuar.' };
  }

  if (limpo.length < 3) {
    return { valido: false, mensagem: 'Digite pelo menos 3 caracteres para pesquisar por nome.' };
  }

  return { valido: true };
}
