export function parseMentions(text: string) {
  const regex = /@(\w+)/g;

  const mentions = [];

  let match;

  while ((match = regex.exec(text)) !== null) {
    mentions.push(match[1]);
  }

  return mentions;
}
