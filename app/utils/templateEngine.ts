export type TemplateValue = string | number | null | undefined;
export type TemplateData = Record<string, TemplateValue>;

const PLACEHOLDER_PATTERN = /\{\{\s*([A-Za-z0-9_]+)\s*\}\}/g;

export function replaceTemplatePlaceholders(
  template: string,
  data: TemplateData,
  missingFormatter: (placeholder: string) => string = (placeholder) => `{{${placeholder}}}`,
): string {
  return template.replace(PLACEHOLDER_PATTERN, (_, key: string) => {
    const value = data[key];
    return value === undefined || value === null || value === ""
      ? missingFormatter(key)
      : String(value);
  });
}

export function extractPlaceholders(template: string): string[] {
  return Array.from(template.matchAll(PLACEHOLDER_PATTERN), (match) => match[1]);
}

export type TemplateSegment = {
  text: string;
  placeholder?: string;
  state: "text" | "mapped" | "missing";
};

export function buildTemplateSegments(template: string, data: TemplateData): TemplateSegment[] {
  const segments: TemplateSegment[] = [];
  let lastIndex = 0;

  for (const match of template.matchAll(PLACEHOLDER_PATTERN)) {
    const index = match.index ?? 0;
    const placeholder = match[1];

    if (index > lastIndex) {
      segments.push({ text: template.slice(lastIndex, index), state: "text" });
    }

    const value = data[placeholder];
    const isMissing = value === undefined || value === null || value === "";

    segments.push({
      text: isMissing ? `{{${placeholder}}}` : String(value),
      placeholder,
      state: isMissing ? "missing" : "mapped",
    });

    lastIndex = index + match[0].length;
  }

  if (lastIndex < template.length) {
    segments.push({ text: template.slice(lastIndex), state: "text" });
  }

  return segments;
}
