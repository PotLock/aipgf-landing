import React, { useState, useEffect, ReactNode } from 'react';

interface ClientOnlyComponentProps {
  children: ReactNode;
}

const ClientOnlyComponent: React.FC<ClientOnlyComponentProps> = ({ children }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return <>{children}</>;
};

export default ClientOnlyComponent;