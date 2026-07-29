import { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { AuthContext } from './AuthContext.jsx';
import toast from 'react-hot-toast';

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [unseenMessages, setUnseenMessages] = useState({});
    const [isUsersLoading, setIsUsersLoading] = useState(false);
    const [isMessagesLoading, setIsMessagesLoading] = useState(false);

    const { socket, axios } = useContext(AuthContext);

    const getUsers = useCallback(async () => {
        setIsUsersLoading(true);
        try {
            const { data } = await axios.get('/api/messages/users');
            if (data.success) {
                setUsers(data.users);
                setUnseenMessages(data.unseenMessages || {});
            }
        } catch (error) {
            toast.error('Failed to load users');
        } finally {
            setIsUsersLoading(false);
        }
    }, [axios]);

    const getMessages = useCallback(async (userId) => {
        setIsMessagesLoading(true);
        try {
            const { data } = await axios.get(`/api/messages/${userId}`);
            if (data.success) {
                setMessages(data.messages);
                setUnseenMessages((prev) => {
                    const updated = { ...prev };
                    delete updated[userId];
                    return updated;
                });
            }
        } catch (error) {
            toast.error('Failed to load messages');
        } finally {
            setIsMessagesLoading(false);
        }
    }, [axios]);

    const sendMessage = async (messageData) => {
        if (!selectedUser) return;
        try {
            const { data } = await axios.post(`/api/messages/send/${selectedUser._id}`, messageData);
            if (data.success) {
                setMessages((prev) => [...prev, data.message]);
                return data.message;
            } else {
                toast.error(data.message || 'Failed to send message');
            }
        } catch (error) {
            toast.error('Failed to send message');
        }
    };

    useEffect(() => {
        if (!socket) return;

        const handleNewMessage = (newMessage) => {
            const isMessageFromSelectedUser =
                selectedUser &&
                (newMessage.senderId === selectedUser._id || newMessage.senderId?._id === selectedUser._id);
            
            if (isMessageFromSelectedUser) {
                setMessages((prev) => [...prev, newMessage]);
                axios.put(`/api/messages/mark/${newMessage._id}`);
            } else {
                setUnseenMessages((prev) => ({
                    ...prev,
                    [newMessage.senderId]: (prev[newMessage.senderId] || 0) + 1,
                }));
            }
        };

        socket.on('newMessage', handleNewMessage);

        return () => {
            socket.off('newMessage', handleNewMessage);
        };
    }, [socket, selectedUser, axios]);

    const value = {
        messages,
        setMessages,
        users,
        setUsers,
        selectedUser,
        setSelectedUser,
        unseenMessages,
        setUnseenMessages,
        isUsersLoading,
        isMessagesLoading,
        getUsers,
        getMessages,
        sendMessage,
    };

    return (
        <ChatContext.Provider value={value}>
            {children}
        </ChatContext.Provider>
    );
};