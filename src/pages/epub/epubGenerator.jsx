import { useState, useEffect } from "react";
import { ReactReader } from "react-reader";

import { Book, Contents, Rendition } from "epubjs";

export default function EpubGenerator() {
    const [page, setPage] = useState(0);

    //For epub
    const [selections, setSelections] = useState(undefined);
    const [rendition, setRendition] = useState(undefined); //Highlighting functionality
      
    //Stolen from jfiddle
    // https://jsfiddle.net/timdown/SW54T/
    function getSelectedText() {
        var text = "";
        if (typeof window.getSelection != "undefined") {
            text = window.getSelection().toString();
        } else if (typeof document.selection != "undefined" && document.selection.type == "Text") {
            text = document.selection.createRange().text;
        }
        return text;
    } 
    function doSomethingWithSelectedText() {
        var selectedText = getSelectedText();
        if (selectedText) {
            alert("Got selected text " + selectedText);
        }
    }
    document.onmouseup = doSomethingWithSelectedText;
    document.onkeyup = doSomethingWithSelectedText;

    //TODO: Finish
    useEffect(() => {
        try {
            console.log(rendition);
            if (rendition) {
                console.log(rendition.getRange())
            } 
        } catch (e) {
            console.log(e);
        }
    }), [rendition]

    return(<>
        <button onClick={() => doSomethingWithSelectedText}>
            test
        </button>
        <h1>Example to highlight in comparison</h1>
        {/*----------------------------------------------------------------------------------------------------------------------------------------------------------*/}
        <div style={{ width: "100vh", height: '100vh' }} sandbox="allow-scripts">
            <ReactReader
                url="./example.epub"
                location={location}
                locationChanged={(epubcfi) => setPage(epubcfi)}
                epubOptions={{
                    allowPopups: true, //TODO: figure out if needed
                    allowScriptedContent: true, //REQUIRED, OR ELSE IT BREAKS RENDITION
                }}
                getRendition={(_rendition) => {
                    setRendition(_rendition);
                    _rendition.hooks.content.register((contents) => {
                        const document = contents.window.document;
                        console.log(document);
                        console.log(Rendition);
                    })
                }}
            />
        </div>
    </>)
}