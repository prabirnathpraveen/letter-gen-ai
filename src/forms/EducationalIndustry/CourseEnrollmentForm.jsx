import React, { useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";

import axios from "axios";

import Letter from "../../component/letter";

import Spinner from "react-bootstrap/Spinner";

const CourseEnrollmentForm = () => {
  const [output, setOutput] = useState("");

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    studentName: "",

    studentID: "",

    courseName: "",

    enrollmentDate: "",

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
          prompt: `generate a course enrollment letter for ${formData.studentName} (Student ID: ${formData.studentID}). ${formData.studentName} has enrolled in the ${formData.courseName} course starting from ${formData.enrollmentDate}. Additional details: "${formData.additionalDetails}".`,

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

      studentID: "",

      courseName: "",

      enrollmentDate: "",

      additionalDetails: "",
    });
  };

  return (
    <>
      <div className="container form-container" style={{ marginTop: "40px" }}>
        <div className="row" style={{ margin: "40px" }}>
          <div className="col-md-12 text-center">
            <h3 style={{ marginBottom: "30px", marginTop: "30px" }}>
              Course Enrollment Letter Form
            </h3>
          </div>

          <div className="col-md-6 p-3">
            <label htmlFor="studentName" className="form-label">
              Student's Name <span className="mandatory">*</span>
            </label>

            <input
              type="text"
              className="form-control"
              id="studentName"
              placeholder="Enter student's name"
              value={formData.studentName}
              onChange={handleChange}
            />

            <span id="studentName-error" className="error-message"></span>
          </div>

          <div className="col-md-6 p-3">
            <label htmlFor="studentID" className="form-label">
              Student ID <span className="mandatory">*</span>
            </label>

            <input
              type="text"
              className="form-control"
              id="studentID"
              placeholder="Enter student ID"
              value={formData.studentID}
              onChange={handleChange}
            />

            <span id="studentID-error" className="error-message"></span>
          </div>

          <div className="col-md-6 p-3">
            <label htmlFor="courseName" className="form-label">
              Course Name <span className="mandatory">*</span>
            </label>

            <input
              type="text"
              className="form-control"
              id="courseName"
              placeholder="Enter course name"
              value={formData.courseName}
              onChange={handleChange}
            />

            <span id="courseName-error" className="error-message"></span>
          </div>

          <div className="col-md-6 p-3">
            <label htmlFor="enrollmentDate" className="form-label">
              Enrollment Date <span className="mandatory">*</span>
            </label>

            <input
              type="date"
              className="form-control"
              id="enrollmentDate"
              value={formData.enrollmentDate}
              onChange={handleChange}
            />

            <span id="enrollmentDate-error" className="error-message"></span>
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

export default CourseEnrollmentForm;
