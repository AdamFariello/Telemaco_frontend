import { useState } from 'react'
import './App.css'
import { Routes, Route } from "react-router-dom";

import LoginPage from "./pages/login";
import SignupPage from "./pages/signup";
import UserProfile from "./pages/userProfile";
import MainPage from './pages/mainPage';

//import PdfViewer from "../scraps/pdfPages/pdfViewer";
//import EpubGenerator from './pages/epub/epubGenerator';
import ReadingPage from './pages/epub/readingPage';

function App() {
  
  return (<>
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/user/:id" element={<UserProfile />} />
      {/* <Route path="/pdf/" element={<PdfViewer />} /> //LEAVING IN FOR CHANGE OF MIND, UNLIKLEY */}
      {/* <Route path="/epub/" element={<EpubGenerator />} /> //LEAVING IN FOR TESTING*/}
      <Route path="/read/" element={<ReadingPage />} />
    </Routes>
  </>)
}

export default App