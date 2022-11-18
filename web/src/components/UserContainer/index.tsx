import { UserBox } from "./styles";

interface UserContainerProps {
  imageUrl: string;
  username: string;
}

export function UserContainer(props: UserContainerProps) {
  return (
    <UserBox>
      <img src={props.imageUrl} alt="" referrerPolicy="no-referrer" />
      <span>{props.username}</span>
    </UserBox>
  );
}
