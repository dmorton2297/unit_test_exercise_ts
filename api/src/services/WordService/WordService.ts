export class WordService {
  constructor() {}

  public snakeToCamelCase(input: { word: string }) {
    const parts = input.word.split("_");
    const capatalizedParts = parts.map((part, i) => {
      if (part.length && i !== 0) {
        const firstLetter = part[0];
        const remaining = part.substring(1);
        return `${firstLetter.toUpperCase()}${remaining.toLowerCase()}`;
      } else if (part.length && i === 0) {
        return part.toLowerCase();
      }
    });
    return capatalizedParts.join("");
  }
}
