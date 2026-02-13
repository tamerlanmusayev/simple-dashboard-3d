import { Designer, Object3D } from "./types";

const delay = (ms = 300) => new Promise((r) => setTimeout(r, ms));

const load = <T>(key: string, fallback: T): T => JSON.parse(localStorage.getItem(key) || "null") ?? fallback;

const save = (key: string, value: unknown) => localStorage.setItem(key, JSON.stringify(value));

let designers = load<Designer[]>("designers", []);
let objects = load<Object3D[]>("objects", []);

export const api = {
  async getDesigners() {
    await delay();
    return designers;
  },

  async addDesigner(d: Designer) {
    await delay();
    designers = [...designers, d];
    save("designers", designers);
    return d;
  },

  async getObjects() {
    await delay();
    return objects;
  },

  async addObject(o: Object3D) {
    await delay();
    objects = [...objects, o];
    save("objects", objects);
    return o;
  },

  async updateObject(o: Object3D) {
    await delay();
    objects = objects.map((x) => (x.id === o.id ? o : x));
    save("objects", objects);
    return o;
  },
};
