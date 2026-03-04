import { useMemo, useRef, useState } from "react";
import { Wheel } from "./wheel";
import type { WheelHandle } from "./wheel";

function Roulette() {
  const applicants = [
    { firstName: "Davina", lastName: "Pinto" },
    { firstName: "Alex", lastName: "Chen" },
    { firstName: "Priya", lastName: "Kumar" },
  ];

  const labels = useMemo(
    () => applicants.map((a) => `${a.firstName} ${a.lastName}`),
    [applicants],
  );

  const wheelRef = useRef<WheelHandle>(null);
  const [winner, setWinner] = useState<string | null>(null);

  function spin() {
    const index = Math.floor(Math.random() * labels.length);
    wheelRef.current?.spin();
  }
  return (
    <div>
      <div style={{ padding: 40 }}>
        <Wheel
          ref={wheelRef}
          labels={labels}
          onSpinEnd={(i) => setWinner(labels[i])}
        />         

        {winner && <h2>Winner: {winner}</h2>}
      </div>
    </div>
  );
}

export default Roulette;
