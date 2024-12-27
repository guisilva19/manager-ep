export function formatText(text: string) {
  if (text.length > 30) {
    const start = text.substring(0, 27);
    const end = text.substring(text.length - 4);
    return `${start}...${end}`;
  }
  return text;
}
