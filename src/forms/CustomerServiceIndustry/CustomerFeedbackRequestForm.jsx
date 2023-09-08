import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Letter from "../../component/letter";
import Spinner from "react-bootstrap/Spinner";

const CustomerFeedbackRequestForm = () => {
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    feedbackType: "",
    feedbackMessage: "",
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
          prompt: `generate a customer feedback request letter for ${formData.customerName} (Customer Email: ${formData.customerEmail}). We value your feedback. Please provide your ${formData.feedbackType} feedback: "${formData.feedbackMessage}".`,
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
      customerName: "",
      customerEmail: "",
      feedbackType: "",
      feedbackMessage: "",
    });
  };

  return (
    <>
      <div className="container form-container" style={{ marginTop: "40px" }}>
        <div className="row" style={{ margin: "40px" }}>
          <div className="col-md-12 text-center">
            <h3 style={{ marginBottom: "30px", marginTop: "30px" }}>
              Customer Feedback Request Letter Form
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
            <label htmlFor="feedbackType" className="form-label">
              Feedback Type <span className="mandatory">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              id="feedbackType"
              placeholder="Enter feedback type"
              value={formData.feedbackType}
              onChange={handleChange}
            />
            <span id="feedbackType-error" className="error-message"></span>
          </div>
          <div className="col-md-6 p-3">
            <label htmlFor="feedbackMessage" className="form-label">
              Feedback Message <span className="mandatory">*</span>
            </label>
            <textarea
              className="form-control"
              id="feedbackMessage"
              placeholder="Enter your feedback message"
              value={formData.feedbackMessage}
              onChange={handleChange}
            />
            <span id="feedbackMessage-error" className="error-message"></span>
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

export default CustomerFeedbackRequestForm;
