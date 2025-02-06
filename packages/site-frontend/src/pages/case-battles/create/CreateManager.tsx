import { useUnmount } from "usehooks-ts";
import { useAppDispatch } from "#app/hooks/store/useAppDispatch";
import { CaseBattles } from "#app/services/case-battles";
import config from "#app/config";

export const CreateManager = () => {
  const dispatch = useAppDispatch();

  useUnmount(() => {
    if (config.env !== "development" && config.env !== "devcloud") {
      dispatch(CaseBattles.resetCreator());
    }
  });

  return null;
};
