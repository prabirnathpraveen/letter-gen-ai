import React, { useState,useRef,useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Letter from "../../component/letter";
import Spinner from "react-bootstrap/Spinner";

const CustomerComplaintResolutionForm = () => {
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    complaintDate: "",
    complaintDescription: "",
    resolutionDetails: "",
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
          prompt: `generate a customer complaint resolution letter for ${formData.customerName} (Customer Email: ${formData.customerEmail}). The customer filed a complaint on ${formData.complaintDate} with the following description: "${formData.complaintDescription}". Here are the resolution details: "${formData.resolutionDetails}".`,
          max_tokens: 350,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.REACT_APP_OPEN_AI_KEY}`,
          },
        }
      );
      setOutput(response.data.choices[0].text);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      customerName: "",
      customerEmail: "",
      complaintDate: "",
      complaintDescription: "",
      resolutionDetails: "",
    });
  };
  return (
    <>
      <div className="container form-container" style={{ marginTop: "40px" }}>
        <div className="row" style={{ margin: "40px" }}>
          <div className="col-md-12 text-center">
            <h3 style={{ marginBottom: "30px", marginTop: "30px" }}>
              Customer Complaint Resolution Letter Form
            </h3>
          </div>
          <div className="col-md-6 p-3">
            <label htmlFor="customerName" className="form-label">
              Customer's Name <span className="mandatory">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              id="customerName"
              placeholder="Enter customer's name"
              value={formData.customerName}
              onChange={handleChange}
            />
            <span id="customerName-error" className="error-message"></span>
          </div>
          <div className="col-md-6 p-3">
            <label htmlFor="customerEmail" className="form-label">
              Customer's Email <span className="mandatory">*</span>
            </label>
            <input
              type="email"
              className="form-control"
              id="customerEmail"
              placeholder="Enter customer's email"
              value={formData.customerEmail}
              onChange={handleChange}
            />
            <span id="customerEmail-error" className="error-message"></span>
          </div>
          <div className="col-md-6 p-3">
            <label htmlFor="complaintDate" className="form-label">
              Complaint Date <span className="mandatory">*</span>
            </label>
            <input
              type="date"
              className="form-control"
              id="complaintDate"
              value={formData.complaintDate}
              onChange={handleChange}
            />
            <span id="complaintDate-error" className="error-message"></span>
          </div>
          <div className="col-md-6 p-3">
            <label htmlFor="complaintDescription" className="form-label">
              Complaint Description <span className="mandatory">*</span>
            </label>
            <textarea
              className="form-control"
              id="complaintDescription"
              placeholder="Enter complaint description"
              value={formData.complaintDescription}
              onChange={handleChange}
            />
            <span
              id="complaintDescription-error"
              className="error-message"
            ></span>
          </div>

          <div className="col-md-12 p-3">
            <label htmlFor="resolutionDetails" className="form-label">
              Resolution Details <span className="mandatory">*</span>
            </label>

            <textarea
              className="form-control"
              id="resolutionDetails"
              placeholder="Enter resolution details"
              value={formData.resolutionDetails}
              onChange={handleChange}
            />

            <span id="resolutionDetails-error" className="error-message"></span>
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

export default CustomerComplaintResolutionForm;
