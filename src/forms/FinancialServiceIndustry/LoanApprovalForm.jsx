import React, { useState,useRef,useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Letter from "../../component/letter";
import Spinner from "react-bootstrap/Spinner";

const LoanApprovalForm = () => {
  const [output, setOutput] = useState("");

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    bankName: "",
    applicantName: "",
    loanAmount: "",
    interestRate: "",
    loanTerm: "",
    approvalDate: "",
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
    console.log(JSON.stringify(process.env.REACT_APP_OPEN_AI_KEY));

    try {
      const response = await axios.post(
        "https://api.openai.com/v1/engines/text-davinci-003/completions",
        {
          prompt: `Generate a loan approval letter for ${formData.applicantName} from ${formData.bankName} for a loan amount of
          Rs: ${formData.loanAmount}, with an interest rate of ${formData.interestRate}%, a loan term of ${formData.loanTerm} months, 
          and an approval date of ${formData.approvalDate}.`,
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
      applicantName: "",
      loanAmount: "",
      interestRate: "",
      loanTerm: "",
      approvalDate: "",
    });
  };
  return (
    <>
      <div className="container form-container" style={{ marginTop: "40px" }}>
        <div className="row" style={{ margin: "40px" }}>
          <div className="col-md-12 text-center">
            <h3 style={{ marginBottom: "30px", marginTop: "30px" }}>
              Loan Approval Letter Form
            </h3>
          </div>
          <div className="col-md-6 p-3">
            <label htmlFor="bankName" className="form-label">
              Bank Name <span className="mandatory">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              id="bankName"
              placeholder="Enter the bank name"
              value={formData.bankName}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6 p-3">
            <label htmlFor="applicantName" className="form-label">
              Applicant Name <span className="mandatory">*</span>
            </label>

            <input
              type="text"
              className="form-control"
              id="applicantName"
              placeholder="Enter the applicant's name"
              value={formData.applicantName}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6 p-3">
            <label htmlFor="loanAmount" className="form-label">
              Loan Amount <span className="mandatory">*</span>
            </label>

            <input
              type="number"
              className="form-control"
              id="loanAmount"
              placeholder="Enter the approved loan amount"
              value={formData.loanAmount}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6 p-3">
            <label htmlFor="interestRate" className="form-label">
              Interest Rate <span className="mandatory">*</span>
            </label>

            <input
              type="number"
              className="form-control"
              id="interestRate"
              placeholder="Enter the interest rate"
              value={formData.interestRate}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6 p-3">
            <label htmlFor="loanTerm" className="form-label">
              Loan Term (months)<span className="mandatory">*</span>
            </label>

            <input
              type="number"
              className="form-control"
              id="loanTerm"
              placeholder="Enter the loan term (in months)"
              value={formData.loanTerm}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6 p-3">
            <label htmlFor="approvalDate" className="form-label">
              Approval Date <span className="mandatory">*</span>
            </label>

            <input
              type="date"
              className="form-control"
              id="approvalDate"
              value={formData.approvalDate}
              onChange={handleChange}
            />
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

export default LoanApprovalForm;
