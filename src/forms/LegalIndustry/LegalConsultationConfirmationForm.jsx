import React, { useState,useRef,useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Letter from "../../component/letter";
import Spinner from 'react-bootstrap/Spinner';

const LegalConsultationConfirmationForm = () => {
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    clientName: "",
    consultationDate: "",
    consultationTime: "",
    lawyerName: "",
    confirmationMessage: "",
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
          prompt: `generate a legal consultation confirmation letter for the client ${formData.clientName}. The consultation is scheduled for ${formData.consultationDate} at ${formData.consultationTime} with lawyer ${formData.lawyerName}. The confirmation message is: "${formData.confirmationMessage}".`,
          max_tokens: 350,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization:
              `Bearer ${process.env.REACT_APP_OPEN_AI_KEY}`,
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
      clientName: "",
      consultationDate: "",
      consultationTime: "",
      lawyerName: "",
      confirmationMessage: "",
    });
  };
  return (
    <>
      <div className="container form-container" style={{ marginTop: "40px" }}>
        <div className="row" style={{ margin: "40px" }}>
          <div className="col-md-12 text-center">
            <h3 style={{ marginBottom: "30px", marginTop: "30px" }}>
              Legal Consultation Confirmation Letter Form
            </h3>
          </div>
          <div className="col-md-6 p-3">
            <label htmlFor="clientName" className="form-label">
              Client Name <span className="mandatory">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              id="clientName"
              placeholder="Enter client's name"
              value={formData.clientName}
              onChange={handleChange}
            />
            <span id="clientName-error" className="error-message"></span>
          </div>
          <div className="col-md-6 p-3">
            <label htmlFor="consultationDate" className="form-label">
              Consultation Date <span className="mandatory">*</span>
            </label>
            <input
              type="date"
              className="form-control"
              id="consultationDate"
              value={formData.consultationDate}
              onChange={handleChange}
            />
            <span id="consultationDate-error" className="error-message"></span>
          </div>
          <div className="col-md-6 p-3">
            <label htmlFor="consultationTime" className="form-label">
              Consultation Time <span className="mandatory">*</span>
            </label>
            <input
              type="time"
              className="form-control"
              id="consultationTime"
              value={formData.consultationTime}
              onChange={handleChange}
            />
            <span id="consultationTime-error" className="error-message"></span>
          </div>
          <div className="col-md-6 p-3">
            <label htmlFor="lawyerName" className="form-label">
              Lawyer Name <span className="mandatory">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              id="lawyerName"
              placeholder="Enter lawyer's name"
              value={formData.lawyerName}
              onChange={handleChange}
            />
            <span id="lawyerName-error" className="error-message"></span>
          </div>
          <div className="col-md-6 p-3">
            <label htmlFor="confirmationMessage" className="form-label">
              Confirmation Message <span className="mandatory">*</span>
            </label>
            <textarea
              className="form-control"
              id="confirmationMessage"
              placeholder="Enter confirmation message"
              value={formData.confirmationMessage}
              onChange={handleChange}
            />
            <span id="confirmationMessage-error" className="error-message"></span>
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
              {loading ? <Spinner animation="border" className="spinner" /> : "Generate"}
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

export default LegalConsultationConfirmationForm;
