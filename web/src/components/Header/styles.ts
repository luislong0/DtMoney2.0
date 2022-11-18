import styled from "styled-components";
import { mediaQueries } from "../../styles/mediaQueries";

export const HeaderContainer = styled.header`
  background-color: ${(props) => props.theme["gray-900"]};
  padding: 2.5rem 0 7.5rem;
`;

export const HeaderContent = styled.div`
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 1.5rem;

  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;

  ${mediaQueries("md")`
      flex-direction: column;
      gap: 1rem;
  `}
`;

export const InfoContainer = styled.div`
  display: flex;
  gap: 2rem;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const LoginGoogleButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  height: 50px;
  background-color: ${(props) => props.theme["red-500"]};
  color: ${(props) => props.theme.white};
  border: none;
  font-weight: bold;
  padding: 0 1.25rem;
  border-radius: 6px;
  cursor: pointer;

  transition: background-color 0.2s;

  &:hover {
    background-color: ${(props) => props.theme["red-700"]};
  }
`;

export const NewTransactionButton = styled.button`
  height: 50px;
  border: 0;
  background-color: ${(props) => props.theme["green-500"]};
  color: ${(props) => props.theme.white};
  font-weight: bold;
  padding: 0 1.25rem;
  border-radius: 6px;
  cursor: pointer;

  transition: background-color 0.2s;

  &:hover {
    background-color: ${(props) => props.theme["green-700"]};
  }
`;
