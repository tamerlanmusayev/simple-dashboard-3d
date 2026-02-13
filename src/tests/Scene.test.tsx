// src/tests/Scene.test.tsx
import { useStore } from "../store";
import { act } from "react-dom/test-utils";

// --- Mock Canvas and useFrame from R3F ---
jest.mock("@react-three/fiber", () => {
  const actual = jest.requireActual("@react-three/fiber");
  return {
    ...actual,
    Canvas: ({ children }: any) => <div data-testid="canvas">{children}</div>,
    useFrame: () => {}, // no-op
  };
});

// --- Mock ResizeObserver ---
class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
global.ResizeObserver = ResizeObserver;

// --- Mock i18n ---
jest.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

describe("Scene component store logic", () => {
  beforeEach(() => {
    // Reset Zustand store between tests
    useStore.setState({
      designers: [],
      objects: [],
      selectedObjectId: null,
    });
  });

  it("adds object with selected designer", () => {
    const store = useStore.getState();

    // Add designer
    act(() => {
      store.addDesigner({ fullName: "Alice", workingHours: "09-15:00" });
    });

    const designers = useStore.getState().designers;
    expect(designers.length).toBe(1);

    const designerId = designers[0].id;
    expect(designerId).toBeDefined();

    // Add object
    act(() => {
      store.addObject({ designerId });
    });

    const objects = useStore.getState().objects;
    expect(objects.length).toBe(1);
    expect(objects[0].designerId).toBe(designerId);
    expect(objects[0].name).toBe("Object #1");
  });

  it("selects an object", () => {
    const store = useStore.getState();

    act(() => {
      store.addDesigner({ fullName: "Bob", workingHours: "09-15:00" });
    });

    const designerId = useStore.getState().designers[0].id;

    act(() => {
      store.addObject({ designerId });
    });

    const objId = useStore.getState().objects[0].id;

    act(() => {
      store.setSelectedObject(objId);
    });

    expect(useStore.getState().selectedObjectId).toBe(objId);
  });
});
