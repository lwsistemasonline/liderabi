export function formatDateBrazil(date) {
    return new Date(date).toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }).replace(`,`, ``);
}