import { describe, expect, it } from "vitest";

import { serializeJsonLd } from "@/shared/components/json-ld";

describe("serializeJsonLd", () => {
  it("escapes the character that could close the script tag", () => {
    const output = serializeJsonLd({
      name: "WiDS </script><script>alert(1)</script>",
    });

    expect(output).not.toContain("</script>");
    expect(output).toContain("\\u003c");
  });

  it("escapes every occurrence, not just the first", () => {
    const output = serializeJsonLd({ a: "<one>", b: "<two>" });

    expect(output).not.toContain("<");
  });

  it("survives a round trip, so the escaping stays valid JSON", () => {
    const data = { name: "A < B", nested: { url: "https://example.test" } };

    // The escape is a JSON string escape, so parsing gives the original back.
    expect(JSON.parse(serializeJsonLd(data))).toEqual(data);
  });

  it("leaves ordinary content untouched", () => {
    const output = serializeJsonLd({ name: "WiDS Guayaquil" });

    expect(output).toBe('{"name":"WiDS Guayaquil"}');
  });
});
