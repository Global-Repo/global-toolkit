import React from "react";
import styled from "styled-components";
import { LogoIcon } from "../../../components/Svg";
import Text from "../../../components/Text/Text";
import Skeleton from "../../../components/Skeleton/Skeleton";
import { Flex } from "../../../components/Box";

interface Props {
  globalPriceUsd?: number;
  isMobile: boolean;
}

const PriceLinkMobile = styled.a`
  display: flex;
  align-items: center;
  svg {
    transition: transform 0.3s;
  }
  :hover {
    svg {
      transform: scale(1.2);
    }
  }
`;

const PriceLinkDesktop = styled.a`
  display: flex;
  align-items: center;
  svg {
    transition: transform 0.3s;
  }
  :hover {
    svg {
      transform: scale(1.1);
    }
  }
`;

const GlobalPrice: React.FC<Props> = ({ globalPriceUsd, isMobile }) => {
  if (isMobile) {
    if (!globalPriceUsd) {
      return <Skeleton width={80} height={24} />;
    }

    return (
      <PriceLinkMobile
        href="https://swap.beglobal.finance/#/swap?outputCurrency=0xFB6F4631091F768ECC1D66a1c333d973BD05375e"
        target="_blank"
      >
        <LogoIcon width="24px" mr="8px" />
        <Text color="textSubtle" bold>{`$${globalPriceUsd.toFixed(3)}`}</Text>
      </PriceLinkMobile>
    );
  }

  if (!globalPriceUsd) {
    return <Skeleton width={80} height={24} />;
  }

  return (
    <PriceLinkDesktop
      href="https://swap.beglobal.finance/#/swap?outputCurrency=0xFB6F4631091F768ECC1D66a1c333d973BD05375e"
      target="_blank"
    >
      <LogoIcon width="48px" mr="16px" />
      <Flex flexDirection="column" justifyContent="center" alignItems="center">
        <Text color="white" bold>
          BeGlobal.finance
        </Text>
        <Text color="white" bold fontSize="24px">{`$${globalPriceUsd.toFixed(
          3
        )}`}</Text>
      </Flex>
    </PriceLinkDesktop>
  );
};

export default React.memo(GlobalPrice);
