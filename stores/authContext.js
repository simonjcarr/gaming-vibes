import React, { createContext, useEffect, useState } from "react";
import netlifyIdentity from "netlify-identity-widget";

export const AuthContext = createContext(
  {
    user: null,
    login: () => {},
    logout: () => {},
    authReady: false,
  }
)

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null)


  useEffect(() => {
    //Init netlify identity package
    

    netlifyIdentity.on('login', (user) => {
      setUser(user)
      netlifyIdentity.close()
      console.log("Login event")
    })

    netlifyIdentity.on('logout', () => {
      setUser(null)
      console.log("Logout event")
    })

    //This must come after the netlify listen events have been registerd
    netlifyIdentity.init()

    return () => {
      netlifyIdentity.off('login')
      netlifyIdentity.off('logout')
    }

    
  }, [])

  const login = () => {
    netlifyIdentity.open()
  }

  const logout = () => {
    netlifyIdentity.logout()
  }

  const context = { user, login, logout}

  return (
    <AuthContext.Provider value={context}>
      {children}
    </AuthContext.Provider>
  )
}