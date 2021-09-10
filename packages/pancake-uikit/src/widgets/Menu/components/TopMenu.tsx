import React, { FC } from "react";
import { MenuEntry as MenuEntryType } from "../types";
import styled from "styled-components";
import MenuLink from "./MenuLink";
import { LinkLabel, LinkStatus, MenuEntry } from "./MenuEntry";
import { useLocation } from "react-router-dom";
import DropdownMenu from "./DropdownMenu";
import { Flex } from "../../../components/Box";

const TopMenuWrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

interface Props {
  links: Array<MenuEntryType>;
}

const TopMenu: FC<Props> = ({ links }) => {
  const location = useLocation();

  return (
    <TopMenuWrapper>
      {links.map((entry) => {
        if (entry.items) {
          return (
            <DropdownMenu
              key={entry.label}
              entry={entry}
              isActive={entry.items.some(
                (item) => item.href === location.pathname
              )}
            >
              <Flex flexDirection="column" flexShrink={0}>
                {entry.items.map((item) => {
                  const isActive = item.href === location.pathname;
                  return (
                    <MenuEntry
                      key={item.label}
                      isActive={isActive}
                      role="button"
                    >
                      <MenuLink href={item.href}>
                        <LinkLabel isPushed={true}>{item.label}</LinkLabel>
                      </MenuLink>
                    </MenuEntry>
                  );
                })}
              </Flex>
            </DropdownMenu>
          );
        }

        return (
          <MenuEntry
            key={entry.label}
            isActive={entry.href === location.pathname}
            role="button"
          >
            <MenuLink href={entry.href}>
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
