import React, { useEffect, useState } from "react";

import { Box, Icon, Button, IconButton, useTheme } from "@mui/material";
//import myPdf from "../samplePDF";
import { useSelector } from "react-redux";
import { connect } from "react-redux";
// Import the main component
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { Buffer } from "buffer";
import { Document,Page } from "react-pdf";

// Import the styles
import "@react-pdf-viewer/core/lib/styles/index.css";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import Dialog from "@mui/material/Dialog";

const ViewerPage = (props) => {
  const { pdfFile } = props;
  const newPlugin = defaultLayoutPlugin();
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  function changePage(offSet) {
    setPageNumber((prevPageNumber) => prevPageNumber + offSet);
  }

  function changePageBack() {
    changePage(-1);
  }

  function changePageNext() {
    changePage(+1);
  }


  //original worlerurl=https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js
  
  return (
    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
      {pdfFile && <Viewer fileUrl={pdfFile} plugins={[newPlugin]} />}
    </Worker>
  );
  // return (
  //   <Document file={pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
  //     <Page pageNumber={pageNumber}></Page>
  //   </Document>
  // )
};

const PDFView = (props) => {
  const { filesList, pdfFileData } = props;
  const [pdfFile, setPdfFile] = useState(null);
  // const fromDb= `${Buffer.from(pdfFileData)
  //   .toString("base64").split('base64,')[1]}`;
 // const fromDb=pdfFileData.split('base64,')[1]
 

  // setPdfFile(
  //   `data:application/pdf;base64, ${Buffer.from(pdfFileData.data).toString(
  //     "base64"
  //   )}`
  // );

  
  useEffect(() => {
    
  }, [pdfFileData]);
  const getFile=(e)=>{
    const fileType = ["application/pdf"];
   // const strLength = Buffer.from(pdfFileData.data).toString("base64").length;
    
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = (e) => {
      console.log("Check the value for file",e.target.result)
      setPdfFile(e.target.result);
    };
    
  }
  // const fileType = ["application/pdf"];
  // if (!!filesList[0]) {
  //   let reader = new FileReader();
  //   reader.readAsDataURL(filesList[0]);
  //   reader.onload = (e) => {
  //     setPdfFile(e.target.result);
  //   };
  // }
 // console.log("check pdfFileData", pdfFileData);
  //console.log(`Check File ${pdfFile}`);

  
  return (
    <Box display={"flex"} height={"60vh"} overflow={"auto"}>
      {/* <input type="file" onChange={getFile}/> */}
      {/* <button>Submit</button> */}
      <ViewerPage pdfFile={pdfFileData} />
    </Box>
  );
};

export default PDFView;
