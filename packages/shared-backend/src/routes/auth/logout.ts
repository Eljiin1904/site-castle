import { Http } from "#app/services/http";
import { Users } from "#app/services/users";

export default Http.createApiRoute({
  type: "post",
  path: "/logout",
  secure: true,
  callback: async (req, res) => {
    await Users.logoutUser(req);

    res.json({});
  },
});
