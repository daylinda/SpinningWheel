export type Applicant = {
  firstName: string;
  lastName: string;
  submissionDate?: string;
  email?: string;
  phone?: string;
  submissionId?: string;
};

export async function fetchApplicants(): Promise<Applicant[]> {
  const res = await fetch("/api/applicants");
  if (!res.ok) throw new Error(`Failed to fetch applicants: ${res.status}`);

  const rows: any[] = await res.json();
//   const rows = await res.json();
console.log("API RESPONSE:", rows);

  return rows.map((r) => ({
    firstName: String(r["Name - First Name"] ?? "").trim(),
    lastName: String(r["Name - Last Name"] ?? "").trim(),
    email: String(r["Email"] ?? "").trim(),
    phone: String(r["Phone Number"] ?? "").trim(),
    submissionDate: String(r["Submission Date"] ?? "").trim(),
    submissionId: String(r["Submission ID"] ?? "").trim(),

  })).filter(a => a.firstName || a.lastName);


}