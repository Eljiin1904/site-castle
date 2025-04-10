import { useTranslation } from "@core/services/internationalization/internationalization";
import { TenorImage } from "@core/types/tenor/TenorImage";
import { useEffect, useState } from "react";
import config from "#app/config";

/**
 * Custom hook to fetch trending gifs from Tenor API.
 * @returns {TenorImage[]} Array of trending gifs. limited to 10.
 */
export const useFetchTenorTrendingGifs = () => {

  const apiKey = config.tenorAPIKey;
  const [trendingGifs, setTrendingGifs] = useState<TenorImage[]>([]);
  const {i18n} = useTranslation();
  const lang = i18n.language.split("-")[0];

  useEffect(() => {
    const fetchTrendingGifs = async () => {
      try {
        const tenorUrl = `https://tenor.googleapis.com/v2/featured?key=${apiKey}&locale=${lang}&client_key=castle_dev&limit=50`;
        const response = await fetch(tenorUrl);
        const data = await response.json();
        if (response.ok && data) {
          const gifs = data.results.map((img: any) => {
            return {
              preview_image: img.media_formats.tinygif.url,
              image: img.media_formats.gif.url,
              alt: img.title,
              id: img.id,
            };
          });
          setTrendingGifs(gifs);
        }
      } catch (error) {
        console.error("Error fetching trending gifs:", error);
      }
    };

    fetchTrendingGifs();
  }, []);

  return {trendingGifs};
};