export const useBudget = () => {
  const list = async (page: number, status: number) => {
    try {
      const response = await fetch(
        `/api/orcamento?page=${page}&status=${status}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_ep")}`,
          },
        }
      );

      const result = await response.json();
      return result;
    } catch (error) {}
  };

  return { list };
};
