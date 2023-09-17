import '../App.css';
import styled from 'styled-components';
import Nav from './Nav';
import Courses from './Courses';
import Cart from './Cart';
import CapacityPopup from './CapacityPopup';
import {Course} from '../App'
import { useLocation } from 'react-router-dom';
import React, { useEffect, useState, useRef } from "react";

// Arguments passed to Courses
export interface CoursesProps {
  input: string;
  courseList: Array<Course> ;
  setCourseList: (courseList: Array<Course>) => void;
  courseTitleList: Array<String>;
  setCourseTitles: (courseTitleList: Array<String>) => void;
  cartVisible: boolean;
  setCapacityPopup: (capacityPopup: boolean) => void;
  min: Number;
  max: Number;
}
// Arguments passed to Nav (header bar)
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
// Arguments passed to Cart
export interface CartProps {
  courseList: Array<Course>;
  setCourseList: (courseList: Array<Course>) => void;
  courseTitleList: Array<String>;
  setCourseTitles: (courseTitleList: Array<String>) => void;
  cartVisible: boolean;
}
// Arguments passed to CapacityPopup
export interface CapacityPopupProps {
  capacityPopup: boolean;
  setCapacityPopup: (capacityPopup: boolean) => void;
}

// Main home page with course list and cart
function Home() {
  const {state} = useLocation();
  // Search bar contents
  const [input, setSearch] = useState("")
  // Lists of Course objects and course titles in user's cart
  const [courseList, setCourseList] = useState(state ? state.courseList : new Array<Course>());
  const [courseTitleList, setCourseTitles] = useState(state ? state.courseTitleList : new Array<String>());
  // Booleans for whether cart, capacity popup, and navbar filter are visible
  const [cartVisible, setCartVisibility] = useState(state ? state.cartVisible : false);
  const [capacityPopup, setCapacityPopup] = useState(false);
  const [filterVisible, setFilterVisibility] = useState(false);
  // Lower and upper bounds for filtering courses
  const [min, setMin] = useState<Number>(0);
  const [max, setMax] = useState<Number>(8000);

  return (
    <>
      {/* Popup visible if user has attempted to add more than 7 courses to their cart */}
      {capacityPopup && 
        <CapacityPopup  capacityPopup={capacityPopup}
                      setCapacityPopup={setCapacityPopup}/>
      }
      <Container>
        {/* Nav: header bar with search bar, cart icon, filter icon, and filter input fields (toggleable) */}
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
        {/* Main page */}
        <Page>
          {/* Main course list */}
          <Courses  input={input} 
                    courseList={courseList} 
                    setCourseList={setCourseList} 
                    courseTitleList={courseTitleList} 
                    setCourseTitles={setCourseTitles} 
                    cartVisible={cartVisible} 
                    setCapacityPopup={setCapacityPopup}
                    min={min}
                    max={max}/>
          {/* User's cart */}
          <Cart courseList={courseList} 
                setCourseList={setCourseList} 
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
    boxSizing: border-box;
    padding: 0 0 0 calc(1rem + 10%);
`

export default Home;
