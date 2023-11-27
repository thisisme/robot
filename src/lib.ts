/**
 * Tanslate instructions to english
 * @param char Character of instruction in swedish
 * @returns string
 */
export const translateToEnglish = (char: string): string => {
  if (char === "h") return "r";
  if (char === "v") return "l";
  if (char === "n") return "n";
  if (char === "ö") return "e";
  if (char === "s") return "s";
  if (char === "v") return "w";
  if (char === "g") return "f";
  return char;
}
