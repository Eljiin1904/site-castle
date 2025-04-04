import { Div } from "@client/comps/div/Div";
import { TenorCategoryOption } from "./TenorCategoryOption";
import { useFetchTenorCategories } from "../hooks/useFetchTenorCategories";

export const TenorCategories = () => {

  const categories = useFetchTenorCategories();
 
  if(categories.length === 0)
    return null;
  return (<Div
    fx
    gap={8}
    wrap
  >
    {categories.map(cat => <TenorCategoryOption key={cat.searchterm} category={cat} width={149} />)}
  </Div>);
};