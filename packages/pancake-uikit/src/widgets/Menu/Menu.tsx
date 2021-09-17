import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import throttle from "lodash/throttle";
import Overlay from "../../components/Overlay/Overlay";
import Flex from "../../components/Box/Flex";
import { useMatchBreakpoints } from "../../hooks";
import Panel from "./components/Panel";
import UserBlock from "./components/UserBlock";
import { NavProps } from "./types";
import {
  MENU_HEIGHT,
  SIDEBAR_WIDTH_REDUCED,
  SIDEBAR_WIDTH_FULL,
} from "./config";
import { HamburgerCloseIcon, HamburgerIcon } from "./icons";
import MenuButton from "./components/MenuButton";
import TopMenu from "./components/TopMenu";
import GlobalPrice from "./components/GlobalPrice";

const Wrapper = styled.div`
  position: relative;
  width: 100%;
`;

const StyledNav = styled.nav<{
  showMenu: boolean;
  isMobile: boolean;
  backgroundColor: string;
}>`
  position: fixed;
  top: ${({ showMenu }) => (showMenu ? 0 : `-${MENU_HEIGHT}px`)};
  left: 0;
  transition: top 0.2s;
  display: flex;
  justify-content: ${({ isMobile }) => (isMobile ? "space-between" : "center")};
  align-items: center;
  padding-right: 16px;
  width: 100%;
  height: ${MENU_HEIGHT}px;
  background-color: ${({ backgroundColor }) => backgroundColor};
  z-index: 10;
  transform: translate3d(0, 0, 0);
`;

const DesktopNavigation = styled.div`
  display: flex;
  width: 100%;
  padding: 32px;
  padding-top: 56px;
  align-items: center;
`;

const DesktopBodyWrapper = styled.div`
  position: relative;
  display: flex;
  margin-top: ${MENU_HEIGHT}px;
`;

const BodyWrapper = styled.div`
  position: relative;
  display: flex;
`;

const Inner = styled.div<{ isPushed: boolean; showMenu: boolean }>`
  flex-grow: 1;
  margin-top: ${({ showMenu }) => (showMenu ? `${MENU_HEIGHT}px` : 0)};
  transition: margin-top 0.2s, margin-left 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  transform: translate3d(0, 0, 0);
  max-width: 100%;

  ${({ theme }) => theme.mediaQueries.nav} {
    margin-left: ${({ isPushed }) =>
      `${isPushed ? SIDEBAR_WIDTH_FULL : SIDEBAR_WIDTH_REDUCED}px`};
    max-width: ${({ isPushed }) =>
      `calc(100% - ${
        isPushed ? SIDEBAR_WIDTH_FULL : SIDEBAR_WIDTH_REDUCED
      }px)`};
  }
`;

const MobileOnlyOverlay = styled(Overlay)`
  position: fixed;
  height: 100%;

  ${({ theme }) => theme.mediaQueries.nav} {
    display: none;
  }
`;

const Menu: React.FC<NavProps> = ({
  account,
  login,
  logout,
  isDark,
  toggleTheme,
  langs,
  setLang,
  currentLang,
  globalPriceUsd,
  links,
  profile,
  children,
}) => {
  const { isXl } = useMatchBreakpoints();
  const isMobile = isXl === false;
  const [isPushed, setIsPushed] = useState(!isMobile);
  const [menuBackgroundColor, setMenuBackgroundColor] = useState("transparent");
  const refPrevOffset = useRef(window.pageYOffset);

  useEffect(() => {
    const handleScroll = () => {
      const currentOffset = window.pageYOffset;
      const isBottomOfPage =
        window.document.body.clientHeight ===
        currentOffset + window.innerHeight;
      const isTopOfPage = currentOffset === 0;
      if (isTopOfPage) {
        setMenuBackgroundColor("transparent");
      } else {
        setMenuBackgroundColor("#1a2556");
      }
      refPrevOffset.current = currentOffset;
    };
    const throttledHandleScroll = throttle(handleScroll, 200);

    window.addEventListener("scroll", throttledHandleScroll);
    return () => {
      window.removeEventListener("scroll", throttledHandleScroll);
    };
  }, []);

  const walletButton = !!login && !!logout && (
    <UserBlock account={account} login={login} logout={logout} />
  );

  const mobileNavigation = (
    <>
      <MenuButton
        aria-label="Toggle menu"
        onClick={() => setIsPushed(true)}
        mr="24px"
      >
        {isPushed ? (
          <HamburgerCloseIcon width="24px" color="textSubtle" />
        ) : (
          <HamburgerIcon width="24px" color="textSubtle" />
        )}
      </MenuButton>
      {walletButton}
    </>
  );

  const desktopNavigation = (
    <DesktopNavigation>
      <Flex padding="8px">
        <GlobalPrice globalPriceUsd={globalPriceUsd} isMobile={isMobile} />
      </Flex>
      <Flex flexGrow={1}>
        <TopMenu links={links} />
      </Flex>
      <Flex>{walletButton}</Flex>
    </DesktopNavigation>
  );

  return (
    <Wrapper>
      <StyledNav
        showMenu
        isMobile={isMobile}
        backgroundColor={menuBackgroundColor}
      >
        {isMobile ? mobileNavigation : desktopNavigation}
      </StyledNav>
      {isMobile ? (
        <BodyWrapper>
          <Panel
            isPushed={isPushed}
            isMobile={isMobile}
            showMenu
            isDark={isDark}
            toggleTheme={toggleTheme}
            langs={langs}
            setLang={setLang}
            currentLang={currentLang}
            globalPriceUsd={globalPriceUsd}
            pushNav={setIsPushed}
            links={links}
          />
          <Inner isPushed={isPushed} showMenu>
            {children}
          </Inner>
          <MobileOnlyOverlay
            show={isPushed}
            onClick={() => setIsPushed(false)}
            role="presentation"
          />
        </BodyWrapper>
      ) : (
        <DesktopBodyWrapper>{children}</DesktopBodyWrapper>
      )}
    </Wrapper>
  );
};

export default Menu;
