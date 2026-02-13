import { v4 as uuid } from "uuid";
import { create, StateCreator } from "zustand";
import { persist } from "zustand/middleware";

// ----- Types -----
export type Designer = {
  id: string;
  fullName: string;
  workingHours: string;
  attachedObjectsCount?: number;
};

export type Object3D = {
  id: string;
  name: string;
  designerId?: string;
  color: string;
  size: "small" | "normal" | "large";
  position?: [number, number, number];
};

type Store = {
  designers: Designer[];
  addDesigner: (designer: Omit<Designer, "id" | "attachedObjectsCount">) => void;

  objects: Object3D[];
  addObject: (obj: Partial<Object3D>) => void;
  updateObject: (obj: Partial<Object3D>) => void;

  selectedObjectId: string | null;
  setSelectedObject: (id: string | null) => void;
};

// ----- Detect Jest -----
const isTest = typeof process !== "undefined" && process.env.JEST_WORKER_ID !== undefined;

// ----- Store logic -----
const createStore: StateCreator<Store> = (set, get) => ({
  // Designers
  designers: [],
  addDesigner: (designer) => {
    const newDesigner: Designer = { id: uuid(), attachedObjectsCount: 0, ...designer };
    set((state) => ({ designers: [...state.designers, newDesigner] }));
  },

  // Objects
  objects: [],
  addObject: (obj) => {
    const newObj: Object3D = {
      id: obj.id || uuid(),
      name: obj.name || `Object #${get().objects.length + 1}`,
      color: obj.color || "#ff0000",
      size: obj.size || "normal",
      designerId: obj.designerId,
      position: obj.position || [Math.random() * 5 - 2.5, 0, Math.random() * 5 - 2.5],
    };

    const updatedDesigners = get().designers.map((d) =>
      d.id === newObj.designerId ? { ...d, attachedObjectsCount: (d.attachedObjectsCount || 0) + 1 } : d,
    );

    set({ objects: [...get().objects, newObj], designers: updatedDesigners });
  },

  updateObject: (updated) => {
    const prevObj = get().objects.find((o) => o.id === updated.id);

    const updatedDesigners = get().designers.map((d) => {
      let count = d.attachedObjectsCount || 0;
      if (prevObj?.designerId === d.id && updated.designerId !== d.id) count--;
      if (prevObj?.designerId !== d.id && updated.designerId === d.id) count++;
      return { ...d, attachedObjectsCount: count };
    });

    set({
      objects: get().objects.map((o) => (o.id === updated.id ? { ...o, ...updated } : o)),
      designers: updatedDesigners,
    });
  },

  // Scene selection
  selectedObjectId: null,
  setSelectedObject: (id) => set({ selectedObjectId: id }),
});

// ----- Export store -----
export const useStore = isTest
  ? create<Store>(createStore)
  : create<Store>()(
      persist(createStore, {
        name: "editor-store",
        partialize: (state) => ({
          designers: state.designers,
          objects: state.objects,
          selectedObjectId: state.selectedObjectId,
        }),
      }),
    );
