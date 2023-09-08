import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Letter from "../../component/letter";
import Spinner from "react-bootstrap/Spinner";

const EmployeePromotionForm = () => {
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    employeeName: "",
    employeeID: "",
    currentRole: "",
    newRole: "",
    promotionDate: "",
    supervisorName: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(formData);

    try {
      const response = await axios.post(
        "https://api.openai.com/v1/engines/text-davinci-003/completions",
        {
          prompt: `generate an employee promotion letter for ${formData.employeeName} (Employee ID: ${formData.employeeID}). ${formData.employeeName} is currently in the role of ${formData.currentRole} and is being promoted to the role of ${formData.newRole} effective ${formData.promotionDate}. The promotion decision was made by ${formData.supervisorName}.`,
          max_tokens: 350,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.REACT_APP_OPEN_AI_KEY}`,
          },
        }
      );
      console.log(response);
      setOutput(response.data.choices[0].text);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      employeeName: "",
      employeeID: "",
      currentRole: "",
      newRole: "",
      promotionDate: "",
      supervisorName: "",
    });
  };

  return (
    <>
      <div className="container form-container" style={{ marginTop: "40px" }}>
        <div className="row" style={{ margin: "40px" }}>
          <div className="col-md-12 text-center">
            <h3 style={{ marginBottom: "30px", marginTop: "30px" }}>
              Employee Promotion Letter Form
            </h3>
          </div>
          <div className="col-md-6 p-3">
            <label htmlFor="employeeName" className="form-label">
              Employee's Name <span className="mandatory">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              id="employeeName"
              placeholder="Enter employee's name"
              value={formData.employeeName}
              onChange={handleChange}
            />
            <span id="employeeName-error" className="error-message"></span>
          </div>
          <div className="col-md-6 p-3">
            <label htmlFor="employeeID" className="form-label">
              Employee ID <span className="mandatory">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              id="employeeID"
              placeholder="Enter employee ID"
              value={formData.employeeID}
              onChange={handleChange}
            />
            <span id="employeeID-error" className="error-message"></span>
          </div>
          <div className="col-md-6 p-3">
            <label htmlFor="currentRole" className="form-label">
              Current Role <span className="mandatory">*</span>
            </label>

            <input
              type="text"
              className="form-control"
              id="currentRole"
              placeholder="Enter current role"
              value={formData.currentRole}
              onChange={handleChange}
            />

            <span id="currentRole-error" className="error-message"></span>
          </div>

          <div className="col-md-6 p-3">
            <label htmlFor="newRole" className="form-label">
              New Role <span className="mandatory">*</span>
            </label>

            <input
              type="text"
              className="form-control"
              id="newRole"
              placeholder="Enter new role"
              value={formData.newRole}
              onChange={handleChange}
            />

            <span id="newRole-error" className="error-message"></span>
          </div>

          <div className="col-md-6 p-3">
            <label htmlFor="promotionDate" className="form-label">
              Promotion Date <span className="mandatory">*</span>
            </label>

            <input
              type="date"
              className="form-control"
              id="promotionDate"
              value={formData.promotionDate}
              onChange={handleChange}
            />

            <span id="promotionDate-error" className="error-message"></span>
          </div>

          <div className="col-md-6 p-3">
            <label htmlFor="supervisorName" className="form-label">
              Supervisor's Name <span className="mandatory">*</span>
            </label>

            <input
              type="text"
              className="form-control"
              id="supervisorName"
              placeholder="Enter supervisor's name"
              value={formData.supervisorName}
              onChange={handleChange}
            />

            <span id="supervisorName-error" className="error-message"></span>
          </div>

          <div className="col-md-12 p-3 d-flex justify-content-center">
            <button
              type="reset"
              className="btn btn-secondary"
              style={{ width: "100px", marginRight: "10px" }}
              onClick={handleReset}
            >
              Reset
            </button>

            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: "100px" }}
              onClick={handleSubmit}
            >
              {loading ? (
                <Spinner
                  animation="border"
                  style={{ width: "1.3rem", height: "1.3rem" }}
                />
              ) : (
                "Generate"
              )}
            </button>
          </div>
        </div>
      </div>

      <div>{output && <Letter data={output} />}</div>
    </>
  );
};

export default EmployeePromotionForm;
