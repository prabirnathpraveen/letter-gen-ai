import React, { useState } from "react";
import data from "../assets/json/data.json";
import "bootstrap/dist/css/bootstrap.min.css";
import robotGif from "../assets/images/ai-robot-gif.gif";
import PatientAppointmentConfirmationForm from "../forms/HealthcareIndustry/PatientAppointmentConfirmationForm";
import MedicalReferralForm from "../forms/HealthcareIndustry/MedicalReferralForm";
import MedicalTestResultsForm from "../forms/HealthcareIndustry/MedicalTestResultsForm";

import CustomerComplaintResolutionForm from "../forms/CustomerServiceIndustry/CustomerComplaintResolutionForm";
import CustomerFeedbackRequestForm from "../forms/CustomerServiceIndustry/CustomerFeedbackRequestForm";
import ThankYouForYourPurchaseForm from "../forms/CustomerServiceIndustry/ThankYouForYourPurchaseForm";

import AdmissionAcceptanceForm from "../forms/EducationalIndustry/AdmissionAcceptanceForm";
import CourseEnrollmentForm from "../forms/EducationalIndustry/CourseEnrollmentForm";
import GraduationCongratulationsForm from "../forms/EducationalIndustry/GraduationCongratulationsForm";

import CreditCardStatementForm from "../forms/FinancialServiceIndustry/CreditCardStatementForm";
import InvestmentPortfolioUpdateForm from "../forms/FinancialServiceIndustry/InvestmentPortfolioUpdateForm";
import LoanApprovalForm from "../forms/FinancialServiceIndustry/LoanApprovalForm";

import DemandForm from "../forms/LegalIndustry/DemandForm";
import LegalConsultationConfirmationForm from "../forms/LegalIndustry/LegalConsultationConfirmationForm";
import LegalNoticeForm from "../forms/LegalIndustry/LegalNoticeForm";

import HomePurchaseOfferForm from "../forms/RealEstateIndustry/HomePurchaseOfferForm";
import PropertyListingForm from "../forms/RealEstateIndustry/PropertyListingForm";
import RentalAgreementForm from "../forms/RealEstateIndustry/RentalAgreementForm";

import EmployeePromotionForm from "../forms/HumanResourceIndustry/EmployeePromotionForm";
import JobOfferForm from "../forms/HumanResourceIndustry/JobOfferForm";
import TerminationForm from "../forms/HumanResourceIndustry/TerminationForm";

import { useMediaQuery, useTheme } from "@mui/material";

const letterComponents = {
  "Patient Appointment Confirmation Letter": PatientAppointmentConfirmationForm,
  "Medical Test Results Letter": MedicalTestResultsForm,
  "Medical Referral Letter": MedicalReferralForm,
  "Loan Approval Letter": LoanApprovalForm,
  "Credit Card Statement Letter": CreditCardStatementForm,
  "Investment Portfolio Update Letter": InvestmentPortfolioUpdateForm,
  "Legal Consultation Confirmation Letter": LegalConsultationConfirmationForm,
  "Demand Letter": DemandForm,
  "Legal Notice Letter": LegalNoticeForm,
  "Property Listing Letter": PropertyListingForm,
  "Rental Agreement Letter": RentalAgreementForm,
  "Home Purchase Offer Letter": HomePurchaseOfferForm,
  "Job Offer Letter": JobOfferForm,
  "Employee Promotion Letter": EmployeePromotionForm,
  "Termination Letter": TerminationForm,
  "Admission Acceptance Letter": AdmissionAcceptanceForm,
  "Course Enrollment Letter": CourseEnrollmentForm,
  "Graduation Congratulations Letter": GraduationCongratulationsForm,
  "Customer Complaint Resolution Letter": CustomerComplaintResolutionForm,
  "Thank You for Your Purchase Letter": ThankYouForYourPurchaseForm,
  "Customer Feedback Request Letter": CustomerFeedbackRequestForm,
};

const Dropdownlist = () => {
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("sm"));
  const [industryData, setIndustryData] = useState(data);
  const [selectedIndustry, setSelectedIndustry] = useState("Select Industry");
  const [selectedLetter, setSelectedLetter] = useState("Select Letter Type");

  const changeIndustry = (event) => {
    setSelectedIndustry(event.target.value);
    setSelectedLetter("Select Letter Type");
  };

  const changeLetter = (event) => {
    setSelectedLetter(event.target.value);
  };

  const renderSelectedForm = () => {
    const ComponentToRender = letterComponents[selectedLetter];

    if (ComponentToRender) {
      return <ComponentToRender />;
    } else {
      return null;
    }
  };

  

  return (
    <>
      <div className="container-fluid">
        <div className="text-center h2 p-3 u-text-p2">Letter <span className="u-text-mark">Generator</span></div>
        <div
          className="d-flex justify-content-center"
          style={{ padding: "20px" }}
        >
          <div className="row" style={{ maxWidth: "600px" }}>
            <div className="col-md-6 d-flex justify-content-center">
              <select
                className="form-control text-center"
                value={selectedIndustry}
                onChange={changeIndustry}
                style={{ width: "180px", marginBottom: "10px", height: "40px" }}
              >
                <option>Select Industry</option>
                {industryData &&
                  industryData.Industries.map((industry) => (
                    <option
                      value={industry.IndustryName}
                      key={industry.IndustryName}
                    >
                      {industry.IndustryName}
                    </option>
                  ))}
              </select>
            </div>
            <div className="col-md-6 d-flex justify-content-center">
              <select
                className="form-control text-center"
                value={selectedLetter}
                onChange={changeLetter}
                style={{ width: "180px", height: "40px" }}
              >
                <option>Select Letter Type</option>
                {selectedIndustry !== "Select Industry" &&
                  industryData &&
                  industryData.Industries.find(
                    (industry) => industry.IndustryName === selectedIndustry
                  ).Letters.map((letter) => (
                    <option value={letter.LetterName} key={letter.LetterName}>
                      {letter.LetterName}
                    </option>
                  ))}
              </select>
            </div>
          </div>
        </div>
        <div className="row">
          {!isMatch && (<>
          <div style={{width: "100%", overflow: "hidden",margin: "0", padding: "0"}}>
            <svg
              width="1440"
              height="36"
              viewBox="0 0 1440 36"
              className="u-block"
              xmlns="http://www.w3.org/2000/svg"
              style={{width: "100%",height: "auto", margin: "0",padding: "0"}}
            >
              <path
                d="M1440 36V8.2s-105.6-1.2-160.7-6a877 877 0 00-150.5 2.5c-42.1 3.9-140 15-223 15C754 19.6 700.3 6.8 548.8 7c-143.7 0-273.4 11.5-350 12.6-76.6 1.2-198.8 0-198.8 0V36h1440z"
                fill="#FFD000"
              ></path>
            </svg>
          </div>
          </>)}
          <div className="col-md-12" style={{ background: "#FFD000" }}>
            {selectedLetter !== "Select Letter Type" ? (
              renderSelectedForm()
            ) : (
              <>
                <div
                  className="d-flex justify-content-center align-items-center form-container"
                  style={{ background: "white" }}
                >
                  <h3>select industry and letter type</h3>
                  <img
                    src={robotGif}
                    className="robotgif"
                    style={{ width: "200px" }}
                  ></img>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dropdownlist;
