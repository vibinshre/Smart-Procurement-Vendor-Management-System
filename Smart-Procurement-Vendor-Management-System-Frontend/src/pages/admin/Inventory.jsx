

import React,{useEffect,useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/axios";
import "./admindashboard.css";
import "./master.css";
import "./Inventory.css";

export default function Inventory(){
const navigate = useNavigate();

const [inventory,setInventory] = useState([]);
const [items,setItems] = useState([]);
const [search,setSearch] = useState("");

const [form,setForm] = useState({
quantityAvailable:"",
warehouseLocation:"",
itemId:""
});

const [editId,setEditId] = useState(null);

useEffect(()=>{
load();
},[]);

const load = async()=>{
const inv = await api.get("/inventory");
const item = await api.get("/items");

setInventory(inv.data);
setItems(item.data);
}

const save = async()=>{

if(editId){
await api.put(`/inventory/${editId}`,form);
setEditId(null);
}else{

await api.post("/inventory",{
quantityAvailable:form.quantityAvailable,
warehouseLocation:form.warehouseLocation,
item:{id:form.itemId}
});

}

load();
}

const deleteInventory = async(id)=>{
await api.delete(`/inventory/${id}`);
load();
}

const getById = async(id)=>{
const res = await api.get(`/inventory/${id}`);
setForm({
quantityAvailable:res.data.quantityAvailable,
warehouseLocation:res.data.warehouseLocation,
itemId:res.data.item.id
});
setEditId(id);
}

const logout = () => {
localStorage.clear();
navigate('/');
};

return(

<div className="dashboard-container">

<div className="sidebar">
<h2>Admin Panel</h2>
<hr />

<h3>Master</h3>
<ul>
<li>
<Link to="/master/roles">Roles</Link>
</li>
<li>
<Link to="/master/departments">Departments</Link>
</li>
<li>
<Link to="/master/users">Users</Link>
</li>
</ul>

<h3>Procurement</h3>
<ul>
<li>
<Link to="/admin/items">Items</Link>
</li>
<li>
<Link to="/admin/PurchaseOrder">Purchase Order</Link>
</li>
<li>
<Link to="/admin/Inventory">Inventory</Link>
</li>
<li>
<Link to="/admin/reports">Reports</Link>
</li>
<li>
<Link to="/admin/VendorApproval">Vendor Request Approval</Link>
</li>
</ul>

<button className="logout-btn" onClick={logout}>
Logout
</button>
</div>

<div className="main-content">
<div className="container inventory-page">

<h2 className="inventory-title-card">Inventory</h2>

<div className="inventory-controls-card">

<input
className="inventory-search"
placeholder="Search"
onChange={e=>setSearch(e.target.value)}
/>

<form className="inventory-form">

<select
value={form.itemId}
onChange={e=>setForm({...form,itemId:e.target.value})}
>

<option>Selec Item</option>

{items.map(i=>(
<option key={i.id} value={i.id}>
{i.itemName}
</option>
))}

</select>

<input
placeholder="Quantity"
value={form.quantityAvailable}
onChange={e=>setForm({...form,quantityAvailable:e.target.value})}
/>

<input
placeholder="Warehouse"
value={form.warehouseLocation}
onChange={e=>setForm({...form,warehouseLocation:e.target.value})}
/>

<button type="button" onClick={save}>
{editId ? "Update":"Add"}
</button>

</form>

</div>

<div className="inventory-table-card">

<table className="inventory-table">

<thead>
<tr>
<th>ID</th>
<th>Item</th>
<th>Qty</th>
<th>Action</th>
</tr>
</thead>

<tbody>

{inventory.map(inv=>(

<tr key={inv.id}>

<td>{inv.id}</td>
<td>{inv.item.itemName}</td>
<td>{inv.quantityAvailable}</td>

<td>

<button
className="action-btn"
onClick={()=>getById(inv.id)}
>
Edit
</button>

<button
className="delete-btn"
onClick={()=>deleteInventory(inv.id)}
>
Delete
</button>

</td>

</tr>

))}

</tbody>

</table>

</div>

</div>

</div>

</div>

);
}