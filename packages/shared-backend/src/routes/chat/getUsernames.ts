import { Validation } from "@core/services/validation";
import { Database } from "@server/services/database";
import { Http } from "#app/services/http";

export default Http.createApiRoute({
  type: "post",
  path: "/get-usernames",
  secure: true,
  body: Validation.object({
    searchText: Validation.string().required("Search text is required."),
    limit: Validation.limit(),
  }),
  callback: async (req, res) => {
    const { searchText, limit } = req.body;

    const users = await Database.collection("users")
      .find(
        {
          username: { $regex: searchText, $options: "i" },
        },
        {
          sort: { username: 1 },
          limit,
          projection: { username: 1 },
          collation: { locale: "en", strength: 2 },
        },
      )
      .toArray();

    const usernames = users.map((x) => x.username);

    res.json({ usernames });
  },
});
