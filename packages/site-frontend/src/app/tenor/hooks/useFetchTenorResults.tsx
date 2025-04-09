import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { useTranslation } from "@core/services/internationalization/internationalization";
import { useEffect, useState } from "react";
import config from "#app/config";

export const useFetchTenorResults = () => {

  const apiKey = config.tenorAPIKey;
  const search = useAppSelector((x) => x.chat.search) ?? '';
  const [images, setImages] = useState<any[]>([]);
  const {i18n} = useTranslation();
  const lang = i18n.language.split("-")[0];

  useEffect(() => {

    const fetchImages = async () => {
      try {
        const tenorUrl = `https://tenor.googleapis.com/v2/search?q=${search}&key=${apiKey}&locale=${lang}&client_key=castle_dev&limit=50`;
        const response = await fetch(tenorUrl);
        const data = await response.json();

        if (response.ok && data) {
          
          let images = data.results.map((img:any) => {
            
            return {
              preview_image: img.media_formats.tinygif.url,
              image: img.media_formats.gif.url,
              alt: img.title,
              id: img.id,
            };
          });
          setImages(images);
        }
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    if(search.length > 0)
      fetchImages();
  }, [search, lang]);

  return {images};
};