import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { Div } from "@client/comps/div/Div";
import { UnorderedList } from "@client/comps/list/UnorderedList";
import { Modal } from "@client/comps/modal/Modal";
import { ModalBody } from "@client/comps/modal/ModalBody";
import { ModalHeader } from "@client/comps/modal/ModalHeader";
import { Dialogs } from "@client/services/dialogs";

export const BlackjackInfoModal = () => {
  const xpRate = useAppSelector((x) => x.site.settings.blackjackXpRate);
  const xpLuckyLadies = useAppSelector((x) => x.site.settings.blackjackLuckyLadiesXpRate);
  const xpBlackjack15x = useAppSelector((x) => x.site.settings.blackjackBlackjack15xXpRate);
  const xpPerfectPairs = useAppSelector((x) => x.site.settings.blackjackPerfectPairsXpRate);
  const xp213 = useAppSelector((x) => x.site.settings.blackjack213XpRate);
  const xpInsurance = useAppSelector((x) => x.site.settings.blackjackInsuranceXpRate);

  return (
    <Modal
      width="xl"
      disableMobileFullscreen
      onBackdropClick={() => Dialogs.close("primary")}
    >
      <ModalHeader
        heading="Blackjack Rules"
        onCloseClick={() => Dialogs.close("primary")}
      />
      <ModalBody alignItems="flex-start">
        <Div>
          Blackjack is a card game where you and the dealer both try to get as close to 21 points
          per hand as you can without going over (a bust). You will be dealt two cards and you can
          receive another card (hit) as many times as you want before you end your turn (stand). The
          dealer will then reveal their hidden card and must hit until they have 17 or more points.
        </Div>
        <Div>
          An Ace is worth 1 or 11 points. Kings, Queens, and Jacks are worth 10 points. Other cards
          (2-10) are worth the number of the card. The dealer stands on a soft 17 (a 17 that
          includes an ace)
        </Div>
        <UnorderedList
          fx
          itemSize={14}
          items={[
            `Blackjack has a 0.5% house edge`,
            `XP rate: ${friendlyXP(xpRate)}`,
            `There are infinite decks`,
            `If the dealer’s card is an ace, you will be offered insurance. By accepting, you will make an insurance play worth half your original play. If the dealer has natural 21, your insurance play pays 2:1. If the dealer does not, you will lose your insurance play`,
            `If the dealer has natural 21 (21 points with the first two dealt cards), the game concludes immediately and insurance is paid if taken`,
            `If you have natural 21, the game concludes immediately and your play pays 3:2`,
            `If both you and the dealer have a natural 21, the game concludes immediately and the result is a tie (push)`,
            `Neither insurance nor Even Money are offered when you have a natural 21 and the dealer’s up-card is an ace`,
            `You will have the option to split when you are initially dealt a pair of the same number or face card. Splitting will create a separate hand with a play equal to your original play`,
            `You can only split once`,
            `You cannot hit on split aces. Instead you will draw exactly one card on each hand`,
            `Natural 21 is not possible on a split hand`,
            `You will have the option to double on any first two cards. Doubling will double your play amount in exchange for committing to stand after receiving exactly one more card`,
            `You can double on a split`,
          ]}
        />
        <Div
          width="full"
          justifyContent="center"
        >
          Side Play Payouts
        </Div>
        <Div column>
          <Div>21+3</Div>
          <Div
            color="dark-gray"
            fontSize={14}
          >
            XP rate: {friendlyXP(xp213)}
          </Div>
          <UnorderedList
            fx
            pb={20}
            itemSize={14}
            items={[
              `Suited Three of a Kind: 100x`,
              `Straight Flush (Ace High+Low): 50x`,
              `Three of a Kind: 40x`,
              `Straight (Ace High+Low): 10x`,
              `Flush: 5x`,
            ]}
          />
          <Div>Perfect Pair</Div>
          <Div
            color="dark-gray"
            fontSize={14}
          >
            XP rate: {friendlyXP(xpPerfectPairs)}
          </Div>
          <UnorderedList
            fx
            pb={20}
            itemSize={14}
            items={[`Perfect pair: 25x`, `Colored pair: 12x`, `Mixed pair: 6x`]}
          />
          <Div>Lucky Ladies</Div>
          <Div
            color="dark-gray"
            fontSize={14}
          >
            XP rate: {friendlyXP(xpLuckyLadies)}
          </Div>
          <UnorderedList
            fx
            pb={20}
            itemSize={14}
            items={[
              `Queen of Hearts pair: 1000x (if the dealer also has blackjack)`,
              `Queen of Hearts pair: 200x`,
              `Matched 20: 25x`,
              `Suited 20: 10x`,
              `Unsuited 20: 4x`,
            ]}
          />
          <Div>Blackjack 15x</Div>
          <Div
            color="dark-gray"
            fontSize={14}
          >
            XP rate: {friendlyXP(xpBlackjack15x)}
          </Div>
          <UnorderedList
            fx
            pb={20}
            itemSize={14}
            items={[`Player Blackjack: 15x`]}
          />
          <Div>Insurance</Div>
          <Div
            color="dark-gray"
            fontSize={14}
          >
            XP rate: {friendlyXP(xpInsurance)}
          </Div>
          <UnorderedList
            fx
            pb={20}
            itemSize={14}
            items={[`Dealer Blackjack: 2x`]}
          />
        </Div>
      </ModalBody>
    </Modal>
  );
};

function friendlyXP(value: number) {
  return ((value * 1000) / 1000).toFixed(3);
}
