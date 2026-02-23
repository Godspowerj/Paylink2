import { redirect } from "react-router";
import { AuthProvider } from "~/contexts/auth";

// async function authMiddleware(
//     { request }: { request: Request },
//     next: () => Promise<Response>,
// ): Promise<Response> {
//     console.log("START<-----Dashboard middleware----->START")

//     const session = await getSession(
//         request.headers.get("Cookie"),
//     );

//     const token = session.get("token")

//     if (!token) {
//         throw redirect("/login", {
//             headers: {
//                 "Set-Cookie": await destroySession(session),
//             },
//         });
//     }

//     console.log("END<-----Dashboard middleware----->END")

//     return next();
// }

// export const middleware: Route.MiddlewareFunction[] = [
//     authMiddleware,
// ];

export function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="auth-provider">
            {children}
        </div>
    );
}