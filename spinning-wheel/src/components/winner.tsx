import type { Applicant } from "../api/applicants.api";

export function Winner({winner}: {winner?: Applicant | null}) {
    
    return(
        
        <div className="container">
            <h1>Winner</h1>
            <h2>Congratulations!!</h2>
            <p>{winner ? `${winner.firstName} ${winner.lastName}` : "Spin the wheel to find out!"}</p>
            <p>{winner?.email && <span>Email: {winner.email}</span>}</p>
            <p>{winner?.phone && <span>Phone: {winner.phone}</span>}</p>
            <p>{winner?.submissionId && <span>Submitted ID: {winner.submissionId}</span>}</p>
            
        
        </div>
    );
}