import React from 'react';

const AccessGuard = ({ hasAccess, children, fallback }) => {
  if (hasAccess) {
    return <>{children}</>;
  }
  return <>{fallback}</>;
};

export default AccessGuard;
