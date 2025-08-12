export default function extractNameEdges(fullname: string) {
  const words = fullname.trim().split(/\s+/);
  if (words.length < 2) return words[0].charAt(0);

  const firstPart = words[0].slice(0, 1);
  const lastPart = words[words.length - 1].slice(0, 1);

  return firstPart + lastPart;
}
