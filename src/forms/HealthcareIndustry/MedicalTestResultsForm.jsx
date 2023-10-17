import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Letter from "../../component/letter";
import Spinner from 'react-bootstrap/Spinner';
import { useRef } from "react";
import { useEffect } from "react";

const MedicalTestResultForm = () => {
  
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    patientName: "",
    gender: "",
    referenceNumber: "",
    email: "",
    mobileNumber: "",
    dob: "",
    patientTestResult: "", 
  });

  const letterRef = useRef(null);
  useEffect(() => {
    if (output) {
      letterRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [output]);

  const handleChange = (e) => {
    const { id, value, type, name } = e.target;
    if (type === "radio") {
      if (value === formData[name]) {
        setFormData({ ...formData, [name]: "" });
      } else {
        setFormData({ ...formData, [name]: value });
      }
    } else {
      setFormData({ ...formData, [id]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "https://api.openai.com/v1/engines/text-davinci-003/completions",
        {
          prompt: `Generate a Medical Test Result Report for Patient ${formData.patientName}:
          Doctor Name: "Dr. Prabirnath"
          Patient Name: ${formData.patientName}
          Gender: ${formData.gender}
          Reference Number: ${formData.referenceNumber}
          Email: ${formData.email}
          Mobile Number: ${formData.mobileNumber}
          Date of Birth: ${formData.dob}
          Medical Test Result:
          ${formData.patientTestResult}
          Please include any necessary details and recommendations in the report in letter format that doctor to patient.`,
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
    }finally{
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      patientName: "",
      gender: "",
      referenceNumber: "",
      email: "",
      mobileNumber: "",
      dob: "",
      patientTestResult: "", 
    });
  };

  return (
    <>
      <div className="container form-container" style={{ marginTop: "40px" }}>
        <div className="row" style={{ margin: "40px" }}>
          <div className="col-md-12 text-center">
          <h3 style={{ marginBottom: "30px" , marginTop:"30px" }}>
              Medical Test Result Form
            </h3>
          </div>
          <div className="col-md-6 p-3">
            <label htmlFor="patientName" className="form-label">
              Patient Name <span className="mandatory">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              id="patientName"
              placeholder="Enter patient name"
              value={formData.patientName}
              onChange={handleChange}
            />
            <span id="patientName-error" className="error-message"></span>
          </div>
          <div className="col-md-6 p-3">
            <label className="form-label">Gender</label>
            <div className="form-check">
              <input
                type="radio"
                className="form-check-input"
                id="male"
                name="gender"
                value="male"
                checked={formData.gender === "male"}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="male">
                Male
              </label>
            </div>
            <div className="form-check">
              <input
                type="radio"
                className="form-check-input"
                id="female"
                name="gender"
                value="female"
                checked={formData.gender === "female"}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="female">
                Female
              </label>
            </div>
          </div>
          <div className="col-md-6 p-3">
            <label htmlFor="referenceNumber" className="form-label">
              Reference Number <span className="mandatory">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              id="referenceNumber"
              placeholder="Enter reference number"
              value={formData.referenceNumber}
              onChange={handleChange}
            />
            <span id="referenceNumber-error" className="error-message"></span>
          </div>
          <div className="col-md-6 p-3">
            <label htmlFor="email" className="form-label">
              Email <span className="mandatory">*</span>
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
            <span id="email-error" className="error-message"></span>
          </div>
          <div className="col-md-6 p-3">
            <label htmlFor="mobileNumber" className="form-label">
              Mobile Number <span className="mandatory">*</span>
            </label>
            <input
              type="tel"
              className="form-control"
              id="mobileNumber"
              placeholder="Enter your mobile number"
              value={formData.mobileNumber}
              onChange={handleChange}
            />
            <span id="mobileNumber-error" className="error-message"></span>
          </div>
          <div className="col-md-6 p-3">
            <label htmlFor="dob" className="form-label">
              Date of Birth <span className="mandatory">*</span>
            </label>
            <input
              type="date"
              className="form-control"
              id="dob"
              value={formData.dob}
              onChange={handleChange}
            />
            <span id="dob-error" className="error-message"></span>
          </div>
          <div className="col-md-12 p-3">
            <label htmlFor="patientTestResult" className="form-label">
              Patient Test Result
            </label>
            <textarea
              className="form-control"
              id="patientTestResult"
              rows="4"
              placeholder="Enter patient test result"
              value={formData.patientTestResult}
              onChange={handleChange}
            ></textarea>
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
              {loading ?<Spinner animation="border" className="spinner" /> : "Generate"}
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

export default MedicalTestResultForm;
