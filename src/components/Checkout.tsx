import '../App.css';
import styled from 'styled-components';
import CapacityPopup from './CapacityPopup';
import Receipt from './Receipt';
import {Course} from '../App';
import { useNavigate, useLocation } from 'react-router-dom';
import React, { useEffect, useState, useRef, createContext } from "react";
import SimpleHeader from './SimpleHeader';

export interface CheckoutProps {
  courseList: Array<Course>;
  courseTitleList: Array<String>;
  cartVisible: boolean;
  // semester: string;
  // setSemester:(semester: string) => void;
}
// Page displayed for route '/checkout' (when user checks out cart)
function Checkout() {
  const {state} = useLocation();
  const [courseList] = useState(state ? state.courseList : new Array<Course>());
  const [courseTitleList] = useState(state ? state.courseTitleList : new Array<String>());
  const [cartVisible] = useState(state ? state.cartVisible : false);

  return (
    <>
      <Container>
        <SimpleHeader courseList={courseList} courseTitleList={courseTitleList} cartVisible={cartVisible}/>
        <Page>
          {/* Receipt list of courses the user has added to their cart */}
          <Receipt courseList={courseList} courseTitleList={courseTitleList} cartVisible={cartVisible}/>
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
