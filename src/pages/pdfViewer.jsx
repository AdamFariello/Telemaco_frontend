import { pdfjs } from "react-pdf";
import { useState } from "react";

import { Document, Page } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;


//export default function PdfReactPdf({ src }: PdfProps) { //use with typescript
export default function PdfReactPdf({ src }) {

  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);

  //function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  function nextPage() {
    setPageNumber((v) => ++v);
  }

  function prevPage() {
    setPageNumber((v) => --v);
  }

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <button onClick={prevPage} disabled={pageNumber <= 1}>
        Previous
      </button>
      <button onClick={nextPage} disabled={pageNumber >= (numPages ?? -1)}>
        Next
      </button>
      <Document
        file={src}
        onLoadSuccess={onDocumentLoadSuccess}
        className="my-react-pdf"
      >
        <Page pageNumber={pageNumber} />
      </Document>
      <p>
        Page {pageNumber} of {numPages}
      </p>
    </div>
  );
}