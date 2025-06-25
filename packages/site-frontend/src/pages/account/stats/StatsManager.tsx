import { useAppDispatch } from "#app/hooks/store/useAppDispatch";
import { Account } from "#app/services/account";
import { useEffect } from "react";

/**
 * DoubleManager component will subscribe to the double game events
 * and dispatch the appropriate actions to the store
 * @returns 
 */
export const StatsManager = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    
    dispatch(Account.setUserStatsDateRange('thisMonth'));
    dispatch(Account.setUserStatsType('wagered'));
    dispatch(Account.setUserStatsCategory(undefined));
    dispatch(Account.setUserStatsMinDate(new Date(new Date().getFullYear(), new Date().getMonth(), 1)));
    dispatch(Account.setUserStatsMaxDate(new Date()));
  }, [dispatch]);

  return null;
};
