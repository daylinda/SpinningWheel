import {
  forwardRef,
  useImperativeHandle,
  useMemo,
  useRef,
} from "react";
import chroma from "chroma-js";
import "./css/wheel.css";

export type WheelHandle = {
  spin: () => void;
  isSpinning: () => boolean;
};

type Props = {
  labels: string[];
  durationMs?: number;
  onSpinEnd?: (winnerIndex: number) => void;
};

export const Wheel = forwardRef<WheelHandle, Props>(function Wheel(
  { labels, durationMs = 4200, onSpinEnd },
  ref
) {
  const items = useMemo(
    () => labels.map((s) => s.trim()).filter(Boolean),
    [labels]
  );

  const wheelRef = useRef<HTMLDivElement | null>(null);
  const rotationRef = useRef(0);
  const spinningRef = useRef(false);

  const segmentAngle = items.length ? 360 / items.length : 0;

  // 🎨 Generate colour palette dynamically
  const colours = useMemo(() => {
    if (!items.length) return [];

    return chroma
      .scale("Spectral")   // try also: "Set3", "Paired", "Viridis"
      .mode("lch")
      .colors(items.length);
  }, [items.length]);

  const background = useMemo(() => {
    if (!items.length) return "#222";

    const stops: string[] = [];

    for (let i = 0; i < items.length; i++) {
      const start = i * segmentAngle;
      const end = (i + 1) * segmentAngle;
      stops.push(`${colours[i]} ${start}deg ${end}deg`);
    }

    return `conic-gradient(from -90deg, ${stops.join(", ")})`;
  }, [items.length, segmentAngle, colours]);

  function getWinnerIndex(finalRotation: number) {
    const norm = ((finalRotation % 360) + 360) % 360;
    const pointerAngle = (360 - norm) % 360;
    return Math.floor(pointerAngle / segmentAngle);
  }

  function spin() {
    if (!items.length || spinningRef.current) return;

    const el = wheelRef.current;
    if (!el) return;

    spinningRef.current = true;

    const randomIndex = Math.floor(Math.random() * items.length);

    const sliceCenter =
      randomIndex * segmentAngle + segmentAngle / 2;

    const targetMod = (360 - sliceCenter) % 360;
    const current = rotationRef.current;
    const currentMod = ((current % 360) + 360) % 360;

    const fullTurns = 6 + Math.floor(Math.random() * 4);
    const delta = (targetMod - currentMod + 360) % 360;

    const target = current + fullTurns * 360 + delta;
    rotationRef.current = target;

    el.style.transition = `transform ${durationMs}ms cubic-bezier(0.12,0,0,1)`;
    el.style.transform = `rotate(${target}deg)`;

    const onDone = () => {
      el.removeEventListener("transitionend", onDone);
      spinningRef.current = false;
      onSpinEnd?.(getWinnerIndex(target));
    };

    el.addEventListener("transitionend", onDone);
  }

  useImperativeHandle(ref, () => ({
    spin,
    isSpinning: () => spinningRef.current,
  }));

  return (
    <div className="wheel-container">
      <div className="wheel-pointer" />

      <div
        ref={wheelRef}
        className="wheel"
        style={{ background }}
      >
        {items.map((label, i) => {
          const angle = i * segmentAngle + segmentAngle / 2;

          return (
            <div
              key={`${label}-${i}`}
              className="wheel-label"
              style={{
                transform: `rotate(${angle}deg) translate(0, -140px) rotate(90deg)`,
              }}
            >
              {/* {label} */}
            </div>
          );
        })}

        <button className="wheel-centre" onClick={spin}>
          SPIN
        </button>
      </div>
    </div>
  );
});