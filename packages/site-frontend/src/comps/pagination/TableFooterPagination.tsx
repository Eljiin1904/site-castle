import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { Div } from "@client/comps/div/Div";
import { Pagination } from "@client/comps/pagination/Pagination";
import { Span } from "@client/comps/span/Span";
import { useTranslation } from "@core/services/internationalization/internationalization";

export const TableFooterPagination = ({
  page,
  total,
  label,
  limit,
  inPage,
  hasNext,
  setPage,
}: {
  page: number;
  total: number;
  label: string;
  limit: number;
  inPage: number;
  hasNext: boolean;
  setPage: (x: number) => void;
}) => {
  
  const {t} = useTranslation(["account"]);
  const layout = useAppSelector((x) => x.style.mainLayout);
  const small = layout === "mobile" || layout === "tablet";

  if(total === 0) 
    return null;
  return (
    <Div fx center>
      {!small && <Span position="absolute" left={0}>
         {(page - 1)*limit + inPage}/{total} {label}
      </Span>}
      <Pagination
        page={page}
        lastPage={Math.ceil(total / limit)}
        hasNext={hasNext}
        setPage={setPage}
      />
    </Div>
  );
};
