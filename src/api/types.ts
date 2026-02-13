export type Designer = {
  id: string;
  fullName: string;
  workingHours: string;
};

export type Object3D = {
  id: string;
  name: string;
  designerId: string;
  color: string;
  position: [number, number, number];
  size: "small" | "normal" | "large";
};
