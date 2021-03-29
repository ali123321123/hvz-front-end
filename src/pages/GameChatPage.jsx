import Header from "../components/header/Header";
import GameChat from "../components/chat/gamechat/GameChat";
import Main from "../components/main/Main";

function GameChatPage() {
  return (
    <>
    <Header />
    <Main>
      <GameChat />
    </Main>
    </>
  );
}

export default GameChatPage;
