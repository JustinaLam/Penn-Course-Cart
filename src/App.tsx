import './App.css';
import styled from 'styled-components';
import Home from './components/Home';
import Checkout from './components/Checkout';
import React, { useEffect, useState, useRef, createContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

type AppContextType = {
  courseList: Array<Course> | null,
  setCourseList: React.Dispatch<React.SetStateAction<Array<Course> | null>>
}
const AppContextState = {
  courseList: null,
  setCourseList: () => {}
}
const AppContext = createContext<AppContextType>(AppContextState)

export interface Course {
  dept: String;
  number: Number;
  title: String
  description: String;
}

function App() {
  const [courseList, setCourseList] = useState<Array<Course> | null>(null)

  return (
    <>
    <AppContext.Provider value={{courseList, setCourseList}}>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}/> 
          <Route path="/checkout" element={<Checkout/>}/>
        </Routes>  
      </Router>
    </AppContext.Provider>
    </>
  );
}

export default App;
