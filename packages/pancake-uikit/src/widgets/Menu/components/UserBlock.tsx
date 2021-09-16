import React from "react";
import Button from "../../../components/Button/Button";
import { useWalletModal } from "../../WalletModal";
import { Login } from "../../WalletModal/types";
import { BorderGradientButton } from "../../../components/GradientButton";

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
        <Button
          scale="sm"
          variant="full_gradient"
          onClick={() => {
            onPresentConnectModal();
          }}
        >
          Connect Wallet
        </Button>
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
