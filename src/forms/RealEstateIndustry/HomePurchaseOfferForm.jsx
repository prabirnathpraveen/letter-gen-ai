import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Letter from "../../component/letter";
import Spinner from "react-bootstrap/Spinner";

const HomePurchaseOfferForm = () => {
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    buyerName: "",
    buyerAddress: "",
    propertyAddress: "",
    offerPrice: "",
    earnestMoneyDeposit: "",
    closingDate: "",
    additionalTerms: "",
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
          prompt: `generate a home purchase offer from ${formData.buyerName}. The offer is for the property located at ${formData.propertyAddress} for the price of $${formData.offerPrice}. The earnest money deposit is $${formData.earnestMoneyDeposit}. The closing date is ${formData.closingDate}. Additional terms: "${formData.additionalTerms}".`,
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
      buyerName: "",
      buyerAddress: "",
      propertyAddress: "",
      offerPrice: "",
      earnestMoneyDeposit: "",
      closingDate: "",
      additionalTerms: "",
    });
  };

  return (
    <>
      <div className="container form-container" style={{ marginTop: "40px" }}>
        <div className="row" style={{ margin: "40px" }}>
          <div className="col-md-12 text-center">
            <h3 style={{ marginBottom: "30px", marginTop: "30px" }}>
              Home Purchase Offer Form
            </h3>
          </div>
          <div className="col-md-6 p-3">
            <label htmlFor="buyerName" className="form-label">
              Buyer's Name <span className="mandatory">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              id="buyerName"
              placeholder="Enter buyer's name"
              value={formData.buyerName}
              onChange={handleChange}
            />
            <span id="buyerName-error" className="error-message"></span>
          </div>
          <div className="col-md-6 p-3">
            <label htmlFor="buyerAddress" className="form-label">
              Buyer's Address <span className="mandatory">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              id="buyerAddress"
              placeholder="Enter buyer's address"
              value={formData.buyerAddress}
              onChange={handleChange}
            />
            <span id="buyerAddress-error" className="error-message"></span>
          </div>
          <div className="col-md-6 p-3">
            <label htmlFor="propertyAddress" className="form-label">
              Property Address <span className="mandatory">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              id="propertyAddress"
              placeholder="Enter property address"
              value={formData.propertyAddress}
              onChange={handleChange}
            />
            <span id="propertyAddress-error" className="error-message"></span>
          </div>
          <div className="col-md-6 p-3">
            <label htmlFor="offerPrice" className="form-label">
              Offer Price <span className="mandatory">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              id="offerPrice"
              placeholder="Enter offer price"
              value={formData.offerPrice}
              onChange={handleChange}
            />
            <span id="offerPrice-error" className="error-message"></span>
          </div>
          <div className="col-md-6 p-3">
            <label htmlFor="earnestMoneyDeposit" className="form-label">
              Earnest Money Deposit <span className="mandatory">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              id="earnestMoneyDeposit"
              placeholder="Enter earnest money deposit"
              value={formData.earnestMoneyDeposit}
              onChange={handleChange}
            />
            <span
              id="earnestMoneyDeposit-error"
              className="error-message"
            ></span>
          </div>
          <div className="col-md-6 p-3">
            <label htmlFor="closingDate" className="form-label">
              Closing Date <span className="mandatory">*</span>
            </label>
            <input
              type="date"
              className="form-control"
              id="closingDate"
              value={formData.closingDate}
              onChange={handleChange}
            />
            <span id="closingDate-error" className="error-message"></span>
          </div>
          <div className="col-md-6 p-3">
            <label htmlFor="additionalTerms" className="form-label">
              Additional Terms
            </label>
            <textarea
              className="form-control"
              id="additionalTerms"
              placeholder="Enter additional terms"
              value={formData.additionalTerms}
              onChange={handleChange}
            />
            <span id="additionalTerms-error" className="error-message"></span>
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

export default HomePurchaseOfferForm;
