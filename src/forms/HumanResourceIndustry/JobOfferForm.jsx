import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Letter from "../../component/letter";
import Spinner from "react-bootstrap/Spinner";

const JobOfferForm = () => {
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    companyName: "",
    companyAddress: "",
    candidateName: "",
    candidateAddress: "",
    jobPosition: "",
    joiningDate: "",
    salary: "",
    additionalDetails: "",
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
          prompt: `generate a job offer letter from ${formData.companyName} to ${formData.candidateName} for the position of ${formData.jobPosition}. The joining date is ${formData.joiningDate}. The offered salary is $${formData.salary}. Additional details: "${formData.additionalDetails}".`,
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
      companyName: "",
      companyAddress: "",
      candidateName: "",
      candidateAddress: "",
      jobPosition: "",
      joiningDate: "",
      salary: "",
      additionalDetails: "",
    });
  };

  return (
    <>
      <div className="container form-container" style={{ marginTop: "40px" }}>
        <div className="row" style={{ margin: "40px" }}>
          <div className="col-md-12 text-center">
            <h3 style={{ marginBottom: "30px", marginTop: "30px" }}>
              Job Offer Letter Form
            </h3>
          </div>
          <div className="col-md-6 p-3">
            <label htmlFor="companyName" className="form-label">
              Company Name <span className="mandatory">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              id="companyName"
              placeholder="Enter company name"
              value={formData.companyName}
              onChange={handleChange}
            />
            <span id="companyName-error" className="error-message"></span>
          </div>
          <div className="col-md-6 p-3">
            <label htmlFor="companyAddress" className="form-label">
              Company Address <span className="mandatory">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              id="companyAddress"
              placeholder="Enter company address"
              value={formData.companyAddress}
              onChange={handleChange}
            />
            <span id="companyAddress-error" className="error-message"></span>
          </div>
          <div className="col-md-6 p-3">
            <label htmlFor="candidateName" className="form-label">
              Candidate's Name <span className="mandatory">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              id="candidateName"
              placeholder="Enter candidate's name"
              value={formData.candidateName}
              onChange={handleChange}
            />
            <span id="candidateName-error" className="error-message"></span>
          </div>
          <div className="col-md-6 p-3">
            <label htmlFor="candidateAddress" className="form-label">
              Candidate's Address <span className="mandatory">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              id="candidateAddress"
              placeholder="Enter candidate's address"
              value={formData.candidateAddress}
              onChange={handleChange}
            />
            <span id="candidateAddress-error" className="error-message"></span>
          </div>
          <div className="col-md-6 p-3">
            <label htmlFor="jobPosition" className="form-label">
              Job Position <span className="mandatory">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              id="jobPosition"
              placeholder="Enter job position"
              value={formData.jobPosition}
              onChange={handleChange}
            />
            <span id="jobPosition-error" className="error-message"></span>
          </div>
          <div className="col-md-6 p-3">
            <label htmlFor="joiningDate" className="form-label">
              Joining Date <span className="mandatory">*</span>
            </label>
            <input
              type="date"
              className="form-control"
              id="joiningDate"
              value={formData.joiningDate}
              onChange={handleChange}
            />
            <span id="joiningDate-error" className="error-message"></span>
          </div>
          <div className="col-md-6 p-3">
            <label htmlFor="salary" className="form-label">
              Salary <span className="mandatory">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              id="salary"
              placeholder="Enter offered salary"
              value={formData.salary}
              onChange={handleChange}
            />
            <span id="salary-error" className="error-message"></span>
          </div>
          <div className="col-md-6 p-3">
            <label htmlFor="additionalDetails" className="form-label">
              Additional Details
            </label>
            <textarea
              className="form-control"
              id="additionalDetails"
              placeholder="Enter additional details"
              value={formData.additionalDetails}
              onChange={handleChange}
            />
            <span id="additionalDetails-error" className="error-message"></span>
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

export default JobOfferForm;
