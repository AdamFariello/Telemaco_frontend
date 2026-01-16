import { pdfjs } from "react-pdf";
import { useState } from "react";
import { Document, Page } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;


export default function PdfRender({ src="./document.pdf" }) {
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  function changePage(incOrDec) {
    setPageNumber((v) => v + incOrDec);
  }

  //TODO: Check if it's maxwidth I need to apply
  return (<>
    <div style={{ width: "auto", height: "100%", display: "flex", flexDirection: "column", alignItems: "center"}}>
      <div style={{width: "auto"}}>
        <button onClick={() => changePage(-1)} disabled={pageNumber <= 1}>
          Previous
        </button>
        <button onClick={() => changePage(1)} disabled={pageNumber >= (numPages ?? -1)}>
          Next
        </button>
      </div>

      <div style={{width: "auto", height: "auto", marginRight: "auto", marginLeft: "auto"}}>
        <Document
          file={src}
          onLoadSuccess={onDocumentLoadSuccess}
          className="my-react-pdf"
        >
          <Page 
            pageNumber={pageNumber} 
            size="A4"
            renderAnnotationLayer={false} 
            renderTextLayer={false}
          />
        </Document>
      </div>
      
      <p>
        Page {pageNumber} of {numPages}
      </p>
    </div>
  </>);
}