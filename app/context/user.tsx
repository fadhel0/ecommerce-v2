// Import statements
'use client';
import {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from 'react';
import { useRouter } from 'next/navigation'; // Updated import statement
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

// Define the types for your user context
interface UserContextType {
  user: any;
  id: string | null;
  email: string | null;
  name: string | null;
  picture: string | null;
  signOut: () => Promise<void>;
}

// Define the type for your Provider props
interface ProviderProps {
  children: ReactNode;
}

const Context = createContext<UserContextType | undefined>(undefined);

const Provider = ({ children }: ProviderProps) => {
  const router = useRouter();

  const [user, setUser] = useState<any>(null);
  const [id, setId] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [picture, setPicture] = useState<string | null>(null);

  const supabaseClient = createClientComponentClient();

  const getCurrentSession = async () => {
    const res = await supabaseClient.auth.getSession();
    if (res && res.data?.session) {
      return res.data.session;
    }
    clearUser();
    return null;
  };

  const getCurrentUser = async () => {
    if (id) return;

    const res = await supabaseClient.auth.getUser();
    if (res && res.data?.user) {
      const theUser = res.data.user;

      setUser(theUser);
      setId(theUser.id);
      setEmail(theUser.email || null);
      // Check if identities exist before accessing properties
      if (theUser.identities && theUser.identities.length > 0) {
        setName(theUser.identities[0]?.identity_data?.name);
        setPicture(theUser.identities[0]?.identity_data?.picture);
      } else {
        setName(null); // Set to null if identities are missing
        setPicture(null);
      }
    }
  };

  useEffect(() => {
    const isUser = async () => {
      const currentSession = await getCurrentSession();
      if (currentSession) await getCurrentUser();
    };
    isUser();
  }, []);

  const signOut = async () => {
    await supabaseClient.auth.signOut();
    clearUser();
    router.push('/');
  };

  const clearUser = () => {
    setUser(null);
    setId(null);
    setEmail(null);
    setName(null);
    setPicture(null);
  };

  const exposed: UserContextType = { user, id, email, name, picture, signOut };

  return <Context.Provider value={exposed}>{children}</Context.Provider>;
};

export const useUser = () => {
  const context = useContext(Context);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export default Provider;
