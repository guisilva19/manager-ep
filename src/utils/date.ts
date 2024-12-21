export function formatDateToBR(isoDate: string) {
    if (!isoDate) {
      console.error("Data não fornecida.");
      return null;
    }
  
    try {
      const date = new Date(isoDate);
  
      // Verifica se a data é válida
      if (isNaN(date.getTime())) {
        console.error("Data inválida.");
        return null;
      }
  
      // Formata a data no padrão DD/MM/YYYY
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Mês começa em 0
      const year = date.getFullYear();
  
      return `${day}/${month}/${year}`;
    } catch (error) {
      console.error("Erro ao formatar a data:", error);
      return null;
    }
  }
  