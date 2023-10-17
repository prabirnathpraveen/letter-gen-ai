import React, { useState,useRef,useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Letter from "../../component/letter";
import Spinner from "react-bootstrap/Spinner";

const CreditCardStatementForm = () => {
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    customerName: "",
    accountNumber: "",
    billingPeriod: "",
    statementDate: "",
    outstandingBalance: "",
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
          prompt: `generate a credit card statement letter for the customer ${formData.customerName}. The account number is ${formData.accountNumber}, the billing period is ${formData.billingPeriod}, the statement date is ${formData.statementDate}, and the outstanding balance is ${formData.outstandingBalance}.`,
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
      accountNumber: "",
      billingPeriod: "",
      statementDate: "",
      outstandingBalance: "",
    });
  };

  return (
    <>
      <div className="container form-container" style={{ marginTop: "40px" }}>
        <div className="row" style={{ margin: "40px" }}>
          <div className="col-md-12 text-center">
            <h3 style={{ marginBottom: "30px", marginTop: "30px" }}>
              Credit Card Statement Letter Form
            </h3>
          </div>
          <div className="col-md-6 p-3">
            <label htmlFor="customerName" className="form-label">
              Customer Name <span className="mandatory">*</span>
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
            <label htmlFor="billingPeriod" className="form-label">
              Billing Period <span className="mandatory">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              id="billingPeriod"
              placeholder="Enter billing period"
              value={formData.billingPeriod}
              onChange={handleChange}
            />
            <span id="billingPeriod-error" className="error-message"></span>
          </div>
          <div className="col-md-6 p-3">
            <label htmlFor="statementDate" className="form-label">
              Statement Date <span className="mandatory">*</span>
            </label>
            <input
              type="date"
              className="form-control"
              id="statementDate"
              value={formData.statementDate}
              onChange={handleChange}
            />
            <span id="statementDate-error" className="error-message"></span>
          </div>
          <div className="col-md-6 p-3">
            <label htmlFor="outstandingBalance" className="form-label">
              Outstanding Balance <span className="mandatory">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              id="outstandingBalance"
              placeholder="Enter outstanding balance"
              value={formData.outstandingBalance}
              onChange={handleChange}
            />
            <span
              id="outstandingBalance-error"
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

export default CreditCardStatementForm;
