import { Navigate, useParams } from "react-router-dom";
import { useMount } from "@client/hooks/system/useMount";
import { useReferralCode } from "#app/hooks/users/useReferralCode";

export function UserReferralPage() {
  const { referer } = useParams<{ referer?: string }>();
  const [, setReferralCode] = useReferralCode();

  useMount(() => {
    if (referer) {
      setReferralCode(referer);
    }
  });

  return (
    <Navigate
      replace
      to="/"
    />
  );
}
