import { buildTemplateSegments, extractPlaceholders, replaceTemplatePlaceholders } from "@/app/utils/templateEngine";

describe("templateEngine", () => {
  it("replaces placeholders with mapped values", () => {
    const template = "Hello {{Customer_Name}} from {{Provider_Name}}";
    const output = replaceTemplatePlaceholders(template, {
      Customer_Name: "ABC Council",
      Provider_Name: "Enterprise Delivery Group",
    });

    expect(output).toBe("Hello ABC Council from Enterprise Delivery Group");
  });

  it("keeps missing placeholders when no value exists", () => {
    const template = "Start {{Commencement_Date}}";
    const output = replaceTemplatePlaceholders(template, {});

    expect(output).toBe("Start {{Commencement_Date}}");
  });

  it("extracts placeholders and segments", () => {
    expect(extractPlaceholders("{{One}} and {{Two}}")).toEqual(["One", "Two"]);

    const segments = buildTemplateSegments("Hi {{Name}}", { Name: "Taylor" });
    expect(segments.some((segment) => segment.state === "mapped" && segment.text === "Taylor")).toBe(true);
  });
});
