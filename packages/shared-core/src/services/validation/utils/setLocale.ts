import { setLocale } from "yup";

setLocale({
  mixed: {
    default: ({path, label}) => ({ key: 'validations.mixed.default', value: label || path}),
    required: ({path, label}) => ({ key: `validations.mixed.required`, value: label || path}),
  },
  string: {
    min: ({ path, min, label }) => ({ key: 'validations.string.min', value: { label: label || path, min } }),
    max: ({ path, max, label }) => ({ key: 'validations.string.max', value: { label: label || path, max } }),
    email: ({path, label}) => ({ key: 'validations.string.email', value: label || path}),
    url: ({path, label}) => ({ key: 'validations.string.url', value: label || path}),
    matches: ({path, label}) => ({ key: 'validations.string.matches', value: label || path}),
    length: ({path, label, length}) => ({ key: 'validations.string.length', value: label || path, length}),
  },
  number: {
    min: ({ path, label, min }) => ({ key: 'validations.number.min', value: { label: label || path, min }}),
    max: ({ path, label, max }) => ({ key: 'validations.number.max', value: { label: label || path, max }}),
    lessThan: ({ path, label, less }) => ({ key: 'validations.number.lessThan', value: { label: label || path, less } }),
    moreThan: ({ path, label, more }) => ({ key: 'validations.number.moreThan', value: { label: label || path, more } }),
    positive: ({path, label}) => ({ key: 'validations.number.positive', value: label || path}),
    negative: ({path, label}) => ({ key: 'validations.number.negative', value: label || path}),
    integer: ({path, label}) => ({ key: 'validations.number.integer', value: label || path}),
  },
  date: {
    min: ({ path, label, min }) => ({ key: 'validations.date.min',value: { label: label || path, min } }),
    max: ({ path, label, max }) => ({ key: 'validations.date.max', value: { label: label || path, max } })
  },
  boolean: {
    isValue: ({path, label, value}) => ({ key: 'validations.boolean.isValue', value: { label: label || path, value } }),
  },
  object: {
    noUnknown: ({path, label, unknown}) => ({ key: 'validations.object.noUnknown', value: { label: label || path, unknown }}),
  }
});