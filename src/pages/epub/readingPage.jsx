import EpubGenerator from "./epubGenerator";

const epub_under5mb = "./example.epub";
const epub_over5mb = "./tooBigExample.epub";

export default function ReadingPage() {
    return (<>
        <h1>Example to highlight in comparison</h1>
        <div style={{display:"flex", flexDirection:"row"}}>
            <EpubGenerator epubLink={epub_over5mb}/>
            <EpubGenerator epubLink="./example.epub"/>
        </div>
    </>);
}
