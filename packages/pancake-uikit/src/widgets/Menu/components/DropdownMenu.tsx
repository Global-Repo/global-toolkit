import React, { FC, ReactNode } from "react";
import { LinkLabel, LinkStatus, MenuEntry } from "./MenuEntry";
import { MenuEntry as MenuEntryType } from "../types";
import { Dropdown } from "../../../components/Dropdown";

interface Props {
  entry: MenuEntryType;
  children: ReactNode;
  isActive: boolean;
}

const DropdownMenu: FC<Props> = ({ entry, children, isActive }) => {
  const target = (
    <MenuEntry key={entry.label} isActive={isActive} role="button">
      <LinkLabel isPushed={true}>{entry.label}</LinkLabel>
      {entry.status && (
        <LinkStatus color={entry.status.color} fontSize="14px">
          {entry.status.text}
        </LinkStatus>
      )}
    </MenuEntry>
  );

  return (
    <Dropdown target={target} position="bottom">
      {children}
    </Dropdown>
  );
};

export default DropdownMenu;
