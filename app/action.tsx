"use server";

import AnimeCard, { AnimeProp } from "@/components/AnimeCard";

export const fetchAnime = async (page: number) => {
  try {
    const response = await fetch(
      `${process.env?.NEXT_PUBLIC_ANIME_API_URL}/api/animes?page=${page}&limit=8&order=popularity`
    );
    const data = await response.json();
    if (data?.length === 0) return [];
    return data.map((item: AnimeProp, index: number) => {
      return <AnimeCard key={item.id} anime={item} index={index} />;
    });
  } catch (error) {
    console.log(error, "Error while fetching data!");
    return [];
  }
};
