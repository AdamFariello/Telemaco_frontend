import PdfRender from "./pdfRender"

export default function pdfViewer() {
    function Setings() {

    }

    return(<>
        <h1>Reading, "Building a Second Brain"</h1>
        
        <button>Settings</button>

        <div style={{display:"flex"}} > 
            <PdfRender />
            <PdfRender />
        </div>
    </>)
}