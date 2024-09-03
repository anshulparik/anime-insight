"use client";

import Image from "next/image";
import { fetchAnime } from "@/app/action";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

export type AnimeCardType = JSX.Element;

let page = 2;
function LoadMore() {
  const { ref, inView } = useInView();
  const [data, setData] = useState<AnimeCardType[]>([]);

  useEffect(() => {
    if (inView) {
      fetchAnime(page)
        .then((res) => {
          setData((prev) => [...prev, ...res]);
          page = page + 1;
        })
        .catch((error) => {
          console.log(error, "Error while fetching data!");
        });
    }
  }, [inView, data]);

  return (
    <>
      <section className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
        {data}
      </section>
      <section className="flex justify-center items-center w-full">
        <div ref={ref}>
          <Image
            src="./spinner.svg"
            alt="spinner"
            width={56}
            height={56}
            className="object-contain"
          />
        </div>
      </section>
    </>
  );
}

export default LoadMore;
