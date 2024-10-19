import { createContext, useContext, useState } from 'react';
import { userDetails } from '../../user-details';

type UserDetails = typeof userDetails;

export const UserContext = createContext<UserDetails | null>(null);

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context == null) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};

export const UserProvider: React.FC = ({
  children,
}: {
  children?: React.ReactNode;
}) => {
  const [user] = useState<UserDetails | null>(null);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};
