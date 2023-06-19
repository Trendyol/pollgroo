import React, { createContext, useEffect, ReactNode, useContext, useState } from 'react';
import { io, Socket } from 'socket.io-client';

interface SocketContextProps {
  children: ReactNode;
  data: { user: any, groomingId: any};
}

const SocketContext = createContext<Socket | null>(null);

export const SocketProvider: React.FC<SocketContextProps> = ({ children, data }:any) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const newSocket: Socket = io(`${process.env.NEXT_PUBLIC_SOCKET_SERVER_URL}`, {
      query: { user: JSON.stringify(data.user), groomingId: data.groomingId },
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export const useSocket = (): Socket | null => useContext(SocketContext);