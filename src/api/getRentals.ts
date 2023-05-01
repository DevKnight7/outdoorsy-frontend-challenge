import axios from "axios";

export async function searchRentalsByKeyword(
  keyWord: string,
  limitPerPage: number,
  offset: number
) {
  const response = await axios.get(
    import.meta.env.VITE_API_BASE_URL +
      `/rentals?filter[keywords]=${keyWord}&page[limit]=${limitPerPage}&page[offset]=${offset}`
  );
  return response.data;
}
