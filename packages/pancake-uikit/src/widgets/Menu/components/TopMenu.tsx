import React, { FC } from "react";
import { MenuEntry as MenuEntryType } from "../types";
import styled from "styled-components";
import MenuLink from "./MenuLink";
import { LinkLabel, LinkStatus, MenuEntry } from "./MenuEntry";
import * as IconModule from "../icons";
import { SvgProps } from "../../../components/Svg";
import { useLocation } from "react-router-dom";

const TopMenuWrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const Icons = IconModule as unknown as { [key: string]: React.FC<SvgProps> };

interface Props {
  links: Array<MenuEntryType>;
}

const TopMenu: FC<Props> = ({ links }) => {
  const location = useLocation();

  return (
    <TopMenuWrapper>
      {links.map((entry) => {
        const calloutClass = entry.calloutClass
          ? entry.calloutClass
          : undefined;

        if (entry.items) {
          // Accordion not implemented
          return null;
        }

        return (
          <MenuEntry
            key={entry.label}
            isActive={entry.href === location.pathname}
            className={calloutClass}
          >
            <MenuLink href={entry.href} onClick={() => {}}>
              <LinkLabel isPushed={true}>{entry.label}</LinkLabel>
              {entry.status && (
                <LinkStatus color={entry.status.color} fontSize="14px">
                  {entry.status.text}
                </LinkStatus>
              )}
            </MenuLink>
          </MenuEntry>
        );
      })}
    </TopMenuWrapper>
  );
};

export default TopMenu;
