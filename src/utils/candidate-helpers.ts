/**
 * Utilitários para formatação e exibição dos cards de prévia de candidatos
 * Substitui termos negativos como "Desconhecido" ou "Não informado" por chamadas convidativas
 * orientando o usuário a prosseguir com a confirmação da consulta.
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
 * Formata o nome do candidato na prévia:
 * - Se a busca NÃO foi feita pelo nome (ex: busca por telefone, email, etc.), o nome completo é protegido
 *   e só deve ser liberado após confirmar e consultar/pagar.
 * - Se a busca já foi pelo próprio nome que o usuário digitou, mantém o nome da busca.
 */
export function formatCandidateName(name?: string | null, searchType?: string): { text: string; isPlaceholder: boolean } {
  if (searchType && searchType !== 'nome') {
    return { text: MENSAGEM_LIBERACAO, isPlaceholder: true };
  }
  if (isFieldUnknown(name)) {
    return { text: MENSAGEM_LIBERACAO, isPlaceholder: true };
  }
  return { text: name!, isPlaceholder: false };
}

/**
 * Formata o CPF do candidato para exibir estritamente apenas 3 dígitos visíveis (ex: ***.796.***-**)
 * garantindo que o usuário identifique que o registro existe sem expor dados em excesso antes do pagamento.
 */
export function formatCandidateTaxId(taxId?: string | null): { text: string; isPlaceholder: boolean } {
  if (isFieldUnknown(taxId)) {
    return { text: MENSAGEM_LIBERACAO, isPlaceholder: true };
  }
  const s = String(taxId).trim();

  // Procura blocos de 3 dígitos na string mascarada ou normal
  const match3 = s.match(/\d{3}/);
  if (match3) {
    return { text: `***.${match3[0]}.***-**`, isPlaceholder: false };
  }

  const digits = s.replace(/\D/g, '');
  if (digits.length >= 6) {
    return { text: `***.${digits.slice(3, 6)}.***-**`, isPlaceholder: false };
  } else if (digits.length >= 3) {
    return { text: `***.${digits.slice(0, 3)}.***-**`, isPlaceholder: false };
  }

  return { text: '***.***.***-**', isPlaceholder: false };
}

/**
 * Filiação materna na prévia:
 * Ocultada antes da confirmação paga, liberada após confirmar e consultar.
 */
export function formatCandidateMother(motherName?: string | null): { text: string; isPlaceholder: boolean } {
  return { text: MENSAGEM_LIBERACAO, isPlaceholder: true };
}

/**
 * Data de nascimento na prévia:
 * Ocultada antes da confirmação paga, liberada após confirmar e consultar.
 */
export function formatCandidateBirth(dateOfBirth?: string | null): { text: string; isPlaceholder: boolean } {
  return { text: MENSAGEM_LIBERACAO, isPlaceholder: true };
}

/**
 * Localização na prévia:
 * Ocultada antes da confirmação paga, liberada após confirmar e consultar.
 */
export function formatCandidateLocation(city?: string | null, state?: string | null): { text: string; isPlaceholder: boolean } {
  return { text: MENSAGEM_LIBERACAO, isPlaceholder: true };
}
