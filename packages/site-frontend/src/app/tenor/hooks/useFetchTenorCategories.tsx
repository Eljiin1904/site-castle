import { useTranslation } from "@core/services/internationalization/internationalization";
import { TenorCategory } from "@core/types/tenor/TenorCategory";
import { useEffect, useState } from "react";
import config from "#app/config";

export const useFetchTenorCategories = () => {

  const apiKey = config.tenorAPIKey;
  const [categories, setCategories] = useState<TenorCategory[]>([]);
  const [categoryType, setCategoryType] = useState<"featured"|"trending">('featured');
  const {i18n} = useTranslation();
  const lang = i18n.language.split("-")[0];


  useEffect(() => {

    console.log("categoryType", categoryType);
    const fetchCategories = async () => {
      try {
        const tenorUrl = `https://tenor.googleapis.com/v2/categories?key=${apiKey}&client_key=castle_dev&type=${categoryType}&locale=${lang}&limit=10`;
        const response = await fetch(tenorUrl);
        const data = await response.json();
        if (response.ok && data) {
          
          console.log("categories", data);
          const firstCat = categoryType === 'featured' ? {searchterm: 'trending', image: '', name:'#trending' }:
          {searchterm: 'featured', image: '', name:'#featured' };
          setCategories([firstCat, ...data.tags]);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  },[categoryType]);


  return categories;
};