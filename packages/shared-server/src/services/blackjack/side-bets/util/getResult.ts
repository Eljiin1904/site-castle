import { BlackjackBetType } from "@core/types/blackjack/BlackjackBetAmounts";

type Arg = {
  type: BlackjackBetType | "insurance";
  title: string;
  multiplier: number;
  amount: number;
};

export default function getResult({ type, title, multiplier, amount }: Arg) {
  return {
    type,
    title,
    multiplier,
    amount: amount * multiplier, // + amount,
  };
}
