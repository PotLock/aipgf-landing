import React, { useState, useEffect, ReactNode, CSSProperties } from 'react';
import Link from 'next/link';

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
    <Link href={href} className={className} style={style}>
      {children}
    </Link>
  );
};

export default ClientSideLink;