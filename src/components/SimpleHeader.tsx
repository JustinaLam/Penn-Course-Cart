import styled from 'styled-components';
import { Course } from '../App'
import { useNavigate, NavigateFunction } from 'react-router-dom';
import { CheckoutProps } from './Checkout';

const SimpleHeader = ({courseList, courseTitleList, cartVisible}: CheckoutProps) => {
    const navigate = useNavigate();
    return (
    <>
    <NavBar id="nav">
        <Logo id="logo" onClick={(e)=>goHome(courseList, courseTitleList, cartVisible, navigate)}>Penn Course Cart</Logo>
    </NavBar>
    </>
  );
}

function goHome(courseList: Array<Course>, courseTitleList: Array<String>, cartVisible: boolean, navigate: NavigateFunction) {
    navigate("/", { state: {courseList: courseList, courseTitleList: courseTitleList, cartVisible: cartVisible} });
}

const NavBar = styled.div`
  background-color: rgb(1, 31, 91);
  width: 100%;
  padding: 0 1rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  min-height: 100px;
  color: white;
`
const Logo = styled.h2`
  cursor: pointer;
`

export default SimpleHeader;
