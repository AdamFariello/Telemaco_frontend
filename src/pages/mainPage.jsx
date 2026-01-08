import { Link, useNavigate } from "react-router-dom";

import PdfReactPdf from "./pdfViewer";
import "./mainPage.css";

export default function MainPage() {
    const navigate = useNavigate();

    return(<>
        {/*<PDFViewer />*/}

        {/*<PdfReactPdf src="http://biblehub.info/pdfs/kjv.pdf" />*/}
        <PdfReactPdf src="./document.pdf" />   

        
        <div>
            <button onClick={() => navigate(`/login`)}>Login</button>
            <button onClick={() => navigate(`/signup`)}>Signup</button>
            <hr className="solid" />
        </div>
        
        <h1>Welcome to Telemaco!</h1>
        <br /><br />
        
        {/*
            "a good num­ber of students who did not speak French; but Joseph Jacotot knew no Flemish...
            Yet he wanted to re­spond to their wishes. To do so, the minimal link...
            had to be established between himself and them.
            At that time, a bilingual edition of <u>Télémaque</u> was being published in Brussels...
            He had the book delivered to the students and asked them
        */}
        <div id="teleDiv">
            <h2>What is Telemaco?</h2>
            <p>It's a language learning website, based on the book: 
            "<a href="https://en.wikipedia.org/wiki/The_Ignorant_Schoolmaster">The Ignorant school master</a>"</p>
            <p>Where you read a book in spanish (language you want to learn), and check the english version for meaning.</p>
        </div>
        <br /><br />
        
        <div>
            <h2>Examples:</h2>
            <hr className="solid" />
        </div>

    </>)    
}
