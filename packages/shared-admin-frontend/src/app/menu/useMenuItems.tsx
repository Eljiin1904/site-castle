import { SvgCertificate } from "@client/svgs/common/SvgCertificate";
import { SvgChart } from "@client/svgs/common/SvgChart";
import { SvgCog } from "@client/svgs/common/SvgCog";
import { SvgLive } from "@client/svgs/common/SvgLive";
import { SvgCard } from "@client/svgs/common/SvgCard";
import { SvgCrypto } from "@client/svgs/common/SvgCrypto";
import { SvgUsers } from "@client/svgs/common/SvgUsers";
import { SvgChest } from "@client/svgs/common/SvgChest";
import { SvgTransaction } from "@client/svgs/common/SvgTransaction";
import { SvgFast } from "@client/svgs/common/SvgFast";
import { SvgGem } from "@client/svgs/common/SvgGem";
import { SvgTeam } from "@client/svgs/common/SvgTeam";
import { SvgCoinStack } from "@client/svgs/common/SvgCoinStack";
import { SvgStar } from "@client/svgs/common/SvgStar";
import { SvgTicket } from "@client/svgs/common/SvgTicket";
import { SvgRifle } from "@client/svgs/common/SvgRifle";
import SvgRace from "@client/svgs/common/SvgRace";

const items = [
  { icon: SvgChart, label: "Dashboard", to: "/dashboard" },
  { icon: SvgCog, label: "Settings", to: "/settings" },
  { icon: SvgStar, label: "Holiday", to: "/holidays" },
  { icon: SvgUsers, label: "Users", to: "/users" },
  { icon: SvgTeam, label: "Affiliates", to: "/affiliates" },
  { icon: SvgCoinStack, label: "Reloads", to: "/reloads" },
  { icon: SvgTransaction, label: "Transactions", to: "/transactions" },
  { icon: SvgCrypto, label: "Crypto", to: "/crypto" },
  { icon: SvgRifle, label: "Skins", to: "/skins" },
  { icon: SvgChest, label: "Chests", to: "/chests" },
  { icon: SvgCard, label: "Gift Cards", to: "/gift-cards" },
  { icon: SvgCertificate, label: "Promotions", to: "/promotions" },
  { icon: SvgFast, label: "Boosts", to: "/boosts" },
  { icon: SvgGem, label: "Gem Store", to: "/gems" },
  { icon: SvgRace, label: "Races", to: "/races" },
  { icon: SvgTicket, label: "Raffles", to: "/raffles" },
  { icon: SvgLive, label: "Logs", to: "/logs" },
];

export function useMenuItems() {
  return items;
}
