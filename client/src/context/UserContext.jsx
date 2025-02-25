import React from 'react'
import { useContext, useState } from 'react'


export const UserContext = React.createContext();
export const useUserContext = () => useContext(UserContext);

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [userAuth, setUserAuth] = useState(false);
    const [userRole, setUserRole] = useState(null);

    return(
        <UserContext.Provider value={{ user, setUser, userAuth, setUserAuth, userRole, setUserRole }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider;