/**
 * Utilitários para formatação e exibição dos cards de prévia de candidatos
 * Blindagem de dados pré-consulta: oculta nomes reais em buscas de telefone e oculta
 * dados sensíveis (mãe, nascimento, localização) até a confirmação e pagamento da consulta.
 */

export const MENSAGEM_LIBERACAO = 'Resultado após confirmar e consultar';

/**
 * Verifica se um valor textual é considerado desconhecido, vazio ou indisponível
 */
export function isFieldUnknown(val?: string | null): boolean {
  if (!val || typeof val !== 'string') return true;
  const clean = val.trim().toLowerCase();
  return (
    clean === '' ||
    clean === 'xx' ||
    clean === 'n/i' ||
    clean.includes('desconhecid') ||
    clean.includes('indispon') ||
    clean.includes('nao informado') ||
    clean.includes('não informado') ||
    clean.includes('nao consta') ||
    clean.includes('não consta')
  );
}

/**
 * Formata o título principal do card de candidato.
 * Em buscas por telefone, oculta o nome real para impedir que o usuário obtenha o dado gratuitamente.
 */
export function formatCandidateTitle(name: string | undefined | null, isPhone: boolean, index: number = 0, total: number = 1): string {
  if (isPhone) {
    return total > 1 ? `Titular Vinculado (Perfil ${index + 1})` : 'Titular do Telefone';
  }
  if (!name || isFieldUnknown(name)) {
    return total > 1 ? `Perfil Correspondente #${index + 1}` : 'Perfil Correspondente';
  }
  return name;
}

/**
 * Formata a localização do candidato na prévia.
 * Blindada para exibir a mensagem convidativa até a efetivação da consulta.
 */
export function formatCandidateLocation(city?: string | null, state?: string | null): { text: string; isPlaceholder: boolean } {
  return { text: MENSAGEM_LIBERACAO, isPlaceholder: true };
}

/**
 * Formata a filiação (Nome da Mãe) do candidato na prévia.
 * Blindada para nunca exibir o nome ou sobrenome da mãe antes do pagamento.
 */
export function formatCandidateMother(motherName?: string | null): { text: string; isPlaceholder: boolean } {
  return { text: MENSAGEM_LIBERACAO, isPlaceholder: true };
}

/**
 * Data de nascimento na prévia.
 * Blindada para nunca exibir o ano ou data de nascimento antes do pagamento.
 */
export function formatCandidateBirth(dateOfBirth?: string | null): { text: string; isPlaceholder: boolean } {
  return { text: MENSAGEM_LIBERACAO, isPlaceholder: true };
}

/**
 * Formata o CPF do candidato para a exibição de prévia.
 * Exibe rigorosamente apenas 3 dígitos visíveis (ex: ***.796.***-**)
 * permitindo ao cliente identificar o perfil sem liberar dados além do necessário antes de pagar.
 */
export function formatCandidateTaxId(taxId?: string | null): { text: string; isPlaceholder: boolean } {
  if (isFieldUnknown(taxId)) {
    return { text: MENSAGEM_LIBERACAO, isPlaceholder: true };
  }
  const s = String(taxId).trim();

  // Encontra blocos de 3 dígitos na string (caso venha mascarada como ***.796.990-**)
  const matches = s.match(/\d{3}/g);
  if (matches && matches.length > 0) {
    return { text: `***.${matches[0]}.***-**`, isPlaceholder: false };
  }

  const digits = s.replace(/\D/g, '');
  if (digits.length >= 6) {
    return { text: `***.${digits.slice(3, 6)}.***-**`, isPlaceholder: false };
  } else if (digits.length >= 3) {
    return { text: `***.${digits.slice(0, 3)}.***-**`, isPlaceholder: false };
  }

  return { text: '***.***.***-**', isPlaceholder: false };
}
