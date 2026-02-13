import { Mesh } from "three";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { forwardRef } from "react";

type CubeProps = {
  color: string;
  size: "small" | "normal" | "large";
  position?: [number, number, number];
  isSelected?: boolean;
  hovered?: boolean;
  onClick?: (e: any) => void;
  onPointerOver?: () => void;
  onPointerOut?: () => void;
};

export const Cube = forwardRef<Mesh, CubeProps>(
  (
    { color, size, position = [0, 0, 0], isSelected = false, hovered = false, onClick, onPointerOver, onPointerOut },
    ref,
  ) => {
    const meshRef = useRef<Mesh>(null);

    useFrame(() => {
      if (meshRef.current) meshRef.current.rotation.y += 0.005;
    });

    const scale = size === "small" ? 0.5 : size === "normal" ? 1 : 1.5;

    return (
      <mesh
        ref={(r) => {
          meshRef.current = r;
          if (typeof ref === "function") ref(r);
          else if (ref) ref.current = r;
        }}
        scale={scale}
        position={[position[0], scale / 2 + position[1], position[2]]}
        onClick={onClick}
        onPointerOver={onPointerOver}
        onPointerOut={onPointerOut}
        castShadow
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color={hovered ? "orange" : color}
          emissive={isSelected ? "yellow" : hovered ? "orange" : color}
        />
      </mesh>
    );
  },
);
