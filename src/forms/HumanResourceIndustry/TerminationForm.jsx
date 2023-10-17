import React, { useState,useRef,useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import axios from "axios";

import Letter from "../../component/letter";

import Spinner from "react-bootstrap/Spinner";

const TerminationForm = () => {
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    employeeName: "",
    employeeID: "",
    terminationDate: "",
    terminationReason: "",
    supervisorName: "",
  });
  const letterRef = useRef(null);
  useEffect(() => {
    if (output) {
      letterRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [output]);
  
  const handleChange = (e) => {
    const { id, value } = e.target;

    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const response = await axios.post(
        "https://api.openai.com/v1/engines/text-davinci-003/completions",
        {
          prompt: `generate an employee termination letter for ${formData.employeeName} (Employee ID: ${formData.employeeID}). The termination date is ${formData.terminationDate}, and the reason for termination is "${formData.terminationReason}". The decision was made by ${formData.supervisorName}.`,

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

      terminationDate: "",

      terminationReason: "",

      supervisorName: "",
    });
  };

  return (
    <>
      <div className="container form-container" style={{ marginTop: "40px" }}>
        <div className="row" style={{ margin: "40px" }}>
          <div className="col-md-12 text-center">
            <h3 style={{ marginBottom: "30px", marginTop: "30px" }}>
              Employee Termination Letter Form
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
            <label htmlFor="terminationDate" className="form-label">
              Termination Date <span className="mandatory">*</span>
            </label>

            <input
              type="date"
              className="form-control"
              id="terminationDate"
              value={formData.terminationDate}
              onChange={handleChange}
            />

            <span id="terminationDate-error" className="error-message"></span>
          </div>

          <div className="col-md-6 p-3">
            <label htmlFor="terminationReason" className="form-label">
              Termination Reason <span className="mandatory">*</span>
            </label>

            <textarea
              className="form-control"
              id="terminationReason"
              placeholder="Enter termination reason"
              value={formData.terminationReason}
              onChange={handleChange}
            />

            <span id="terminationReason-error" className="error-message"></span>
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
                  className="spinner"
                />
              ) : (
                "Generate"
              )}
            </button>
          </div>
        </div>
      </div>

      <div ref={letterRef} id="letter-component">
        {output && <Letter data={output} />}
      </div>
    </>
  );
};

export default TerminationForm;
