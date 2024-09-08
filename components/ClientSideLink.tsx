import React, { useState, useEffect, ReactNode, CSSProperties } from 'react';

interface ClientSideLinkProps {
  href: string;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}

const ClientSideLink: React.FC<ClientSideLinkProps> = ({ href, className, style, children }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <span className={className} style={style}>{children}</span>;
  }

  return (
    <a href={href} className={className} style={style}>
      {children}
    </a>
  );
};

export default ClientSideLink;