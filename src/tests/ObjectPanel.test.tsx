import { render, screen, fireEvent } from "@testing-library/react";
import { ObjectPanel } from "../components/Editor/ObjectPanel";
import { useStore } from "../store";

describe("ObjectPanel", () => {
  beforeEach(() => {
    useStore.getState().designers = [
      { id: "1", fullName: "Alice", workingHours: "9:00-18:00" },
      { id: "2", fullName: "Bob", workingHours: "10:00:19:00" },
    ];
    useStore.getState().objects = [
      { id: "obj1", name: "Cube 1", color: "#ff0000", size: "normal", designerId: "1", position: [0, 0, 0] },
    ];
    useStore.getState().selectedObjectId = "obj1";
  });

  it("renders selected object fields", () => {
    render(<ObjectPanel />);
    expect(screen.getByLabelText(/Designer/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Color/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Size/i)).toBeInTheDocument();
  });

  it("updates object designer", () => {
    render(<ObjectPanel />);
    const select = screen.getByLabelText(/Designer/i);
    fireEvent.change(select, { target: { value: "2" } });
    const obj = useStore.getState().objects.find((o) => o.id === "obj1");
    expect(obj?.designerId).toBe("2");
  });

  it("updates object color", () => {
    render(<ObjectPanel />);
    const input = screen.getByLabelText(/Color/i);
    fireEvent.change(input, { target: { value: "#00ff00" } });
    const obj = useStore.getState().objects.find((o) => o.id === "obj1");
    expect(obj?.color).toBe("#00ff00");
  });
});
