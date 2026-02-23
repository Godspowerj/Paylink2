import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createContext, useContext, useState, useEffect } from "react";
import { Nav } from "react-day-picker";
import { Navigate, useLocation, useNavigate } from "react-router";
import AuthenticatedPageShimmer from "~/components/shimmers/authenticated-page-shimmer";
import { request } from "~/services/request";
import { tokenStore } from "~/services/token-store";

export interface User {
    id: string;
    name: string;
    email: string;
    role?: string;
    // add any other fields your API returns
}

interface AuthContextType {
    isAuthenticated: boolean;
    logout: () => void;
    user: User | null;
    isLoading: boolean;
}


const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const navigate = useNavigate();

    const queryClient = useQueryClient();

    const isValidToken = !!tokenStore.getAccessToken();
    console.log("AUTH PROVIDER => isValidToken", isValidToken);

    const { data, isLoading } = useQuery({
        queryKey: ["currentUser"],
        queryFn: () => request.get("/auth/me"),
        enabled: !!tokenStore.getAccessToken(),
        retry: false,
    });

    const user = data?.data?.data;

    const isValidUser = !!user;

    console.log("AUTH PROVIDER => ", user, isLoading, isValidUser);

    const logout = () => {
        tokenStore.setAccessToken(null);
        queryClient.removeQueries({ queryKey: ["currentUser"] }); // clear user query
        navigate("/login");
    };

    if (isLoading) {
        return (
            <AuthenticatedPageShimmer
                pathname={useLocation().pathname}
            />
        );
    }

    if (!isValidToken || !isValidUser) {
        return <Navigate to="/login" />
    }

    const isAuthenticated = isValidToken && isValidUser;

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                user,
                logout,
                isLoading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};


export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
    return ctx;
};