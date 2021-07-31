import { FC } from "react";
import { Socket } from "socket.io-client";

interface ChatProps {
    socket: Socket
}

const Chat: FC<ChatProps> = ({ socket }) => {
    return (
        <div>
            Chat
        </div>
    )
};
export default Chat;