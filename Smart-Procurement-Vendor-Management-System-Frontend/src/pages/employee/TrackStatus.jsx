

import { useEffect, useState } from "react";
import api from "../../api/axios";
import EmployeeLayout from "./EmployeeLayout";

export default function TrackStatus(){

const [reqs,setReqs] = useState([]);

const [id,setId] = useState("");
const [approval,setApproval] = useState([]);
const [po,setPo] = useState([]);
const [delivery,setDelivery] = useState([]);
const [invoices,setInvoices] = useState([]);


// load requisitions table
useEffect(()=>{
load();
},[]);

const load = async()=>{
try{
const res = await api.get("/requisitions");
setReqs(res.data);
}catch(err){
console.error(err);
}
};


// // track requisition
// const track = async()=>{

// if(!id){
// alert("Enter Requisition ID");
// return;
// }


// // APPROVAL
// try{
// const approvalRes = await api.get(`/approvals/${id}`);
// setApproval(approvalRes.data ? [approvalRes.data] : []);
// }catch{
// setApproval([]);
// }


// // PURCHASE ORDERS
// try{
// const poRes = await api.get("/po");
// setPo(poRes.data || []);
// }catch{
// setPo([]);
// }


// // DELIVERIES
// try{
// const delRes = await api.get("/api/deliveries");
// setDelivery(delRes.data || []);
// }catch{
// setDelivery([]);
// }

// };

const track = async()=>{

if(!id){
alert("Enter Requisition ID");
return;
}

// APPROVAL
try{
const approvalRes = await api.get(`/approvals/${id}`);
setApproval(approvalRes.data ? [approvalRes.data] : []);
}catch{
setApproval([]);
}

// PURCHASE ORDER
try{
const poRes = await api.get(`/po/requisition/${id}`);
setPo(poRes.data || []);
}catch{
setPo([]);
}

// DELIVERY
try{
const delRes = await api.get(`/api/deliveries/requisition/${id}`);
setDelivery(delRes.data || []);
}catch{
setDelivery([]);
}

// INVOICES (linked via PO → requisition)
try{
const invRes = await api.get(`/invoice/requisition/${id}`);
setInvoices(invRes.data || []);
}catch{
setInvoices([]);
}

};

return(

<EmployeeLayout>

<div className="track-status-layout">

{/* LEFT SIDE TABLE */}

<div className="track-left-panel">

<h2 className="employee-title-card track-page-heading">Track Procurement Status</h2>

<div className="track-table-card">
<table className="track-table">

<thead>
<tr>
<th>Requisition ID</th>
<th>Status</th>
</tr>
</thead>

<tbody>

{reqs.map(r=>(

<tr key={r.id}>
<td>{r.id}</td>
<td>{r.status}</td>
</tr>

))}

</tbody>

</table>
</div>

</div>



{/* RIGHT SIDE TRACK PANEL */}

<div className="track-right-panel">

<h2 className="employee-title-card">Track Status</h2>

<div className="track-search-row">
<input
className="employee-input"
placeholder="Requisition Id"
value={id}
onChange={e=>setId(e.target.value)}
/>

<button className="employee-submit-btn" onClick={track}>
Track
</button>
</div>


<div className="track-info-card">
<h3>Approvals</h3>

<ul className="track-list">
{approval.length>0 ? (
approval.map((a,index)=>(
<li key={a.id ?? index}>
Manager : {a.managerName ?? "—"} | Decision : {a.decision ?? "—"}
</li>
))
):(
<li>No approvals</li>
)}
</ul>
</div>


<div className="track-info-card">
<h3>Purchase Orders</h3>

<ul className="track-list">
{po.length>0 ? (
po.map((p,index)=>(
<li key={p.id ?? index}>
PO #{p.id}
</li>
))
):(
<li>No purchase orders</li>
)}
</ul>
</div>


<div className="track-info-card">
<h3>Invoices</h3>

<ul className="track-list">
{invoices.length>0 ? (
invoices.map((inv,index)=>(
<li key={inv.id ?? index}>
#{inv.id} — {inv.invoiceNumber} | Amount : {inv.amount} | Status : {inv.status ?? "—"}
</li>
))
):(
<li>No invoices</li>
)}
</ul>
</div>


<div className="track-info-card">
<h3>Deliveries</h3>

<ul className="track-list">
{delivery.length>0 ? (
delivery.map((d,index)=>(
<li key={d.id ?? index}>
Tracking : {d.trackingNumber} | Status : {d.deliveryStatus}
</li>
))
):(
<li>No deliveries</li>
)}
</ul>
</div>

</div>

</div>

</EmployeeLayout>

);
}