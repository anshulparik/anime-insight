"use server";

export const fetchAnime = async (page: number) => {
  try {
    const response = await fetch(
      `${process.env?.NEXT_PUBLIC_ANIME_API_URL}/api/animes?page=${page}&limit=8&order=popularity`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error, "Error while fetching data!");
    return [];
  }
};
