import { useState, useEffect, useRef } from "react";
import { ReactReader } from "react-reader";

import { Book, Contents, Rendition } from "epubjs";

//TODO: Make a seperate file that calls this file for book element

export default function EpubGenerator() {
    const [page, setPage] = useState(0);
    const [selections, setSelections] = useState(undefined);
    const rendition = useRef([]);
    const tableOfContents = useRef([]); //TODO: if using typescript, add <NavItem[]> specifically

    //TODO: Change these variables for when implementing the book on the right side
    const [displayPage, setDisplayPage] = useState(undefined); //displayed.page, displayed.total
    const [displayChapter, setDisplayChapter] = useState(undefined);
    const [inputFieldLeft, setInputFieldLeft] = useState(0); 

    let reFilter = (s) => s.replaceAll(/\D*/gi, "");

    function updateDisplayPage(epubcfi) {
        setPage(epubcfi);
        console.log(epubcfi)
        if (rendition.current && tableOfContents.current) {
            const { displayed, href } = rendition.current.location.start
            const chapter = tableOfContents.current.find((item) => 
                item.href === href
            )
            
            setDisplayPage(displayed);
            setInputFieldLeft(displayed.page);

            //TODO: Figure out why this randomly gives a blank
            if (chapter) setDisplayChapter(chapter)
        }
    }

    function inputFieldLeftUpdate(e) {
        if (e.key === "Enter") {
            //TODO: Add function, or connect function, to change the page
            if (displayPage && inputFieldLeft < displayPage.total) {
                cfiFromPage(inputFieldLeft);
                //setDisplayChapter({...displayPage, displayPage.page:inputFieldLeft})
                setFormData({...formData, [e.target.name]:e.target.value});

            }
        } 
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
            <p>{
                displayPage ? `${displayPage.page} of ${displayPage.total}` : 
                "0 of 0"
            }</p> {/*LATER: optimize*/}
            
            {/*LATER: Do more testing to make sure if letters can sneak in*/}
            <input
                type="text"
                name="pageNumber"
                value={inputFieldLeft}
                placeholder={inputFieldLeft}
                onChange={e => {setInputFieldLeft(reFilter(e.target.value))}}
                onKeyDown={inputFieldLeftUpdate}
                
            />
            
            <ReactReader
                url="./example.epub"
                title="Dog world" //LATER: Add dynamic title adder (Needed?)
                epubOptions={{
                    allowPopups: true, //LATER: figure out if needed
                    allowScriptedContent: true, //REQUIRED, OR ELSE IT BREAKS RENDITION
                }}

                tocChanged={(_toc) => (tableOfContents.current = _toc)}
                location={page}
                locationChanged={updateDisplayPage}
                getRendition={(_rendition) => {
                    rendition.current = _rendition;
                    /*LATER: figure if needed (think it's for highlighting)
                    _rendition.hooks.content.register((contents) => {
                        const document = contents.window.document;
                        console.log(document);
                        console.log(Rendition);
                    })
                    */
                }}
            />
            <p>{ 
                displayChapter ? `Current Chapter: ${displayChapter.label}` : 
                "Current Chapter: null"
            }</p> {/*LATER: Figure out if this should be included*/}
        </div>
    </>)
}