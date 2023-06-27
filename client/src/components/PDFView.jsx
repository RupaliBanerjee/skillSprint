import React, { useState } from "react";

import { Box, Icon, Button, IconButton, useTheme } from "@mui/material";
// import myPdf from "../samplePDF/Presentation1";
import { useSelector } from "react-redux";
import { connect } from "react-redux";
// Import the main component
import { Viewer, Worker } from "@react-pdf-viewer/core";

// Import the styles
import "@react-pdf-viewer/core/lib/styles/index.css";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import Dialog from "@mui/material/Dialog";

const PDFView = (props) => {
  const { filesList } = props;
  const [pdfFile, setPdfFile] = useState(null);
  const fileType = ["application/pdf"];
  if (!!filesList[0]) {
    let reader = new FileReader();
    reader.readAsDataURL(filesList[0]);
    reader.onload = (e) => {
      setPdfFile(e.target.result);
    };
  }

  const newPlugin = defaultLayoutPlugin();
  //   const [numPages, setNumPages] = useState(null);
  //   const [pageNumber, setPageNumber] = useState(1);

  //   function onDocumentLoadSuccess({ numPages }) {
  //     setNumPages(numPages);
  //     setPageNumber(1);
  //   }

  //   function changePage(offSet) {
  //     setPageNumber((prevPageNumber) => prevPageNumber + offSet);
  //   }

  //   function changePageBack() {
  //     changePage(-1);
  //   }

  //   function changePageNext() {
  //     changePage(+1);
  //   }

  return (
    <Box display={"flex"} height={"60vh"} overflow={"auto"}>
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
        {pdfFile && <Viewer fileUrl={pdfFile} plugins={[newPlugin]} />}
      </Worker>
    </Box>
  );
};

const mapStateToProps = (state) => ({ filesList: state.filesList });

export default connect(mapStateToProps)(PDFView);
