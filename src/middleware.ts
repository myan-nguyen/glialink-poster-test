export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/dashboard/:path*", "/create-project/:path*", "/project/:path*", "/profile/:path*", "/settings/:path*"],
};
