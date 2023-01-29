import './App.css';
import styled from 'styled-components';
import Nav from './components/Nav';
import Courses from './components/Courses';
import Cart from './components/Cart';
import CapacityPopup from './components/CapacityPopup';
import courses from './data/courses.json'

import { KeyboardEventHandler } from 'react';
import React, { useEffect, useState, useRef } from "react";


export interface CoursesProps {
  input: string;
  courseList: Array<Course>;
  setCourseList: (courseList: Array<Course>) => void;
  courseTitleList: Array<String>;
  setCourseTitles: (courseTitleList: Array<String>) => void;
  cartVisible: boolean;
  setCapacityPopup: (capacityPopup: boolean) => void;
  min: Number;
  max: Number;
}

export interface NavProps {
  setSearchInput: (input: string) => void;
  setCartVisibility: (cartVisible: boolean) => void;
  cartVisible: boolean;
  setFilterVisibility: (filterVisible: boolean) => void;
  filterVisible: boolean;
  courseTitleList: Array<String>;
  min: Number;
  setMin: (min: Number) => void;
  max: Number;
  setMax: (max: Number) => void;
}

export interface CartProps {
  courseList: Array<Course>;
  setCourseList: (courseList: Array<Course>) => void;
  courseTitleList: Array<String>;
  setCourseTitles: (courseTitleList: Array<String>) => void;
  cartVisible: boolean;
}

export interface CapacityPopupProps {
  capacityPopup: boolean;
  setCapacityPopup: (capacityPopup: boolean) => void;
}

export interface Course {
  dept: String;
  number: Number;
  title: String
  // prereqs: Array<String>;
  description: String;
}

function App() {
  const [input, setSearch] = useState("");
  useEffect(() => {
    setSearch(input);
  }, [input]);
  
  const [courseTitleList, setCourseTitles] = useState(new Array<String>());
  useEffect(() => {
    setCourseTitles(courseTitleList);
  }, [courseTitleList]);

  const [courseList, setCourses] = useState(new Array<Course>());
  useEffect(() => {
    setCourses(courseList);
  }, [courseList]);
  
  const [cartVisible, setCartVisibility] = useState(false);
  useEffect(() => {
    setCartVisibility(cartVisible);
  }, [cartVisible]);

  const [capacityPopup, setCapacityPopup] = useState(false);
  useEffect(() => {
    setCapacityPopup(capacityPopup);
  }, [capacityPopup]);

  const [filterVisible, setFilterVisibility] = useState(false);
  const [min, setMin] = useState<Number>(0);
  const [max, setMax] = useState<Number>(8000);

  return (
    <>
      {capacityPopup && 
        <CapacityPopup  capacityPopup={capacityPopup}
                      setCapacityPopup={setCapacityPopup}/>
      }
      <Container>
        <Nav  setSearchInput={setSearch} 
              setCartVisibility={setCartVisibility} 
              cartVisible={cartVisible}
              setFilterVisibility={setFilterVisibility} 
              filterVisible={filterVisible}
              courseTitleList={courseTitleList}
              min={min}
              setMin={setMin}
              max={max}
              setMax={setMax}/>
        <Page>
          <Courses  input={input} 
                    courseList={courseList} 
                    setCourseList={setCourses} 
                    courseTitleList={courseTitleList} 
                    setCourseTitles={setCourseTitles} 
                    cartVisible={cartVisible} 
                    setCapacityPopup={setCapacityPopup}
                    min={min}
                    max={max}/>
          <Cart courseList={courseList} 
                setCourseList={setCourses} 
                courseTitleList={courseTitleList} 
                setCourseTitles={setCourseTitles} 
                cartVisible={cartVisible}/>
        </Page>
      </Container>
    </>
  );
}

const Container = styled.div`
  overflow-x: hidden;
`

const Page = styled.div`
    display: flex;
    flex-direction: row;
    overflow-x: hidden;
    // width: 100%;
    boxSizing: border-box;
    padding: 0 0 0 calc(1rem + 10%);
`

export default App;
