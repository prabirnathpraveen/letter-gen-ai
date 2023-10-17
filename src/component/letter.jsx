import React, { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import ClipboardJS from "clipboard";
import Snackbar from "@mui/material/Snackbar";
import { Alert } from "@mui/material";
import Slide from "@mui/material/Slide";

const handleExportPdf = (data, handleSnackbar) => {
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
  handleSnackbar("PDF Exported Successfully!");
};

function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}

const Letter = (props) => {
  const { data } = props;
  const [open, setOpen] = useState(false);
  const [isCopied, setCopied] = useState(false);
  const [clipBoardData, setClipBoardData] = useState("");
  const [message, setMessage] = useState("");
  const [snackTime, setSnackTime] = useState(6000);

  useEffect(()=>{
    setCopied(false);
    setClipBoardData(props.data);
  },[props.data])
  const [state, setState] = React.useState({
    open: false,
    Transition: Slide,
  });

  const handleSnackbar = (message) => {
    setOpen(true);
    setState({
      open: true,
      Transition: Slide,
    });
    setMessage(message);
    setSnackTime(3000);
  };

  const handleClickCopy = () => {
    setClipBoardData(props.data);
    setCopied(false);
    const clipboard = new ClipboardJS(".copy-button");
    clipboard.on("success", function (e) {
      console.log("Text copied");
      setCopied(true);
      handleSnackbar("Copied Successfully!");
    });

    clipboard.on("error", function (e) {
      setCopied(false);
      console.error("Failed to copy text to clipboard: " + e.action);
    });

    return () => {
      clipboard.destroy();
    };
  };

  const handleClose = (event, reason) => {
    setState({
      ...state,
      open: false,
    });
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <>
      <div className=" container letter-container">
        <div className="d-flex justify-content-end pt-2">
          <div>
            <button
              type="button"
              className="btn btn-outline-primary"
              style={{ width: "120px", marginRight: "10px" }}
              onClick={() => handleExportPdf(data, handleSnackbar)}
            >
              Export pdf
            </button>
            <button
              type="reset"
              className="btn btn-outline-primary copy-button"
              style={{ width: "120px", marginRight: "10px" }}
              data-clipboard-text={clipBoardData}
              onClick={handleClickCopy}
            >
              {isCopied ? "copied" : "copy"}
            </button>
            <Snackbar
              open={open}
              autoHideDuration={snackTime}
              onClose={handleClose}
              TransitionComponent={state.Transition}
              key={state.Transition.name}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <Alert
                onClose={handleClose}
                severity="success"
                sx={{ width: "100%" }}
              >
                {message}
              </Alert>
            </Snackbar>
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
