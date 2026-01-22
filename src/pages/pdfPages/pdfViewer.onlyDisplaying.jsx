import { useState } from "react";
import PdfRender from "./pdfRender";

//import "./pdfViewerSettings.scss";

function PdfViewerSettings() {
    return (<>
        <div style={{display:"flex", flexDirection:"column", alignItems:"center" }}>
        <h1>Display Settings</h1>
        
        <div style={{display:"flex", flexDirection:"row", justifyContent:"center", flexWrap:"nowrap"}}>
        {/*<div className={"settingsRow"}>*/}
            <p>Display both pdfs at once</p>
            <button>Click</button>
        </div>

        <div>
            <p>Display one pdf at a time (shows spanish)</p>
            <button>Click</button>
        </div>

        <button>Close</button>
        </div>
    </>)
}

export default function PdfViewer() {
    const [isSettingsOpen, setSettingsView] = useState(false);

    return(<>
        <PdfViewerSettings />

        <h1>Reading, "Building a Second Brain"</h1>
        
        <button onClick={() => setSettingsView(!isSettingsOpen)}>
            Settings
        </button>

        <div style={{display:"flex"}} > 
            <PdfRender />
            <PdfRender />
        </div>
    </>)
}