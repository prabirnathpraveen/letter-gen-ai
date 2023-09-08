import React, { useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";

import axios from "axios";

import Letter from "../../component/letter";

import Spinner from "react-bootstrap/Spinner";

const PropertyListingForm = () => {
  const [output, setOutput] = useState("");

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    agentName: "",

    agentContact: "",

    propertyAddress: "",

    propertyDescription: "",

    listingPrice: "",
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
          prompt: `generate a property listing with agent ${formData.agentName}. The property is located at ${formData.propertyAddress} and described as: "${formData.propertyDescription}". The listing price is $${formData.listingPrice}.`,

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
      agentName: "",

      agentContact: "",

      propertyAddress: "",

      propertyDescription: "",

      listingPrice: "",
    });
  };

  return (
    <>
      <div className="container form-container" style={{ marginTop: "40px" }}>
        <div className="row" style={{ margin: "40px" }}>
          <div className="col-md-12 text-center">
            <h3 style={{ marginBottom: "30px", marginTop: "30px" }}>
              Property Listing Form
            </h3>
          </div>

          <div className="col-md-6 p-3">
            <label htmlFor="agentName" className="form-label">
              Agent's Name <span className="mandatory">*</span>
            </label>

            <input
              type="text"
              className="form-control"
              id="agentName"
              placeholder="Enter agent's name"
              value={formData.agentName}
              onChange={handleChange}
            />

            <span id="agentName-error" className="error-message"></span>
          </div>

          <div className="col-md-6 p-3">
            <label htmlFor="agentContact" className="form-label">
              Agent's Contact <span className="mandatory">*</span>
            </label>

            <input
              type="text"
              className="form-control"
              id="agentContact"
              placeholder="Enter agent's contact"
              value={formData.agentContact}
              onChange={handleChange}
            />

            <span id="agentContact-error" className="error-message"></span>
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
            <label htmlFor="propertyDescription" className="form-label">
              Property Description <span className="mandatory">*</span>
            </label>

            <textarea
              className="form-control"
              id="propertyDescription"
              placeholder="Enter property description"
              value={formData.propertyDescription}
              onChange={handleChange}
            />

            <span
              id="propertyDescription-error"
              className="error-message"
            ></span>
          </div>

          <div className="col-md-6 p-3">
            <label htmlFor="listingPrice" className="form-label">
              Listing Price <span className="mandatory">*</span>
            </label>

            <input
              type="text"
              className="form-control"
              id="listingPrice"
              placeholder="Enter listing price"
              value={formData.listingPrice}
              onChange={handleChange}
            />

            <span id="listingPrice-error" className="error-message"></span>
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

export default PropertyListingForm;
