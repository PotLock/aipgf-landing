import React, { useState, useEffect } from 'react';

const ClientOnlyComponent: React.FC = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

//   return <div>Client-side rendered component</div>;
};

export default ClientOnlyComponent;