import React, { useState,useRef,useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Letter from "../../component/letter";
import Spinner from "react-bootstrap/Spinner";

const RentalAgreementForm = () => {
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    landlordName: "",
    landlordAddress: "",
    tenantName: "",
    tenantAddress: "",
    propertyAddress: "",
    leaseStartDate: "",
    leaseEndDate: "",
    monthlyRent: "",
    additionalTerms: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };
  const letterRef = useRef(null);
  useEffect(() => {
    if (output) {
      letterRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [output]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "https://api.openai.com/v1/engines/text-davinci-003/completions",
        {
          prompt: `generate a rental agreement between ${formData.landlordName} (Landlord) and ${formData.tenantName} (Tenant) for the property located at ${formData.propertyAddress}. The lease term starts on ${formData.leaseStartDate} and ends on ${formData.leaseEndDate}. The monthly rent is $${formData.monthlyRent}. Additional terms: "${formData.additionalTerms}".`,
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
      landlordName: "",
      landlordAddress: "",
      tenantName: "",
      tenantAddress: "",
      propertyAddress: "",
      leaseStartDate: "",
      leaseEndDate: "",
      monthlyRent: "",
      additionalTerms: "",
    });
  };

  return (
    <>
      <div className="container form-container" style={{ marginTop: "40px" }}>
        <div className="row" style={{ margin: "40px" }}>
          <div className="col-md-12 text-center">
            <h3 style={{ marginBottom: "30px", marginTop: "30px" }}>
              Rental Agreement Form
            </h3>
          </div>
          <div className="col-md-6 p-3">
            <label htmlFor="landlordName" className="form-label">
              Landlord's Name <span className="mandatory">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              id="landlordName"
              placeholder="Enter landlord's name"
              value={formData.landlordName}
              onChange={handleChange}
            />
            <span id="landlordName-error" className="error-message"></span>
          </div>
          <div className="col-md-6 p-3">
            <label htmlFor="landlordAddress" className="form-label">
              Landlord's Address <span className="mandatory">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              id="landlordAddress"
              placeholder="Enter landlord's address"
              value={formData.landlordAddress}
              onChange={handleChange}
            />
            <span id="landlordAddress-error" className="error-message"></span>
          </div>
          <div className="col-md-6 p-3">
            <label htmlFor="tenantName" className="form-label">
              Tenant's Name <span className="mandatory">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              id="tenantName"
              placeholder="Enter tenant's name"
              value={formData.tenantName}
              onChange={handleChange}
            />
            <span id="tenantName-error" className="error-message"></span>
          </div>
          <div className="col-md-6 p-3">
            <label htmlFor="tenantAddress" className="form-label">
              Tenant's Address <span className="mandatory">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              id="tenantAddress"
              placeholder="Enter tenant's address"
              value={formData.tenantAddress}
              onChange={handleChange}
            />
            <span id="tenantAddress-error" className="error-message"></span>
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
            <label htmlFor="leaseStartDate" className="form-label">
              Lease Start Date <span className="mandatory">*</span>
            </label>
            <input
              type="date"
              className="form-control"
              id="leaseStartDate"
              value={formData.leaseStartDate}
              onChange={handleChange}
            />
            <span id="leaseStartDate-error" className="error-message"></span>
          </div>
          <div className="col-md-6 p-3">
            <label htmlFor="leaseEndDate" className="form-label">
              Lease End Date <span className="mandatory">*</span>
            </label>
            <input
              type="date"
              className="form-control"
              id="leaseEndDate"
              value={formData.leaseEndDate}
              onChange={handleChange}
            />
            <span id="leaseEndDate-error" className="error-message"></span>
          </div>
          <div className="col-md-6 p-3">
            <label htmlFor="monthlyRent" className="form-label">
              Monthly Rent <span className="mandatory">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              id="monthlyRent"
              placeholder="Enter monthly rent"
              value={formData.monthlyRent}
              onChange={handleChange}
            />
            <span id="monthlyRent-error" className="error-message"></span>
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

export default RentalAgreementForm;
