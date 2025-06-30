
import { Intimal } from "@core/services/intimal";
import { Transactions } from "@core/services/transactions";
import { Dates } from "@core/services/dates";
import { Div } from "@client/comps/div/Div";
import { Span } from "@client/comps/span/Span";
import { Table } from "@client/comps/table/Table";
import { Tokens } from "@client/comps/tokens/Tokens";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { useTranslation } from "@core/services/internationalization/internationalization";
import { RaceLeader } from "@core/types/rewards/RaceLeader";
import { UserIcon } from "#app/comps/user-icon/UserIcon";
import { Vector } from "@client/comps/vector/Vector";
import SvgRace from "@client/svgs/common/SvgRace";
import { useHiddenInfo } from "#app/hooks/users/useHiddenInfo";

export const RaceTable = ({
  leaders,
  isLoading,
}: {
  leaders: RaceLeader[];
  isLoading?: boolean;
}) => {
  const mainLayout = useAppSelector((x) => x.style.mainLayout);
  const userId = useAppSelector((x) => x.user._id);
  const {t} = useTranslation(["pages/race"]);
  return (
    <Table
      data={leaders}
      loading={isLoading}
      autoScroll={mainLayout === "mobile"}
      emptyMessage={t("history.notFound")}
      hideHeader={mainLayout === "mobile"}
      onRowClassName={(x) => ( x.user.id === userId ? "user-row" : "")}
      columns={[
        {
          heading:  t("headers.rank"),
          grow: 1,
          justify: "flex-start",
          rowRenderer: (x) => <Div
            center
            width={32}
          >
            <Vector
              className={`rank-icon-${x.rank}`}
              as={SvgRace}
              size={20}
              color={x.rank === 1 ? "sand" : x.rank === 2 ? "light-sand" : x.rank === 3 ? "bronze" : "dark-sand"}
              position="absolute"
            />
            <Span
              family="number"
              color="dark-brown"
              fontWeight="bold"
              bottom={3}
              size={14}
            >
              {x.rank}
            </Span>
          </Div>,
        },
        {
          heading:  t("headers.player"),
          grow: 2,
          justify: "flex-start",
          rowRenderer: (x) => {

            const { username, xp, hideInfo } = useHiddenInfo(x.user);
            return (<Div gap={8} alignItems="center">
              <UserIcon
                avatarIndex={x.user.avatarIndex}
                avatarId={x.user.avatarId}
                hidden={false}
                width="20px"
              />
              <Span
                weight="medium"
                color={hideInfo ? "gray" : "white"}
                textOverflow="ellipsis"
              >
                {username}
              </Span>
            </Div>)
          },
        },
        {
          heading: t("headers.wager"),
          grow: 1,
          justify: "flex-start",
          rowRenderer: (x) => <Span
            color="light-sand"
            size={12}
          >
            XP {Intimal.toLocaleString(x.xpGained, 0)} 
          </Span>
        },
        {
          heading: t("headers.prize"),
          grow: 1,
          justify: "flex-end",
          rowRenderer: (x) => <Tokens fontSize={12} value={x.prizeAmount} />,
        },
      ]}
    />
  );
};
