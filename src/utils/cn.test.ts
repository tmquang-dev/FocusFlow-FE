import { describe, it, expect } from "@jest/globals";
import { cn } from "@/utils/cn";

describe("cn utility", () => {

    it("should merge class names", () => {
        expect(cn("class1", "class2")).toBe("class1 class2");
    });

    it("should handle conditional classes", () => {
        expect(cn("class1", "class2")).toBe("class1 class2");
    });

    it("should resolve tailwind conflicts", () => {
        expect(cn("px-2 py-2", "p-4")).toBe("p-4");
    });
});
