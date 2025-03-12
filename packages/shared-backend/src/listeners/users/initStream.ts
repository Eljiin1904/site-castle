import { UserDocument } from "@core/types/users/UserDocument";
import { DotNestedKeys } from "@core/types/utility/DotNestedKeys";
import { Database } from "@server/services/database";
import { Sockets } from "#app/services/sockets";

type UpdateKeys = Partial<Record<DotNestedKeys<UserDocument>, any>>;

export default Sockets.createListener({
  action: "init",
  callback: async (io) => {
    function watch() {
      const changeStream = Database.collection("users").watch([
        { $match: { operationType: "update" } },
      ]);

      changeStream.on("change", (e) => {
        if (e.operationType !== "update") {
          return;
        }

        const userId = e.documentKey._id;

        const room = io.sockets.adapter.rooms.get(`user-${userId}`);
        const size = room ? room.size : 0;

        if (size < 1) {
          return;
        }

        const desc = e.updateDescription;
        const updatedFields = filterFields(desc.updatedFields as UpdateKeys);
        const removedFields = desc.removedFields || [];

        io.sockets.in(`user-${userId}`).emit("user-update", {
          updatedFields,
          removedFields,
        });
      });

      changeStream.on("error", (err) => {
        console.error(err.message);
        changeStream.removeAllListeners();
        watch();
      });
    }

    watch();
  },
});

function filterFields(fields: UpdateKeys): UpdateKeys {
  const filteredFields: UpdateKeys = {};

  for (const str in fields) {
    const key = str as DotNestedKeys<UserDocument>;

    if (excludedFields.includes(key)) {
      continue;
    }

    filteredFields[key] = fields[key];
  }

  return filteredFields;
}

const excludedFields: DotNestedKeys<UserDocument>[] = [
  "passwordHash",
  "tfa.recoveryHash",
  "tfa.secret",
  "kyc.firstName",
  "kyc.lastName",
  "kyc.dob",
  "kyc.address",
  "kyc.city",
  "kyc.state",
  "kyc.country",
  "kyc.zipCode",
  "kyc.occupation",
  "meta.levelCaseValue",
  "meta.levelCaseBalance",
  "meta.activeDate",
  "meta.lastBetDate",
  "meta.lastDepositDate",
  "meta.firstDepositDate",
  "meta.lastWithdrawDate",
  "meta.firstWithdrawDate",
  "meta.reactivateDate",
  "meta.socialUrl",
];
