export function uuidRemoveDash(raw: string) {
  return raw.replace(/-/g, "");
}

export function uuidAddDash(str: string) {
  let result = "";
  for (let i = 0; i < str.length; i++) {
    if (i === 8 || i === 12 || i === 16 || i === 20) {
      result += "-";
    }
    result += str[i];
  }
  return result;
}
