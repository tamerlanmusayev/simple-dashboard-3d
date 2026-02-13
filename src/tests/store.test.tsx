import { act } from "react-dom/test-utils";
import { useStore } from "../store";

describe("Zustand Store", () => {
  beforeEach(() => {
    useStore.getState().designers = [];
    useStore.getState().objects = [];
    useStore.getState().selectedObjectId = null;
  });

  it("should add a designer", () => {
    act(() => {
      useStore.getState().addDesigner({ fullName: "Alice", workingHours: "9-5" });
    });
    const designers = useStore.getState().designers;
    expect(designers).toHaveLength(1);
    expect(designers[0].fullName).toBe("Alice");
  });

  it("should add an object", () => {
    act(() => {
      useStore.getState().addObject({ id: "obj1", color: "#fff", size: "normal" });
    });
    const objects = useStore.getState().objects;
    expect(objects).toHaveLength(1);
    expect(objects[0].color).toBe("#fff");
  });

  it("should update object", () => {
    act(() => {
      useStore.getState().addObject({ id: "obj1", color: "#fff", size: "normal" });
      useStore.getState().updateObject({ id: "obj1", color: "#000", size: "large" });
    });
    const obj = useStore.getState().objects.find((o) => o.id === "obj1");
    expect(obj?.color).toBe("#000");
    expect(obj?.size).toBe("large");
  });

  it("should set selected object", () => {
    act(() => {
      useStore.getState().setSelectedObject("obj1");
    });
    expect(useStore.getState().selectedObjectId).toBe("obj1");
  });
});
