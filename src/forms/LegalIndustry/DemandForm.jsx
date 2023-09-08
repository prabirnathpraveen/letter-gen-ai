import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Letter from "../../component/letter";
import Spinner from "react-bootstrap/Spinner";

const DemandForm = () => {
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    senderName: "",
    senderAddress: "",
    recipientName: "",
    recipientAddress: "",
    demandDetails: "",
    deadline: "",
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
          prompt: `generate a demand letter from ${formData.senderName} to ${formData.recipientName} regarding the following demand: "${formData.demandDetails}". The deadline for this demand is ${formData.deadline}.`,
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
      senderName: "",
      senderAddress: "",
      recipientName: "",
      recipientAddress: "",
      demandDetails: "",
      deadline: "",
    });
  };

  return (
    <>
      <div className="container form-container" style={{ marginTop: "40px" }}>
        <div className="row" style={{ margin: "40px" }}>
          <div className="col-md-12 text-center">
            <h3 style={{ marginBottom: "30px", marginTop: "30px" }}>
              Demand Letter Form
            </h3>
          </div>
          <div className="col-md-6 p-3">
            <label htmlFor="senderName" className="form-label">
              Sender's Name <span className="mandatory">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              id="senderName"
              placeholder="Enter sender's name"
              value={formData.senderName}
              onChange={handleChange}
            />
            <span id="senderName-error" className="error-message"></span>
          </div>
          <div className="col-md-6 p-3">
            <label htmlFor="senderAddress" className="form-label">
              Sender's Address <span className="mandatory">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              id="senderAddress"
              placeholder="Enter sender's address"
              value={formData.senderAddress}
              onChange={handleChange}
            />
            <span id="senderAddress-error" className="error-message"></span>
          </div>
          <div className="col-md-6 p-3">
            <label htmlFor="recipientName" className="form-label">
              Recipient's Name <span className="mandatory">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              id="recipientName"
              placeholder="Enter recipient's name"
              value={formData.recipientName}
              onChange={handleChange}
            />
            <span id="recipientName-error" className="error-message"></span>
          </div>
          <div className="col-md-6 p-3">
            <label htmlFor="recipientAddress" className="form-label">
              Recipient's Address <span className="mandatory">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              id="recipientAddress"
              placeholder="Enter recipient's address"
              value={formData.recipientAddress}
              onChange={handleChange}
            />
            <span id="recipientAddress-error" className="error-message"></span>
          </div>
          <div className="col-md-6 p-3">
            <label htmlFor="demandDetails" className="form-label">
              Demand Details <span className="mandatory">*</span>
            </label>
            <textarea
              className="form-control"
              id="demandDetails"
              placeholder="Enter demand details"
              value={formData.demandDetails}
              onChange={handleChange}
            />
            <span id="demandDetails-error" className="error-message"></span>
          </div>
          <div className="col-md-6 p-3">
            <label htmlFor="deadline" className="form-label">
              Deadline <span className="mandatory">*</span>
            </label>
            <input
              type="date"
              className="form-control"
              id="deadline"
              value={formData.deadline}
              onChange={handleChange}
            />
            <span id="deadline-error" className="error-message"></span>
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

export default DemandForm;
