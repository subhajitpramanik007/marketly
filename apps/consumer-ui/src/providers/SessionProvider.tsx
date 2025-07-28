'use client';

import * as React from 'react';
import type { IUser } from '@/types/user.types';

import { useCurrentUser, useRefreshSessionQuery } from '@/hooks/auth';

type State = {
  user: IUser | null;
  isAuthenticated: boolean;
  status: 'Loading' | 'Unauthenticated' | 'Authenticated';
  error: string | null;
};

type Actions = {
  setUser: (user: IUser) => void;
  logout: () => void;
};

export type SessionContextType = State & Actions;

export const SessionContext = React.createContext<SessionContextType | undefined>(undefined);

const initialState: State = {
  user: null,
  isAuthenticated: false,
  status: 'Loading',
  error: null,
};

type SessionReducerAction =
  | { type: 'SET_STATUS'; payload: 'Loading' | 'Unauthenticated' | 'Authenticated' }
  | { type: 'SET_USER'; payload: { user: IUser } }
  | { type: 'LOGOUT' };

function sessionReducer(state: State, action: SessionReducerAction): State {
  switch (action.type) {
    case 'SET_STATUS':
      return {
        ...state,
        status: action.payload,
      };
    case 'SET_USER':
      return {
        ...state,
        user: action.payload.user,
        status: 'Authenticated',
        isAuthenticated: true,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };
    default:
      return state;
  }
}

export const SessionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = React.useReducer(sessionReducer, initialState);

  const { isError: refreshError } = useRefreshSessionQuery();
  const { data, isError: userError, isLoading: userLoading } = useCurrentUser();

  React.useEffect(() => {
    if (userLoading) {
      dispatch({ type: 'SET_STATUS', payload: 'Loading' });
    } else if (userError || refreshError) {
      dispatch({ type: 'SET_STATUS', payload: 'Unauthenticated' });
      dispatch({ type: 'LOGOUT' });
    } else if (data?.data?.user) {
      dispatch({ type: 'SET_USER', payload: { user: data.data.user } });
    }
  }, [userLoading, userError, data, refreshError]);

  return (
    <SessionContext.Provider
      value={{
        ...state,
        setUser: (user: IUser) => dispatch({ type: 'SET_USER', payload: { user } }),
        logout: () => dispatch({ type: 'LOGOUT' }),
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};
