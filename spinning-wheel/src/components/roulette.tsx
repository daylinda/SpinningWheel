import { useMemo, useState } from "react";
import { Wheel } from "./wheel";
// import type { WheelHandle } from "./wheel";
import {Winner} from "./winner";

import { useApplicants } from "../hooks/useApplicants";

function Roulette() {
  
  const { applicants, loading, error } = useApplicants();
  const [winner, setWinner] = useState<string | null>(null);

  const labels = useMemo(
    () => applicants.map(a => `${a.submissionId}`.trim()),
    [applicants]
  );


  const getWinnerDetails = (winnerIndex: string|null) => {
    if (!winnerIndex) return null;
    const winnerApplicant = applicants.find(a => `${a.submissionId}`.trim() === winnerIndex);
    return winnerApplicant || null;
  };

  if (loading) return <div style={{ padding: 24 }}>Loading applicants…</div>;
  if (error) return <div style={{ padding: 24 }}>Error: {error}</div>;
  if (!labels.length) return <div style={{ padding: 24 }}>No applicants found.</div>;

  return (
    <div style={{ padding: 24 }}>
      <Wheel
        labels={labels}
        onSpinEnd={(i) => setWinner(labels[i] ?? null)}
      />

      <Winner winner={getWinnerDetails(winner)} />

      {/* {winner && <h2>Winner: {winner}</h2>} */}
    </div>
  );

}

export default Roulette;
