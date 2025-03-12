import { Http } from "#app/services/http";
import { Users } from "@server/services/users";

export default Http.createApiRoute({
  type: "post",
  path: "/session",
  secure: false,
  callback: async (req, res) => {
    if (req.isAuthenticated()) {
      res.json({
        authenticated: true,
        user: Users.getAuthenticatedUser(req.user),
      });
    } else {
      res.json({
        authenticated: false,
      });
    }
  },
});
