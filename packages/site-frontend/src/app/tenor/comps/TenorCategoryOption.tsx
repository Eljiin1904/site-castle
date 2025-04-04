import { Div } from "@client/comps/div/Div";
import { TenorCategory } from "@core/types/tenor/TenorCategory";
import { useDispatch } from "react-redux";
import { setSearch } from "#app/services/chat/Chat";
import { Img } from "@client/comps/img/Img";
import { Span } from "@client/comps/span/Span";
import './TenorCategoryOption.scss';
import { memo } from "react";

export const TenorCategoryOption = memo(({category, width = 149}: {category: TenorCategory, width?: number}) => {

  
  const dispatch = useDispatch();

  const handleCategoryClick = () => {
    dispatch(setSearch(category.searchterm));
  };
  
  return (<Div
    className="TenorCategoryOption"
    position="relative"
    onClick={handleCategoryClick}
    flexCenter
    cursor="pointer"
    height={56}
    overflow="hidden"
    >
      <Img width={`${width}px`} path={category.image} type="external" alt={category?.name} />          
      <Div className="overlay" fx fy flexCenter>
      <Span position="absolute"  color="light-sand" textTransform="uppercase" family="title">
        {category?.name}
      </Span>
    </Div>
  </Div>);
});