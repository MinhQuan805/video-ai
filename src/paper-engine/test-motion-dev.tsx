import React from "react";
import { motion } from "motion/react";
import { useCurrentFrame } from "remotion";

export const TestMotionDev: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <div style={{ width: 1080, height: 1920, backgroundColor: "#F7F5EE", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
        style={{
          width: 200,
          height: 200,
          backgroundColor: "#C85228",
          borderRadius: 24,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#FFF",
          fontSize: 24,
          fontWeight: "bold",
        }}
      >
        Motion.dev Frame {frame}
      </motion.div>
    </div>
  );
};
