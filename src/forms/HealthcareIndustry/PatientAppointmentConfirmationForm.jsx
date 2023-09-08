import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Letter from "../../component/letter";
import Spinner from 'react-bootstrap/Spinner';

const PatientAppointmentConfirmationForm = () => {
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    doctorName: "", 
    patientName: "",
    mobileNumber: "",
    email: "",
    dateTime: "",
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
          prompt: `generate an appointment letter that the doctor ${formData.doctorName} is giving to the patient. The doctor's name is ${formData.doctorName}, the patient's name is ${formData.patientName}, the patient's mobile number is ${formData.mobileNumber}, the patient's email is ${formData.email}, and the appointment date and time is ${formData.dateTime}.`,
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
      doctorName: "",
      patientName: "",
      mobileNumber: "",
      email: "",
      dateTime: "",
    });
  };

  return (
    <>
      <div className="container form-container" style={{ marginTop: "40px" }}>
        <div className="row" style={{ margin: "40px" }}>
          <div className="col-md-12 text-center">
            <h3 style={{ marginBottom: "30px", marginTop: "30px" }}>
              Patient Appointment Confirmation Form
            </h3>
          </div>
          <div className="col-md-6 p-3">
            <label htmlFor="doctorname" className="form-label">
              Doctor Name <span className="mandatory">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              id="doctorName"
              placeholder="Enter doctor's name"
              value={formData.doctorName}
              onChange={handleChange}
            />
            <span id="doctorname-error" className="error-message"></span>
          </div>
          <div className="col-md-6 p-3">
            <label htmlFor="patientname" className="form-label">
              Patient Name <span className="mandatory">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              id="patientName"
              placeholder="Enter patient's name"
              value={formData.patientName}
              onChange={handleChange}
            />
            <span id="patientname-error" className="error-message"></span>
          </div>
          <div className="col-md-6 p-3">
            <label htmlFor="mobilenumber" className="form-label">
             Doctor's Mobile Number <span className="mandatory">*</span>
            </label>
            <input
              type="tel"
              className="form-control"
              id="mobileNumber"
              placeholder="Enter your mobile number"
              value={formData.mobileNumber}
              onChange={handleChange}
            />
            <span id="mobilenumber-error" className="error-message"></span>
          </div>
          <div className="col-md-6 p-3">
            <label htmlFor="email" className="form-label">
              Doctor's Email <span className="mandatory">*</span>
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
            <label htmlFor="datetime" className="form-label">
              Date and Time <span className="mandatory">*</span>
            </label>
            <input
              type="datetime-local"
              className="form-control"
              id="dateTime"
              value={formData.dateTime}
              onChange={handleChange}
            />
            <span id="datetime-error" className="error-message"></span>
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
              {loading ?<Spinner animation="border" style={{ width: '1.3rem', height: '1.3rem' }}  /> : "Generate"}
            </button>
          </div>
        </div>
      </div>
      <div>     
      </div>      
        {output && (
          <Letter data={output} />
        )}
    </>
  );
};

export default PatientAppointmentConfirmationForm;
