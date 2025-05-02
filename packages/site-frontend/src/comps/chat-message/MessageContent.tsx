import { ChatMessageDocument } from "@core/types/chat/ChatMessageDocument";
import { SvgChest } from "@client/svgs/common/SvgChest";
import { SvgBattle } from "@client/svgs/common/SvgBattle";
import { CaseWinContent } from "./content/CaseWinContent";
import { CaseBattleLinkContent } from "./content/CaseBattleLinkContent";
import { TextContent } from "./content/TextContent";
import { RainTipContent } from "./content/RainTipContent";
import { RainPayoutContent } from "./content/RainPayoutContent";
import { DoubleWinContent } from "./content/DoubleWinContent";
import { DoubleStreakContent } from "./content/DoubleStreakContent";
import { DiceWinContent } from "./content/DiceWinContent";
import { LimboWinContent } from "./content/LimboWinContent";
import { AdventContent } from "./content/AdventContent";
import { CrashWinContent } from "./content/CrashWinContent";

export const MessageContent = ({
  message,
}: {
  message: ChatMessageDocument;
}) => {
  if (message.kind === "text") {
    return <TextContent text={message.text} />;
  } else if (message.kind === "advent-bonus") {
    return <AdventContent item={message.item} />;
  } else if (message.kind === "case-battle-link") {
    return <CaseBattleLinkContent battle={message.battle} />;
  } else if (message.kind === "case-game-win") {
    return (
      <CaseWinContent
        chest={message.chest}
        item={message.item}
        btn={{
          label: "View Case",
          icon: SvgChest,
          to: `/cases/${message.chest.slug}`,
        }}
      />
    );
  } else if (message.kind === "double-streak") {
    return (
      <DoubleStreakContent
        streakKind={message.streakKind}
        streakCount={message.streakCount}
      />
    );
  } else if (message.kind === "double-win") {
    return (
      <DoubleWinContent
        betKind={message.betKind}
        wonAmount={message.wonAmount}
      />
    );
  } else if (message.kind === "dice-win") {
    return (
      <DiceWinContent
        multiplier={message.multiplier}
        wonAmount={message.wonAmount}
      />
    );
  } else if (message.kind === "crash-win") {
    return (
      <CrashWinContent
        multiplier={message.multiplier}
        wonAmount={message.wonAmount}
      />
    );
  } else if (message.kind === "limbo-win") {
    return (
      <LimboWinContent
        multiplier={message.multiplier}
        wonAmount={message.wonAmount}
      />
    );
  } else if (message.kind === "gem-case-win") {
    return (
      <CaseWinContent
        chest={message.chest}
        item={message.item}
        btn={{
          label: "View Gem Case",
          icon: SvgChest,
          to: `/rewards/gem-cases/${message.chest.slug}`,
        }}
      />
    );
  } else if (message.kind === "holiday-case-win") {
    return (
      <CaseWinContent
        chest={message.chest}
        item={message.item}
        btn={{
          label: "View Holiday Case",
          icon: SvgChest,
          to: `/holiday/cases/${message.chest.slug}`,
        }}
      />
    );
  } else if (message.kind === "level-case-win") {
    return (
      <CaseWinContent
        chest={message.chest}
        item={message.item}
        btn={{
          label: "View Level Case",
          icon: SvgChest,
          to: `/rewards/level-cases/${message.chest.slug}`,
        }}
      />
    );
  } else if (message.kind === "case-battle-win") {
    return (
      <CaseWinContent
        chest={message.chest}
        item={message.item}
        btn={{
          label: "View Battle",
          icon: SvgBattle,
          to: `/case-battles/${message.battle.id}`,
        }}
      />
    );
  } else if (message.kind === "rain-tip") {
    return <RainTipContent amount={message.tipAmount} />;
  } else if (message.kind === "rain-payout") {
    return (
      <RainPayoutContent
        rainId={message.rainId}
        topPlayers={message.topPlayers}
        playerCount={message.playerCount}
        totalAmount={message.totalAmount}
      />
    );
  } else {
    return null;
  }
};
