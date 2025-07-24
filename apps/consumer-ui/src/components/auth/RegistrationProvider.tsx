import * as React from 'react';

type State = {
  email: string;
  isDoneRegistration: boolean;
};

type Action = {
  setEmail: (email: string) => void;
  setIsDoneRegistration: (isDoneRegistration: boolean) => void;
};

type RegistrationContextType = State & Action;

const RegistrationContext = React.createContext<RegistrationContextType | undefined>(undefined);

export const RegistrationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [email, setEmail] = React.useState<string>('');
  const [isDoneRegistration, setIsDoneRegistration] = React.useState<boolean>(false);

  return (
    <RegistrationContext.Provider
      value={{ email, isDoneRegistration, setEmail, setIsDoneRegistration }}
    >
      {children}
    </RegistrationContext.Provider>
  );
};

export const useRegistration = () => {
  const context = React.useContext(RegistrationContext);
  if (!context) {
    throw new Error('useRegistration must be used within a RegistrationProvider');
  }
  return context;
};
