import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login",
  },
});

export const config = {
  matcher: [
    "/audit/:path*",
    "/company/:path*",
    "/dashboard/:path*",
    "/depots/:path*",
    "/onboarding/:path*",
    "/planning/:path*",
    "/templates/:path*",
    "/users/:path*",
    "/vehicles/:path*",
  ],
};
