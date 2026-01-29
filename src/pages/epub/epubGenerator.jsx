import { useState, useEffect, useRef } from "react";
import { ReactReader } from "react-reader";

import { Book, Contents, Rendition } from "epubjs";

export default function EpubGenerator() {
    const [page, setPage] = useState(0);

    //For epub
    const [selections, setSelections] = useState(undefined);
    const rendition = useRef([]);
    const [displayPage, setDisplayPage] = useState(page);
    const tableOfContents = useRef([]); //TODO: if using typescript, add <NavItem[]> specifically

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

    /*
    //TODO: Function that streamlines extracting page number
    useEffect(() => {
        try {
            if (rendition) {
                const { displayed, href } = rendition.current.location.start;
                console.log(display);
                console.log(href);
            }
        } catch (e) {
            console.log(e);
        }
    }), [page, rendition]
    */

    /*
    //TODO: Finish, this is for getting the selected range
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
    */

    return(<>
        <button onClick={() => doSomethingWithSelectedText}>
            test
        </button>
        <h1>Example to highlight in comparison</h1>
        {/*----------------------------------------------------------------------------------------------------------------------------------------------------------*/}
        <div style={{ width: "100vh", height: '100vh' }} sandbox="allow-scripts">
            <p>This is page: {displayPage}</p> {/*TODO: optimize*/}
            <ReactReader
                url="./example.epub"
                title="Dog world" //TODO: Add dynamic title adder (Needed?)
                epubOptions={{
                    allowPopups: true, //TODO: figure out if needed
                    allowScriptedContent: true, //REQUIRED, OR ELSE IT BREAKS RENDITION
                }}

                tocChanged={(_toc) => (tableOfContents.current = _toc)}
                location={location}
                locationChanged={(epubcfi) => { 
                    setPage(epubcfi);
                    if (rendition.current && tableOfContents.current) {
                        const { displayed, href } = rendition.current.location.start
                        const chapter = tableOfContents.current.find((item) => 
                            item.href === href
                        )

                        setDisplayPage(
                            `${displayed.page} / ${displayed.total}`
                        );
                        console.log(rendition.current.location.start);
                    }
                }}
                getRendition={(_rendition) => {
                    rendition.current = _rendition;
                    /*TODO: figure if needed (think it's for highlighting)
                    _rendition.hooks.content.register((contents) => {
                        const document = contents.window.document;
                        console.log(document);
                        console.log(Rendition);
                    })
                    */
                }}
            />
        </div>
    </>)
}