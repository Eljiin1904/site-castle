import { Div } from "@client/comps/div/Div";
import { useFetchTenorResults } from "../hooks/useFetchTenorResults";
import { TenorImageOption } from "./TenorImage";
import { useFetchTenorTrendingGifs } from "../hooks/useFetchTenorTrendingGifs";
import { useAppSelector } from "#app/hooks/store/useAppSelector";

/**
 * Display a list of images fetched from tenor following a search term
 * @param () => void onClick function to call when the image is clicked, it should close the emoji menu
 * @returns 
 */
export const TenorResults = ({ onClick}: {
  onClick: () => void;
}) => {
  
  const search = useAppSelector((x) => x.chat.search);
  const {images} = useFetchTenorResults();
  const {trendingGifs} = useFetchTenorTrendingGifs();

  if(!images && !trendingGifs) return null;
  
  const results = search?.length  === 0 ? trendingGifs : images;

  return ( <Div fx wrap gap={8}>
    {results.map(image => <TenorImageOption key={image.id} image={image} onClick={onClick} />)}
   </Div>);
};