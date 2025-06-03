import { UserDocument } from "@core/types/users/UserDocument";
import config from "@server/config";
import { subHours } from "date-fns";

export const buildBattleIndexAggregate = ({
  user,
  limit,
  admin,
}: {
  user?: UserDocument;
  limit: number;
  admin?: boolean; // shortcut for admin initialization when no user is available
}) => {
  const userHasAdminRole =
    user?.role === "admin" || user?.role === "owner" || user?.role === "developer";
  const isAdmin = admin || userHasAdminRole || false;

  const hoursPrior = 24;
  const dateLimit = subHours(new Date(), hoursPrior);

  const isDevelopment = config.env === "development";

  const createDateFilter = isDevelopment ? {} : { createDate: { $gte: dateLimit } };

  let matchStage = isAdmin
    ? createDateFilter
    : user
      ? {
          $or: [
            { modifiers: { $nin: ["private"] } },
            { players: { $elemMatch: { id: user._id } } }, // Use $elemMatch for checking user._id in players array
          ],
          ...createDateFilter,
        }
      : {
          modifiers: { $nin: ["private"] },
          ...createDateFilter,
        };

  return [
    { $match: matchStage },
    {
      $addFields: {
        isFriendsOnly: { $in: ["friends-only", "$modifiers"] },
        isPublic: { $not: { $in: ["friends-only", "$modifiers"] } },
      },
    },
    {
      $addFields: {
        sortOrder: {
          $switch: {
            branches: [
              { case: { $eq: ["$status", "waiting"] }, then: 1 },
              { case: { $eq: ["$status", "pending"] }, then: 2 },
              { case: { $eq: ["$status", "simulating"] }, then: 2 },
              {
                case: {
                  $and: [{ $eq: ["$status", "completed"] }, { $eq: ["$isPublic", true] }],
                },
                then: 3,
              },
              {
                case: {
                  $and: [{ $eq: ["$status", "completed"] }, { $eq: ["$isFriendsOnly", true] }],
                },
                then: 4,
              },
            ],
            default: 5,
          },
        },
      },
    },
    {
      $facet: {
        nonCompleted: [
          { $match: { status: { $ne: "completed" } } },
          {
            $sort: {
              sortOrder: 1,
              entryCost: -1,
              createDate: -1,
            },
          },
        ],
        completed: [
          { $match: { status: "completed" } },
          {
            $sort: {
              createDate: -1,
            },
          },
          { $limit: limit },
          {
            $sort: {
              entryCost: -1,
            },
          },
        ],
      },
    },
    {
      $project: {
        nonCompleted: 1,
        completedFill: {
          $slice: ["$completed", { $subtract: [limit, { $size: "$nonCompleted" }] }],
        },
      },
    },
    {
      $project: {
        mergedResults: { $concatArrays: ["$nonCompleted", "$completedFill"] },
      },
    },
    { $unwind: "$mergedResults" },
    { $replaceRoot: { newRoot: "$mergedResults" } },
  ];
};
