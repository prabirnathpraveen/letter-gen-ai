import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Letter from "../../component/letter";
import Spinner from "react-bootstrap/Spinner";


const InvestmentPortfolioUpdateForm = () => {
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    clientName: "",
    accountNumber: "",
    portfolioSummary: "",
    holdings: "",
    performanceSummary: "",
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
          prompt: `generate an investment portfolio update letter for the client ${formData.clientName}. The account number is ${formData.accountNumber}, the portfolio summary is ${formData.portfolioSummary}, the holdings are ${formData.holdings}, and the performance summary is ${formData.performanceSummary}.`,
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
      clientName: "",
      accountNumber: "",
      portfolioSummary: "",
      holdings: "",
      performanceSummary: "",
    });
  };

  return (
    <>
      <div className="container form-container" style={{ marginTop: "40px" }}>
        <div className="row" style={{ margin: "40px" }}>
          <div className="col-md-12 text-center">
            <h3 style={{ marginBottom: "30px", marginTop: "30px" }}>
              Investment Portfolio Update Letter Form
            </h3>
          </div>

          <div className="col-md-6 p-3">
            <label htmlFor="clientName" className="form-label">
              Client Name <span className="mandatory">*</span>
            </label>

            <input
              type="text"
              className="form-control"
              id="clientName"
              placeholder="Enter client's name"
              value={formData.clientName}
              onChange={handleChange}
            />

            <span id="clientName-error" className="error-message"></span>
          </div>

          <div className="col-md-6 p-3">
            <label htmlFor="accountNumber" className="form-label">
              Account Number <span className="mandatory">*</span>
            </label>

            <input
              type="text"
              className="form-control"
              id="accountNumber"
              placeholder="Enter account number"
              value={formData.accountNumber}
              onChange={handleChange}
            />

            <span id="accountNumber-error" className="error-message"></span>
          </div>

          <div className="col-md-6 p-3">
            <label htmlFor="portfolioSummary" className="form-label">
              Portfolio Summary <span className="mandatory">*</span>
            </label>

            <textarea
              className="form-control"
              id="portfolioSummary"
              placeholder="Enter portfolio summary"
              value={formData.portfolioSummary}
              onChange={handleChange}
            />

            <span id="portfolioSummary-error" className="error-message"></span>
          </div>

          <div className="col-md-6 p-3">
            <label htmlFor="holdings" className="form-label">
              Holdings <span className="mandatory">*</span>
            </label>

            <textarea
              className="form-control"
              id="holdings"
              placeholder="Enter holdings"
              value={formData.holdings}
              onChange={handleChange}
            />

            <span id="holdings-error" className="error-message"></span>
          </div>

          <div className="col-md-6 p-3">
            <label htmlFor="performanceSummary" className="form-label">
              Performance Summary <span className="mandatory">*</span>
            </label>

            <textarea
              className="form-control"
              id="performanceSummary"
              placeholder="Enter performance summary"
              value={formData.performanceSummary}
              onChange={handleChange}
            />

            <span
              id="performanceSummary-error"
              className="error-message"
            ></span>
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

export default InvestmentPortfolioUpdateForm;
