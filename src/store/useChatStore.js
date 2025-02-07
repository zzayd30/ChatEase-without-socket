import { create } from "zustand";
import { toast } from "react-hot-toast";
import { axiosInstance } from "../lib/axios.js";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,
  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/users");
      set({ users: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isUsersLoading: false });
    }
  },
  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isMessagesLoading: false });
    }
  },
  sendMessage: async (messageData) => {
    const { selectedUser, messages, getValidMessages } = get();
    const currentMessages = getValidMessages(messages);
    if (!selectedUser || !selectedUser._id) {
      toast.error("No recipient selected.");
      return;
    }
    try {
      const res = await axiosInstance.post(
        `/messages/send/${selectedUser._id}`,
        messageData
      );
      if (!res.data) throw new Error("Invalid response from server");
      set({
        messages: { ...messages, messages: [...currentMessages, res.data] },
      });
      toast.success("Message sent successfully");
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error(error.response?.data?.message || "Failed to send message.");
    }
  },
  subscribeToMessages: () => {},
  unsubscribeFromMessages: () => {},
  setSelectedUser: (selectedUser) => set({ selectedUser }),
  getValidMessages: (state) =>
    Array.isArray(state.messages) ? state.messages : [],
}));
