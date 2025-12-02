import { createContext, useContext, useState } from "react";
import useRequest from "../hooks/useRequest";

const UserContext = createContext({
    isAuthenticated: false,
    user: {
        email: '',
        password: '',
        _createdOn: 0,
        _id: '',
        accessToken: ''
    },
    registerHandler() { },
    loginHandler() { },
    logoutHandler() { },
});

export function UserProvider({
    children,
}) {
    const [user, setUser] = useState(null);
    const { request } = useRequest();

    const registerHandler = async (email, password) => {
        const newUser = { email, password };

        // Register API call 
        const result = await request('/users/register', 'POST', newUser);

        // Login user after register
        setUser(result);
    };

    const loginHandler = async (email, password) => {
        const result = await request('/users/login', 'POST', { email, password });

        console.log(result);

        setUser(result);
    };

    const logoutHandler = () => {
        return request('/users/logout', 'GET', null, { accessToken: user.accessToken })
            .finally(() => setUser(null));
    };

    const userContextValues = {
        user,
        isAuthenticated: !!user?.accessToken,
        registerHandler,
        loginHandler,
        logoutHandler,
    };

    return (
        <UserContext.Provider value={userContextValues}>
            {children}
        </UserContext.Provider>
    );
}

export function useUserContext() {
    const contextData = useContext(UserContext);

    return contextData;
}

export default UserContext;
