import React from "react";

import { jsPDF } from "jspdf";


const handleExportPdf = (data) => {
  const cleanedData = data.replace(/\n{2,}/g, "\n");
  const doc = new jsPDF({
    unit: "mm",
    format: "a4",
    orientation: "portrait",
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    marginBottom: 10,
  });

  const fontSize = 12;
  const maxLineWidth = 180;
  doc.setFontSize(fontSize);
  const lineSpacing = 0.5;
  doc.setLineHeightFactor(lineSpacing);
  const paragraphs = cleanedData.split("\n");
  let yPosition = 20;
  paragraphs.forEach((paragraph) => {
    const lines = doc.splitTextToSize(paragraph, maxLineWidth);
    lines.forEach((line) => {
      doc.text(line, 15, yPosition);
      yPosition += fontSize * lineSpacing + 2;
    });
    yPosition += fontSize * lineSpacing;
  });
  doc.save("letter.pdf");
};

const Letter = (props) => {
    const { data } = props;
  return (
    <>
      <div className=" container form-container">
        <div className="d-flex justify-content-end pt-2">
          <div>
            <button
              type="reset"
              className="btn btn-outline-primary"
              style={{ width: "120px", marginRight: "10px" }}
              onClick={() => handleExportPdf(data)}
            >
              Export pdf
            </button>
          </div>
        </div>
        <div style={{ padding: "15px" }}>
          <pre>{data}</pre>
        </div>
      </div>
    </>
  );
};

export default Letter;
