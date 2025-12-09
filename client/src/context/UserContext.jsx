import { createContext, useEffect, useState } from "react";
import useRequest from "../hooks/useFetch.js";
import { useNavigate } from "react-router"; 

const UserContext = createContext({
    isAuthenticated: false,
    user: {
        username: '',
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

export function UserProvider({children}) {
    
      useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const [user, setUser] = useState(null);
    const { request } = useRequest();
    const navigate = useNavigate();

    const registerHandler = async (username, email, password) => {
        const newUser = { username, email, password };

       
        const result = await request('/users/register', 'POST', newUser);

      
        setUser(result);
        localStorage.setItem("user", JSON.stringify(result)); 
    };

    const loginHandler = async (email, password) => {
        const result = await request('/users/login', 'POST', { email, password });

        console.log(result);

        setUser(result);
        localStorage.setItem("user", JSON.stringify(result)); 
    };

    const logoutHandler = () => {
        return request('/users/logout', 'GET', null, { accessToken: user?.accessToken })
            .finally(() => {
            setUser(null);
            localStorage.removeItem("user");
            navigate("/");
        });
    };

    const userContextValues = {
        user,
        isAuthenticated: !!user?.accessToken,
        registerHandler,
        loginHandler,
        logoutHandler,
        setUser
    };

    return (
        <UserContext.Provider value={userContextValues}>
            {children}
        </UserContext.Provider>
    );
}

export default UserContext;