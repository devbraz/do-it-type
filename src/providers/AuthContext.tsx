import {useContext, useCallback, useState, createContext, ReactNode } from 'react'
import { api } from '../services/api'



interface AuthProviderProps {
  children: ReactNode;
}

interface User {
  email: string;
  id: string;
  name: string;
}

interface AuthState {
  acessToken: string;
  user: User;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: User;
  acessToken: string;
  signIn: (credentials: SignInCredentials) => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData )


const useAuth = () => {
  const context = useContext(AuthContext)

  if(!context) {
    throw new Error('useAuth must be used  within an AuthProvider')
  }

  return context
}

const AuthProvider = ({children}: AuthProviderProps) => {

  const [data, setData] = useState<AuthState>(() => {
    const acessToken = localStorage.getItem('@Doit:acessToken')
    const user = localStorage.getItem('@Doit:user')

    if(acessToken && user) {
      return {acessToken, user: JSON.parse(user)}
    }

    return {} as AuthState

  })

  const signIn = useCallback(async({email, password}: SignInCredentials) => {
    const response = await api.post('/login', {email, password})

    const {acessToken, user} = response.data

    localStorage.setItem('@Doit:acessToken', acessToken)
    localStorage.setItem('@Doit:user', JSON.stringify(user))

    setData({acessToken, user})

  },[])

  const signOut = useCallback(()=> {
    localStorage.removeItem('@Doit:acessToken')
    localStorage.removeItem('@Doit:user')

    setData({} as AuthState)
  },[])

  return (
    <AuthContext.Provider value={{
      acessToken: data.acessToken,
      user: data.user,
      signIn,
      signOut,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export {AuthProvider, useAuth}