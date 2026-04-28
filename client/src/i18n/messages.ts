import en from '../locales/en.json';
import ro from '../locales/ro.json';

export type IntlMessageID = keyof typeof en;

// function flattenMessages(nestedMessages: Record<string, any>, prefix = '') {
//   return Object.entries(nestedMessages).reduce((acc, [key, value]) => {
//     const prefixedKey = prefix ? `${prefix}.${key}` : key;
//     if (typeof value === 'string') {
//       acc[prefixedKey] = value;
//     } else {
//       Object.assign(acc, flattenMessages(value, prefixedKey));
//     }
//     return acc;
//   }, {} as Record<string, string>);
// }

export const messages = { en, ro };
