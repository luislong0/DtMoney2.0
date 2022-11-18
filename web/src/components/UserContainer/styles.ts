import styled from "styled-components";

export const UserBox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;

  img {
    max-width: 45px;
    border-radius: 9999px;
    padding: 3px;

    border: 2px solid ${(props) => props.theme["green-700"]};
  }

  span {
    font-size: 1rem;
    text-transform: uppercase;
  }
`;
