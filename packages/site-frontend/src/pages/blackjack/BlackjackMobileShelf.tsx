import config from "#app/config";
import classNames from "classnames";
import "./BlackjackMobileShelf.scss";

const arrowUpSrc = `${config.staticURL}/games/blackjack/icons/arrow-up.svg`;

export const BlackjackMobileShelf = ({
  toggleShelf,
}: {
  toggleShelf: () => void;
}) => {
  const className = classNames("BlackjackMobileShelf");

  return (
    <div className={className}>
      <div className="shelf-button-wrap">
        <div
          className="shelf-button"
          onClick={toggleShelf}
        >
          <img
            src={arrowUpSrc}
            alt="arrow up"
          />
          <span>Bets</span>
        </div>
      </div>
      <div className="shelf" />
    </div>
  );
};
