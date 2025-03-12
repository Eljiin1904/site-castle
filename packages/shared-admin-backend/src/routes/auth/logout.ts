import { Http } from "#app/services/http";

export default Http.createApiRoute({
  type: "post",
  path: "/logout",
  callback: async (req, res, next) => {
    req.logout((err) => {
      if (err) next(err);
      else res.json({});
    });
  },
});
