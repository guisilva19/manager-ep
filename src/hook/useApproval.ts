export const useApproval = () => {
  const list = async (page: number, status: number) => {
    try {
      const response = await fetch(
        `/api/homologation?page=${page}&status=${status}`,
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

  const findUnique = async (id: string) => {
    try {
      const response = await fetch(`/api/homologation/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_ep")}`,
        },
      });

      const result = await response.json();
      return result;
    } catch (error) {}
  };

  return { list, findUnique };
};
