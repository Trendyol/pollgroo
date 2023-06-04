import React, { createContext, useEffect, useState, ReactNode, useContext } from "react";
import { io, Socket } from "socket.io-client";

interface SocketContextProps {
  children: ReactNode;
}

const defaultSocket = io("http://localhost:5000", { autoConnect: false });

export const SocketContext = createContext<Socket>(defaultSocket);

export const SocketProvider: React.FC<SocketContextProps> = ({ children }) => {
  const [socket, setSocket] = useState<Socket>(defaultSocket);

  useEffect(() => {

    return () => {
        socket.disconnect();
      };
  }, [socket]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);