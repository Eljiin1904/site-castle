import { Validation } from "@core/services/validation";
import { System } from "@server/services/system";
import { Http } from "#app/services/http";

export default Http.createApiRoute({
  type: "post",
  path: "/log-error",
  secure: false,
  body: Validation.object({
    message: Validation.string().required("Message is required."),
    path: Validation.string().required("Path is required."),
    stack: Validation.string(),
  }),
  callback: async (req, res) => {
    const { message, path, stack } = req.body;

    await System.log({
      kind: "client-error",
      system: "site-frontend",
      message,
      ip: req.trueIP,
      path,
      stack,
    });

    res.json({});
  },
});
