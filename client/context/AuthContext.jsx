import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { io } from "socket.io-client";

const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:8001";
if (!import.meta.env.VITE_BACKEND_URL) {
  console.warn("VITE_BACKEND_URL is not defined. Falling back to http://localhost:8001");
}
axios.defaults.baseURL = backendUrl;

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [token, setToken] = useState(localStorage.getItem("token") || null);
    const [authUser, setAuthUser] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [socket, setSocket] = useState(null);

    //
    const checkAuth = async () => {
        try {
            const { data } = await axios.get("/api/auth/check-auth");
            if(data.success){
                setAuthUser(data.user);
                connectSocket(data.user);
            }
        }
        catch (error) {
            toast.error("Authentication failed");
        }
    };

    const login = async (state, credentials) => {
        try {
            const { data } = await axios.post(`/api/auth/${state}`, credentials);
            if(data.success){
                const user = data.user || data.userData;
                setAuthUser(user);
                connectSocket(user);
                axios.defaults.headers.common["token"] = data.token;
                localStorage.setItem("token", data.token);
                setToken(data.token);
                toast.success(data.message);
            }
            else{
                toast.error(data.message);
            }
        }
        catch (error) {
            toast.error("Login failed");
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
        setAuthUser(null);
        setOnlineUsers([]);
        axios.defaults.headers.common["token"] = null;
        toast.success("Logged out successfully");
        if(socket) socket.disconnect();
    }

    const updateProfile = async (body) => {
        try {
            const { data } = await axios.put("/api/auth/update-profile", body);
            if(data.success){
                setAuthUser(data.user);
                toast.success("Profile updated successfully");
            }
            else{
                toast.error(data.message || "Profile update failed");
            }
        }
        catch (error) {
            toast.error("Profile update failed");
        }
    };

    const connectSocket = (userData) => {
        if(!userData || socket?.connected) return;
        const newSocket = io(backendUrl, {
            query: { userId: userData._id },
        });
        setSocket(newSocket);

        newSocket.on("connect", () => {
            console.log("Socket connected", newSocket.id);
        });

        newSocket.on("getOnlineUsers", (users) => {
            setOnlineUsers(users);
        });
    };

    useEffect(() => {
        if(token){
            axios.defaults.headers.common["token"] = token;
            checkAuth();
        }
    }, [token]);


    const value = {
        axios,
        token,
        setToken,
        authUser,
        setAuthUser,
        onlineUsers,
        setOnlineUsers,
        socket,
        setSocket,
        login,
        logout,
        updateProfile
    };
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

