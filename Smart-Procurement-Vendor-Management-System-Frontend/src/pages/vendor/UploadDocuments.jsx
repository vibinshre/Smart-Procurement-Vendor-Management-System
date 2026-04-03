



import { useState } from "react";
import { uploadDocument } from "../../api/vendorService";

export default function UploadDocuments() {

  const [form, setForm] = useState({
    documentName: "",
    documentNumber: "",
    documentType: ""
  });

  const vendorId = localStorage.getItem("vendorId");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {

    uploadDocument({
      ...form,
      vendorId: vendorId
    })
      .then(() => alert("Document Uploaded"))
      .catch(err => console.error(err));
  };

  return (
    <div className="vendor-page-section">
      <h2 className="vendor-title-card">Upload Documents</h2>

      <div className="vendor-form-card">
        <form
          className="vendor-inline-form"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <input
            className="vendor-input"
            name="documentName"
            placeholder="Document Name"
            onChange={handleChange}
          />

          <input
            className="vendor-input"
            name="documentNumber"
            placeholder="Document Number"
            onChange={handleChange}
          />

          <input
            className="vendor-input"
            name="documentType"
            placeholder="Document Type"
            onChange={handleChange}
          />

          <button className="vendor-submit-btn" type="submit">
            Upload
          </button>
        </form>
      </div>
    </div>
  );
}