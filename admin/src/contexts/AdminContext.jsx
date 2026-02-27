import { createContext, useContext } from "react";

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
    const API_URL = import.meta.env.VITE_BASE_API_URL || "http://localhost:3000/api";

    return (
        <AdminContext.Provider value={{ API_URL }}>
            {children}
        </AdminContext.Provider>
    );
};

export const useAdminContext = () => useContext(AdminContext);
