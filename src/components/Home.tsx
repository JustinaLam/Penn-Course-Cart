import '../App.css';
import styled from 'styled-components';
import Nav from './Nav';
import Courses from './Courses';
import Cart from './Cart';
import CapacityPopup from './CapacityPopup';
import {Course} from '../App'
import { useLocation } from 'react-router-dom';
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

function Home() {
  const [input, setSearch] = useState("");
  const {state} = useLocation();
  const [courseList, setCourseList] = useState(state ? state.courseList : new Array<Course>);
  const [courseTitleList, setCourseTitles] = useState(state ? state.courseTitleList : new Array<String>);
  const [cartVisible, setCartVisibility] = useState(state ? state.cartVisible : false);
  const [capacityPopup, setCapacityPopup] = useState(false);
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
                    setCourseList={setCourseList} 
                    courseTitleList={courseTitleList} 
                    setCourseTitles={setCourseTitles} 
                    cartVisible={cartVisible} 
                    setCapacityPopup={setCapacityPopup}
                    min={min}
                    max={max}/>
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
