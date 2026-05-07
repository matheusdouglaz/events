"use client";

import { useEffect, useState } from "react";

export function CursorGlow() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trailPosition, setTrailPosition] = useState({ x: -100, y: -100 });
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setPosition({ x: event.clientX, y: event.clientY });
      const target = event.target as HTMLElement | null;
      setIsActive(
        !!target?.closest(
          "a, button, input, textarea, select, [role='button'], [data-cursor='active']"
        )
      );
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    let frame = 0;
    const updateTrail = () => {
      setTrailPosition((prev) => ({
        x: prev.x + (position.x - prev.x) * 0.18,
        y: prev.y + (position.y - prev.y) * 0.18,
      }));
      frame = window.requestAnimationFrame(updateTrail);
    };
    frame = window.requestAnimationFrame(updateTrail);
    return () => window.cancelAnimationFrame(frame);
  }, [position.x, position.y]);

  return (
    <>
      <div
        className="cursor-trail"
        style={{ left: trailPosition.x, top: trailPosition.y }}
        aria-hidden="true"
      />
      <div
        className={`cursor-glow ${isActive ? "cursor-active" : ""}`}
        style={{ left: position.x, top: position.y }}
        aria-hidden="true"
      />
    </>
  );
}
