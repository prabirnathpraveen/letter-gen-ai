import React, { useState,useRef,useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Letter from "../../component/letter";
import Spinner from "react-bootstrap/Spinner";

const AdmissionAcceptanceForm = () => {
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    studentName: "",
    admissionDate: "",
    institutionName: "",
    applicationID: "",
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
    console.log(formData);

    try {
      const response = await axios.post(
        "https://api.openai.com/v1/engines/text-davinci-003/completions",
        {
          prompt: `generate a letter that the ${formData.institutionName} has accepted the admission of ${formData.studentName} for the academic year ${formData.academicYear}. Application ID: ${formData.applicationID}.`,

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
      studentName: "",
      academicYear: "",
      institutionName: "",
      applicationID: "",
    });
  };

  return (
    <>
      <div className="container form-container" style={{ marginTop: "40px" }}>
        <div className="row" style={{ margin: "40px" }}>
          <div className="col-md-12 text-center">
            <h3 style={{ marginBottom: "30px", marginTop: "30px" }}>
              Admission Acceptance Letter Form
            </h3>
          </div>
          <div className="col-md-6 p-3">
            <label htmlFor="studentName" className="form-label">
              Student's Name <span className="mandatory">*</span>
            </label>
            <input
              type="year"
              className="form-control"
              id="studentName"
              placeholder="Enter student's name"
              value={formData.studentName}
              onChange={handleChange}
            />
            <span id="studentName-error" className="error-message"></span>
          </div>

          <div className="col-md-6 p-3">
            <label htmlFor="academicYear" className="form-label">
              Academic Year <span className="mandatory">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              id="academicYear"
              placeholder="Enter academic year"
              value={formData.academicYear}
              onChange={handleChange}
            />
            <span id="academicYear-error" className="error-message"></span>
          </div>

          <div className="col-md-6 p-3">
            <label htmlFor="institutionName" className="form-label">
              Institution Name <span className="mandatory">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              id="institutionName"
              placeholder="Enter institution name"
              value={formData.institutionName}
              onChange={handleChange}
            />
            <span id="institutionName-error" className="error-message"></span>
          </div>
          <div className="col-md-6 p-3">
            <label htmlFor="applicationID" className="form-label">
              Application ID <span className="mandatory">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              id="applicationID"
              placeholder="Enter application ID"
              value={formData.applicationID}
              onChange={handleChange}
            />
            <span id="applicationID-error" className="error-message"></span>
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
                <Spinner animation="border" className="spinner" />
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

export default AdmissionAcceptanceForm;
