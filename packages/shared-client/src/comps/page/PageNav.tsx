import { useLocation } from "react-router-dom";
import { useLibrarySelector } from "#client/hooks/store/useLibrarySelector";
import { Div } from "../div/Div";
import { Span } from "../span/Span";
import { Link } from "../link/Link";
import { Conditional } from "../conditional/Conditional";
import { Dropdown } from "../dropdown/Dropdown";
import "./PageNav.scss";

type NavItems = {
  label: string;
  to: string;
  end?: boolean;
}[];

export const PageNav = ({ items }: { items: NavItems }) => {
  const mainLayout = useLibrarySelector((x) => x.style.mainLayout);

  return (
    <Div
      className="PageNav"
      fx
    >
      <Conditional
        value={mainLayout}
        mobile={<MobileContent items={items} />}
        tablet={<NotMobileContent items={items} />}
        laptop={<NotMobileContent items={items} />}
        desktop={<NotMobileContent items={items} />}
      />
    </Div>
  );
};

const MobileContent = ({ items }: { items: NavItems }) => {
  const location = useLocation();
  const activeItem = items.find((item) => {
    if (item.end) {
      return location.pathname === item.to;
    } else {
      return location.pathname.startsWith(item.to);
    }
  });

  return (
    <Dropdown
      type="menu"
      options={items.map((x) => ({ ...x, type: "nav" }))}
      button={activeItem?.label || "Unknown"}
      fx
    />
  );
};

const NotMobileContent = ({ items }: { items: NavItems }) => {
  return (
    <Div
      fx
      gap={24}
      borderBottom
    >
      {items.map((x, i) => (
        <NavItem
          key={i}
          {...x}
        />
      ))}
    </Div>
  );
};

const NavItem = ({
  label,
  to,
  end,
}: {
  label: string;
  to: string;
  end?: boolean;
}) => {
  return (
    <Link
      className="nav-item"
      type="nav"
      end={end}
      to={to}
      px={12}
      pb={12}
      top={1}
      hover="none"
    >
      <Span
        className="label"
        weight="semi-bold"
      >
        {label}
      </Span>
    </Link>
  );
};
