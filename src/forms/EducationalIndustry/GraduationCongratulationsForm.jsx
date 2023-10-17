import React, { useState,useRef,useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Letter from "../../component/letter";
import Spinner from "react-bootstrap/Spinner";

const GraduationCongratulationsForm = () => {
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    graduateName: "",
    degreeName: "",
    graduationDate: "",
    additionalDetails: "",
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
          prompt: `generate a graduation congratulations letter for ${formData.graduateName}. Congratulations to ${formData.graduateName} for successfully earning a ${formData.degreeName} degree on ${formData.graduationDate}. Additional details: "${formData.additionalDetails}".`,
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
      graduateName: "",
      degreeName: "",
      graduationDate: "",
      additionalDetails: "",
    });
  };

  return (
    <>
      <div className="container form-container" style={{ marginTop: "40px" }}>
        <div className="row" style={{ margin: "40px" }}>
          <div className="col-md-12 text-center">
            <h3 style={{ marginBottom: "30px", marginTop: "30px" }}>
              Graduation Congratulations Letter Form
            </h3>
          </div>
          <div className="col-md-6 p-3">
            <label htmlFor="graduateName" className="form-label">
              Graduate's Name <span className="mandatory">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              id="graduateName"
              placeholder="Enter graduate's name"
              value={formData.graduateName}
              onChange={handleChange}
            />
            <span id="graduateName-error" className="error-message"></span>
          </div>
          <div className="col-md-6 p-3">
            <label htmlFor="degreeName" className="form-label">
              Degree Name <span className="mandatory">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              id="degreeName"
              placeholder="Enter degree name"
              value={formData.degreeName}
              onChange={handleChange}
            />
            <span id="degreeName-error" className="error-message"></span>
          </div>
          <div className="col-md-6 p-3">
            <label htmlFor="graduationDate" className="form-label">
              Graduation Date <span className="mandatory">*</span>
            </label>
            <input
              type="date"
              className="form-control"
              id="graduationDate"
              value={formData.graduationDate}
              onChange={handleChange}
            />
            <span id="graduationDate-error" className="error-message"></span>
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

export default GraduationCongratulationsForm;
