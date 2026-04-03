




import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function ApprovedRequests() {

  const [approvals, setApprovals] = useState([]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const res = await api.get("/approvals");
    setApprovals(res.data);
  };

  return (
    <div>

      <h2 className="manager-title-card">Approved Requests</h2>

      {approvals
        .filter(a => (a.decision || a.status) === "APPROVED")
        .map(a => (

          <div key={a.id} className="request-card">

            <p><b>Approval ID:</b> {a.id}</p>
            <p><b>Status:</b> {a.decision || a.status}</p>
            <p><b>Requisition ID:</b> {a.requisition?.id}</p>
            <p><b>Approved Date:</b> {a.approvedDate || "-"}</p>

          </div>

        ))}

      {approvals.filter(a => (a.decision || a.status) === "APPROVED").length === 0 && (
        <p>No approved requests found.</p>
      )}

    </div>
  );
}