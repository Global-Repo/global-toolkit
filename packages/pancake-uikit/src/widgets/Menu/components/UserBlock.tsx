import React from "react";
import { useWalletModal } from "../../WalletModal";
import { Login } from "../../WalletModal";
import { BorderGradientButton } from "../../../components/GradientButton";
import styled from "styled-components";
import { Button } from "../../../components/Button";

const ConnectWalletWrapper = styled.div`
  position: relative;
`;

const ButtonAurea = styled.div`
  padding: 5px;
  border-radius: 8px;
  background: linear-gradient(315deg, #ff0, #008d8d);
  filter: blur(8px);
`;

interface Props {
  account?: string;
  login: Login;
  logout: () => void;
}

const UserBlock: React.FC<Props> = ({ account, login, logout }) => {
  const { onPresentConnectModal, onPresentAccountModal } = useWalletModal(
    login,
    logout,
    account
  );
  const accountEllipsis = account
    ? `${account.substring(0, 4)}...${account.substring(account.length - 4)}`
    : "";

  return (
    <div>
      {account ? (
        <BorderGradientButton
          label={accountEllipsis}
          onClick={() => {
            onPresentAccountModal();
          }}
          fontSize="16px"
          style={{ width: "160px" }}
        />
      ) : (
        <ConnectWalletWrapper>
          <Button
            scale="sm"
            variant="full_gradient"
            onClick={() => {
              onPresentConnectModal();
            }}
            hasShadow
          >
            Connect Wallet
          </Button>
        </ConnectWalletWrapper>
      )}
    </div>
  );
};

export default React.memo(
  UserBlock,
  (prevProps, nextProps) =>
    prevProps.account === nextProps.account &&
    prevProps.login === nextProps.login &&
    prevProps.logout === nextProps.logout
);
