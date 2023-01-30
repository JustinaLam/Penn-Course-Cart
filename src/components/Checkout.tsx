import '../App.css';
import styled from 'styled-components';
import Nav from './Nav';
import Courses from './Courses';
import Cart from './Cart';
import CapacityPopup from './CapacityPopup';
import Receipt from './Receipt';
import {Course} from '../App'
// import {AppContext} from '../App'
import { useNavigate, useLocation } from 'react-router-dom';

import { KeyboardEventHandler } from 'react';
import React, { useEffect, useState, useRef, createContext } from "react";
import SimpleHeader from './SimpleHeader';

export interface CheckoutProps {
  courseList: Array<Course>;
  courseTitleList: Array<String>;
}

function Checkout() {
  const {state} = useLocation();
  const [courseList] = useState(state ? state.courseList : new Array<Course>);
  const [courseTitleList] = useState(state ? state.courseTitleList : new Array<String>);
  const [cartVisible, setCartVisibility] = useState(false);
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
        <SimpleHeader courseList={courseList} courseTitleList={courseTitleList}/>
        <Page>
          <Receipt courseList={courseList} courseTitleList={courseTitleList}/>
          {/* <Cart courseList={courseList} 
                setCourseList={setCourses} 
                courseTitleList={courseTitleList} 
                setCourseTitles={setCourseTitles} 
                cartVisible={cartVisible}/> */}
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

export default Checkout;
