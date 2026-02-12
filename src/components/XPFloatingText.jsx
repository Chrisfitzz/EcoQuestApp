import React, { useEffect, useState } from "react";

export default function XPFloatingText({ amount }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 900);
    return () => clearTimeout(t);
  }, []);

  if (!visible) return null;

  const leftOffset = Math.floor(Math.random() * 80) - 40;

  return (
    <div
      className="xp-float"
      style={{ left: `calc(50% + ${leftOffset}px)`, top: "120px" }}
    >
      +{amount} XP
    </div>
  );
}
