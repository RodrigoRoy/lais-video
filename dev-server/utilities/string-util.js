// NOTE: This ways generates syntaxError!:
// export class StringUtil {
//   static isEmpty(value){
//     return !value || !value.trim();
//   }
//
//   static capitalize(word){
//     return word.charAt(0).toUpperCase();
//   }
// }

export function isEmpty(value){
  return !value || !value.trim();
}

export function capitalize(word){
  return word.charAt(0).toUpperCase();
}
