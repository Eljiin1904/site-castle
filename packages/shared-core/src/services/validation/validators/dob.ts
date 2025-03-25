import { object, number } from "yup";
import { differenceInYears } from "date-fns";
import { Utility } from "#core/services/utility";
import { Birthday } from "#core/types/utility/Birthday";

export const dob = (name: string = "Date of birth") => {
  return object({
    day: number().required(),
    month: number().required(),
    year: number().required(),
  }).test({
    name: "valid-dob",
    test: (x, ctx) => {
      if (
        x === undefined ||
        x.day === undefined ||
        x.month === undefined ||
        x.year === undefined
      ) {
        return ctx.createError({ message: {
          key: 'validations.mixed.required',
          value: name
        } });
      }

      if (
        x.year < 1900 ||
        x.year > 2024 ||
        x.month < 1 ||
        x.month > 12 ||
        x.day < 1 ||
        x.day > 31
      ) {
        return ctx.createError({ message: `${name} is invalid.` });
      }

      const dob = Utility.getBirthDate(x as Birthday);
      const age = differenceInYears(Date.now(), dob);

      if (age < 18) {
        return ctx.createError({
          message: {
            key: 'validations.dob.min'
          }
        });
      }
      return true;
    },
  });
};
