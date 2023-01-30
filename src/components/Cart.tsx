import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation, NavigateFunction } from 'react-router-dom';
import styled from 'styled-components';
import { CartProps } from "./Home";
import { Course } from '../App';

const Cart = ({courseList, setCourseList, courseTitleList, setCourseTitles, cartVisible}: CartProps) => {
  const navigate = useNavigate();
  return (
  <>
  {cartVisible &&
    <CartContainer>
      <CartInnerContainer>
        <SectionHeader>
          Course Cart
        </SectionHeader>
        { courseList.length > 0 ? 
        // Course list is not empty - display courses in user's cart
          ( courseList.map(({dept, number, title, description},index) => (
              <CourseItem key={index}>
                {/* Course department, number, and title */}
                <CourseListing onClick={() => toggleDescription("cart-"+dept+"-"+number)}>
                  {dept + ' ' + number + ': ' + title}
                </CourseListing>
                {/* Course description */}
                <Description id={"cart-"+dept+"-"+number}>
                  Description:
                  <br></br>
                  {description}
                  <br></br>
                  {/* Prereqs:
                  <br></br>
                  {prereqs} */}
                  {/* Button to remove course from cart */}
                  <RemFromCartBtn onClick={() => removeFromCart(courseList, courseTitleList, {dept, number, title, description}, setCourseList, setCourseTitles)}>
                    Remove From Cart
                  </RemFromCartBtn>
                </Description>
              </CourseItem>
            ))
          )
          :
          (
            // Course cart is empty - display a short message to user
            <SmallMessage>Your course cart is empty! <br></br>Add some courses to get started.</SmallMessage>
          )
        }
        {/* Checkout Button */}
        { courseList.length > 0 &&
        <CheckoutBtn onClick={() => checkout(courseList, courseTitleList, navigate)}>
          Check Out
        </CheckoutBtn>
        }
        </CartInnerContainer>
    </CartContainer>
  }
  </>
  );
}

function toggleDescription(id: string) {
  // By default, description not initially shown (edit in Description component)
  var el = document.getElementById(id);
  if (el != null) {
    if (el.style.display == "none") {
      console.log(id + " opening");
      el.style.display = "block";
    } else {
      console.log(id + " closing");
      el.style.display = "none";
    }
  }
}

function removeFromCart(courseList:Array<Course>, courseTitleList:Array<String>, 
                        newCourseString: {dept:String, number:Number, title:String, description:String}, 
                        setCourseList: (courseList: Array<Course>) => void, 
                        setCourseTitles: (courseTitleList: Array<String>) => void) {
  if (courseTitleList.includes(newCourseString.title)) {
    setCourseList(courseList.filter(el => el.title != newCourseString.title));
    setCourseTitles(courseTitleList.filter(el => el != newCourseString.title));
  } else {
    setCourseList(new Array<Course>());
    setCourseTitles(new Array<String>());
  }
}

function checkout(courseList: Array<Course>, courseTitleList: Array<String>, navigate: NavigateFunction) {
  navigate("/checkout", { state: {courseList: courseList, courseTitleList: courseTitleList} });
}

const CartContainer = styled.div`
  position: sticky;
  font-size: 30px;
  width: 40%;
  display: flex;
  flex-direction: column;
  
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
`

const CartInnerContainer = styled.div`
position: sticky;
  border: 1px solid rgba(1, 31, 91, 0.4);
  border-right: 0px;
  border-radius: 20px 0 0 20px;
  padding: 1.5rem;
`

const SectionHeader = styled.div`
  font-size: 30px;
  margin-bottom: 20px;
`
const SmallMessage = styled.div`
  font-size: 18px;
  margin-top: 20px;
`

const CourseList = styled.div`
  display: flex;
  flex-direction: column;
  padding-right: 10%;
`

const CourseItem = styled.div`
  width: 100%;
  // border: 1px solid blue;
`

const CourseListing = styled.p`
  font-size: 20px;
  border: 1px solid rgb(0,0,0,0.2);
  border-radius: 10px;
  padding: 20px 15px;
  cursor: default;
`

const Description = styled.p`
  display: block;
  font-size: 15px;
  margin-left: 20px;
  color: rgb(80,80,80);
  z-index: 1;
`

const RemFromCartBtn = styled.button`
  min-height: 25px;
  min-width: 50px;
  padding: 10px 10px;
  margin-top: 15px;
  background-color: rgb(255, 115, 110);
  border: none;
  border-radius: 5px;
  font-size: 15px;
  cursor: pointer;
`
const CheckoutBtn = styled.button`
  min-height: 50px;
  width: 100%;
  padding: 10px 10px;
  margin: auto;
  margin-top: 20px;
  background-color: 115, 255, 145; // rgb(179, 237, 255);
  border: none;
  border-radius: 5px;
  font-size: 22px;
  cursor: pointer;
`


export default Cart;
