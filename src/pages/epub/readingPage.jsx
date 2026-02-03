import EpubGenerator from "./epubGenerator";

export default function ReadingPage() {
    return (<>
        <h1>Example to highlight in comparison</h1>
        <div style={{display:"flex", flexDirection:"row"}}>
            <EpubGenerator epubLink="./example.epub"/>
            <EpubGenerator epubLink="./example.epub"/>
        </div>
    </>);
}