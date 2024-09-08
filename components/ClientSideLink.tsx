import { useState, useEffect } from 'react';

const ClientSideLink = ({ href, className, style, children }) => {
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