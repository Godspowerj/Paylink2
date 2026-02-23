// lib/tokenStore.ts

export const tokenStore = {
    getAccessToken: () => localStorage.getItem("access_token"),
    setAccessToken: (token: string | null) => {
        if (token) {
            localStorage.setItem("access_token", token);
        } else {
            localStorage.removeItem("access_token");
        }
    },
};
