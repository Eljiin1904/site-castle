import { Http } from "#app/services/http";

export default Http.createAuthRoute({
  type: "get",
  path: "/google",
  strategy: "google",
});
