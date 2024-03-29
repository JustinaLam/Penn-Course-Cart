import './App.css';
import Home from './components/Home';
import Checkout from './components/Checkout';
import React, { useState, createContext } from "react";
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
  title: String;
  description: String;
}
export interface Section {
  id: String;
  status: String;
  days: String;
  time: String;
}
export interface CourseInfo {
  dept: String;
  number: Number;
  title: String;
  description: String;
  courseQuality: Number;
  instructorQuality: Number;
  difficulty: Number;
  workRequired: Number;
  sections: Section[];
}

function App() {
  const [courseList, setCourseList] = useState<Array<Course> | null>(null)

  return (
    <>
    <AppContext.Provider value={{courseList, setCourseList}}>
      <Router>
        <Routes>
          {/* Main home page with course list and cart */}
          <Route path="/" element={<Home/>}/> 
          {/* Checkout page */}
          <Route path="/checkout" element={<Checkout/>}/>
        </Routes>  
      </Router>
    </AppContext.Provider>
    </>
  );
}

export default App;
