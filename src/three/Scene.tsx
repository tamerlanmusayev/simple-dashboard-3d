import { Canvas } from "@react-three/fiber";
import { OrbitControls, TransformControls } from "@react-three/drei";
import { useRef, useState } from "react";
import { useStore } from "../store";
import { Cube } from "./Cube";
import { useTranslation } from "react-i18next";

export const Scene = () => {
  const { objects, addObject, selectedObjectId, setSelectedObject, designers, updateObject } = useStore();

  const [hoveredObjectId, setHoveredObjectId] = useState<string | null>(null);
  const [selectedDesignerId, setSelectedDesignerId] = useState<string | null>(null);
  const transformRef = useRef<any>(null);
  const { t } = useTranslation();

  return (
    <>
      {/* Designer selection */}
      <div style={{ position: "absolute", top: 60, left: 10, zIndex: 10 }}>
        <select value={selectedDesignerId || ""} onChange={(e) => setSelectedDesignerId(e.target.value)}>
          <option value="">{t("selectDesigner")}</option>
          {designers.map((d) => (
            <option key={d.id} value={d.id}>
              {d.fullName}
            </option>
          ))}
        </select>
      </div>

      <Canvas camera={{ position: [0, 5, 10], fov: 60 }} style={{ width: "100%", height: "100%" }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 10, 5]} intensity={0.8} />

        <OrbitControls makeDefault />

        {/* Ground plane for placing new objects */}
        <mesh
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, 0, 0]}
          onDoubleClick={(e) => {
            e.stopPropagation();
            if (!selectedDesignerId) {
              alert(t("selectDesignerAlert"));
              return;
            }
            const point = e.point;
            addObject({
              designerId: selectedDesignerId,
              color: "#ff0000",
              size: "normal",
              position: [point.x, 0, point.z],
              name: `Object #${objects.length + 1}`,
            });
          }}
        >
          <planeGeometry args={[50, 50]} />
          <meshStandardMaterial visible={false} />
        </mesh>

        {/* Objects */}
        {objects.map((obj) => {
          const isSelected = obj.id === selectedObjectId;

          const cubeElement = (
            <Cube
              color={obj.color}
              size={obj.size}
              position={obj.position} // fully controlled
              isSelected={isSelected}
              hovered={hoveredObjectId === obj.id}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedObject(obj.id);
              }}
              onPointerOver={() => setHoveredObjectId(obj.id)}
              onPointerOut={() => setHoveredObjectId(null)}
            />
          );

          return isSelected ? (
            <TransformControls
              key={obj.id}
              ref={transformRef}
              mode="translate"
              showX
              showY={false} // lock Y
              showZ
              onMouseUp={() => {
                // update store when user finishes moving
                if (!transformRef.current) return;
                const { x, y, z } = transformRef.current.object.position;
                updateObject({ ...obj, position: [x, y, z] });
              }}
            >
              {cubeElement}
            </TransformControls>
          ) : (
            <group key={obj.id}>{cubeElement}</group>
          );
        })}
      </Canvas>
    </>
  );
};
