import {
  ButtonsContainer,
  HeaderContainer,
  HeaderContent,
  InfoContainer,
  LoginGoogleButton,
  NewTransactionButton,
} from "./styles";
import logoImg from "../../assets/logo.svg";
import * as Dialog from "@radix-ui/react-dialog";
import { NewTransactionModal } from "../NewTransactionModal";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { UserContainer } from "../UserContainer";
import { GoogleLogo } from "phosphor-react";

export function Header() {
  const { signIn, user, hasLogged, googleToken, createOrSignIn } =
    useContext(AuthContext);

  async function handleSignIn() {
    await signIn();
    // await createOrSignIn(googleToken);
  }

  return (
    <HeaderContainer>
      <HeaderContent>
        <InfoContainer>
          <img src={logoImg} alt="" />
          {hasLogged ? (
            <UserContainer
              imageUrl={String(user.photoUrl)}
              username={String(user.name)}
            />
          ) : (
            <></>
          )}
        </InfoContainer>

        <ButtonsContainer>
          <LoginGoogleButton onClick={handleSignIn}>
            <GoogleLogo size={18} weight="bold" /> Login Google
          </LoginGoogleButton>

          <Dialog.Root>
            <Dialog.Trigger asChild>
              <NewTransactionButton>Nova transação</NewTransactionButton>
            </Dialog.Trigger>

            <NewTransactionModal />
          </Dialog.Root>
        </ButtonsContainer>
      </HeaderContent>
    </HeaderContainer>
  );
}
