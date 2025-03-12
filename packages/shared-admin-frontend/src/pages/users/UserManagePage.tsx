import { Fragment } from "react";
import {
  Navigate,
  Route,
  Routes,
  useNavigate,
  useParams,
} from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { PageNav } from "@client/comps/page/PageNav";
import { PageNotice } from "@client/comps/page/PageNotice";
import { PageLoading } from "@client/comps/page/PageLoading";
import { Errors } from "@client/services/errors";
import { Users } from "#app/services/users";
import { SitePage } from "#app/comps/site-page/SitePage";
import { UserHeader } from "./manage/UserHeader";
import { AccountBody } from "./manage/account/AccountBody";
import { TransactionsBody } from "./manage/transactions/TransactionsBody";
import { ReferralsBody } from "./manage/referrals/ReferralsBody";
import { ActionsBody } from "./manage/actions/ActionsBody";
import { KeysBody } from "./manage/keys/KeysBody";

export const UserManagePage = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();

  const query = useQuery({
    queryKey: ["user", userId],
    queryFn: () => Users.getUser({ userId: userId! }),
  });

  const user = query.data?.user;

  let bodyContent;

  if (query.error) {
    bodyContent = (
      <PageNotice
        image="/graphics/notice-Chicken-error"
        title="Error"
        message="Something went wrong, please return to the user index."
        buttonLabel="Back to Users"
        description={Errors.getMessage(query.error)}
        onButtonClick={() => navigate("/users")}
      />
    );
  } else if (user === undefined) {
    bodyContent = <PageLoading />;
  } else {
    bodyContent = (
      <Fragment>
        <UserHeader
          user={user}
          isLoading={query.isFetching}
          onRefreshClick={query.refetch}
        />
        <PageNav
          items={[
            { label: "Account", to: `/users/${user._id}`, end: true },
            { label: "Transactions", to: `/users/${user._id}/transactions` },
            { label: "Referrals", to: `/users/${user._id}/referrals` },
            { label: "API Keys", to: `/users/${user._id}/api-keys` },
            { label: "Action Log", to: `/users/${user._id}/actions` },
          ]}
        />
        <Routes>
          <Route
            index
            element={<AccountBody user={user} />}
          />
          <Route
            path="/transactions"
            element={<TransactionsBody user={user} />}
          />
          <Route
            path="/referrals"
            element={<ReferralsBody user={user} />}
          />
          <Route
            path="/api-keys"
            element={<KeysBody user={user} />}
          />
          <Route
            path="/actions"
            element={<ActionsBody user={user} />}
          />
          <Route
            path="*"
            element={
              <Navigate
                replace
                to={`/users/${user._id}`}
              />
            }
          />
        </Routes>
      </Fragment>
    );
  }

  return (
    <SitePage
      className="UserManagePage"
      title="Manage User"
    >
      {bodyContent}
    </SitePage>
  );
};
