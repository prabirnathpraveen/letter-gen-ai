import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Letter from "../../component/letter";
import Spinner from "react-bootstrap/Spinner";

const MedicalTestResultForm = () => {
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    patientName: "",
    dateOfBirth: "",
    gender: "",
    doctor: "",
    reasonForReferral: "",
    refferalDoctor:""
  });

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
    console.log(formData);
    console.log(JSON.stringify(process.env.REACT_APP_OPEN_AI_KEY));
    try {
      const response = await axios.post(
        "https://api.openai.com/v1/engines/text-davinci-003/completions",
        {
          prompt: `Generate a Medical Refferal Letter doctor to refferal doctor.
          Patient ${formData.patientName}
          Doctor Name: ${formData.doctor}
          Refferal Doctor Name: ${formData.refferalDoctor}
          Patient Name: ${formData.patientName}
          Gender: ${formData.gender}
          Date of Birth: ${formData.dateOfBirth}
          Reason for Referral: ${formData.reasonForReferral}
          Medical Test Result:
          Please include any necessary details and recommendations in the report in letter format that doctor to patient.`,
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
      patientName: "",
      dateOfBirth: "",
      gender: "",
      doctor: "",
      reasonForReferral: "",
    });
  };

  return (
    <>
      <div className="container form-container" style={{ marginTop: "40px" }}>
        <div className="row" style={{ margin: "40px" }}>
          <div className="col-md-12 text-center">
            <h3 style={{ marginBottom: "30px", marginTop: "30px" }}>
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
            <label htmlFor="dateOfBirth" className="form-label">
              Date of Birth <span className="mandatory">*</span>
            </label>
            <input
              type="date"
              className="form-control"
              id="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
            />
            <span id="dateOfBirth-error" className="error-message"></span>
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
            <label htmlFor="doctor" className="form-label">
              Doctor Name <span className="mandatory">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              id="doctor"
              placeholder="Enter referring doctor"
              value={formData.doctor}
              onChange={handleChange}
            />
            <span id="doctor-error" className="error-message"></span>
          </div>
          <div className="col-md-6 p-3">
            <label htmlFor="refferalDoctor" className="form-label">
              Refferal Doctor <span className="mandatory">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              id="refferalDoctor"
              placeholder="Enter referring doctor"
              value={formData.refferalDoctor}
              onChange={handleChange}
            />
            <span id="doctor-error" className="error-message"></span>
          </div>
          <div className="col-md-6 p-3">
            <label htmlFor="reasonForReferral" className="form-label">
              Reason for Referral <span className="mandatory">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              id="reasonForReferral"
              placeholder="Enter reason for referral"
              value={formData.reasonForReferral}
              onChange={handleChange}
            />
            <span id="reasonForReferral-error" className="error-message"></span>
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
              {loading ? <Spinner animation="border" /> : "Generate"}
            </button>
          </div>
        </div>
      </div>
      {output && <Letter data={output} />}
    </>
  );
};

export default MedicalTestResultForm;
