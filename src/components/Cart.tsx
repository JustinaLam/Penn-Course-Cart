import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation, NavigateFunction } from 'react-router-dom';
import styled from 'styled-components';
import { CartProps } from "./Home";
import { Course } from '../App';

const Cart = ({courseList, setCourseList, courseTitleList, setCourseTitles, cartVisible}: CartProps) => {
  const navigate = useNavigate();
  
  const [currCourse, setCurrCourse] = useState<Course | null>(null);
  const [currPos, setCurrPos] = useState(0);
  const dragItem = useRef<HTMLElement | null>(null);
  const dragOverItem = useRef<HTMLElement | null>(null);

  const dragStart = (e: React.DragEvent<HTMLDivElement>, position:number) => {
    // Start dragging a course
    dragItem.current = document.getElementById(e.currentTarget.id);
    if (dragItem.current != null) {
      dragItem.current.style.backgroundColor = "#efefef";
    }
    setCurrPos(position);
    setCurrCourse(courseList[position]);
  }
  const dragEnter = (e: React.DragEvent<HTMLDivElement>, position:number) => {
    e.preventDefault();
    // Make current hover target gray
    dragOverItem.current = document.getElementById(e.currentTarget.id);
    if (dragOverItem.current != null)
      dragOverItem.current.style.backgroundColor = "#efefef";
    // Move selected course to the current position
    if (currCourse != null) {
      courseList.splice(currPos, 1);
      courseList.splice(position, 0, currCourse);
    }
    setCurrPos(position);
    setCourseList(courseList);
  };
  const leave = (e: React.DragEvent<HTMLDivElement>) => {
    // Reset color of item dragged over
    if (dragOverItem.current != null) 
      dragOverItem.current.style.backgroundColor = "white";
    dragOverItem.current = null;
  }
  const drop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (dragItem.current != null) 
      dragItem.current.style.backgroundColor = "white";
    if (dragOverItem.current != null) 
      dragOverItem.current.style.backgroundColor = "white";

    dragItem.current = null;
    dragOverItem.current = null;
  };

  function clear() {
    setCourseList(new Array<Course>());
    setCourseTitles(new Array<String>());
  }

  return (
  <>
  {cartVisible &&
    <CartContainer>
      <CartInnerContainer>
        <SectionHeader>
          Course Cart
          <CartBtns>
          <CartBtn onClick={clear}>Clear Cart</CartBtn>
          <CartBtn onClick={() => closeAllDescriptions(courseList)}>Close All</CartBtn>
          </CartBtns>
        </SectionHeader>
        { courseList.length > 0 ? 
        // Course list is not empty - display courses in user's cart
          ( courseList.map(({dept, number, title, description},index) => (
              // Enable dragging
              <CourseItem id={dept + ' ' + number}
                          key={index} 
                          draggable 
                          onDragStart={(e) => dragStart(e,index)}
                          onDragEnter={(e) => dragEnter(e,index)}
                          onDragOver={(e) => e.preventDefault()}
                          onDragLeave={leave}
                          onDragEnd={drop}
                          onDrop={(e) => e.preventDefault()}>
                {/* Course department, number, and title */}
                <CourseListing onClick={() => toggleDescription("cart-"+dept+"-"+number)}>
                  <DraggableIcon src="https://user-images.githubusercontent.com/88551260/215374214-9106088f-d761-46f8-90b3-76908994e410.png"/>
                  {dept + ' ' + number + ': ' + title}
                </CourseListing>
                {/* Course description */}
                  <Description id={"cart-"+dept+"-"+number}>
                    Description:
                    <br></br>
                    {description}
                    <br></br>
                    {/* Button to remove course from cart */}
                    <RemFromCartBtn onClick={() => removeFromCart(courseList, courseTitleList, {dept, number, title, description}, setCourseList, setCourseTitles)}>
                      Remove From Cart
                    </RemFromCartBtn>
                  </Description>
              </CourseItem>
            ))
          ) : (
            // Course cart is empty - display a short message to user
            <SmallMessage>Your course cart is empty! <br></br>Add some courses to get started.</SmallMessage>
          )
        }
        {/* Checkout Button */}
        { courseList.length > 0 &&
        <CheckoutBtn onClick={() => checkout(courseList, courseTitleList, cartVisible, navigate)}>
          Check Out
        </CheckoutBtn>
        }
        </CartInnerContainer>
    </CartContainer>
  }
  </>
  );
}

function toggleDescription(id: string, val?:boolean) {
  // By default, description not initially shown (edit in Description component)
  var el = document.getElementById(id);  
  if (el != null) {
    // New value given (e.g. for close all)
    if (typeof val !== 'undefined') {
      el.style.display = val ? "block" : "none";
    } 
    // Just clicked
    else if (el.style.display == "block") {
      el.style.display = "none";
    }
    else {
      el.style.display = "block";
    } 
  }
}

function closeAllDescriptions(courseList:Array<Course>) {
  for (var c in courseList) {
    toggleDescription("cart-" + courseList[c].dept + "-" + courseList[c].number, false);
  }
}

function removeFromCart(courseList:Array<Course>, courseTitleList:Array<String>, 
                        newCourseString: {dept:String, number:Number, title:String, description:String}, 
                        setCourseList: (courseList: Array<Course>) => void, 
                        setCourseTitles: (courseTitleList: Array<String>) => void) {
  toggleDescription("cart-"+newCourseString.dept+"-"+newCourseString.number);
  if (courseTitleList.includes(newCourseString.title)) {
    setCourseList(courseList.filter(el => el.title != newCourseString.title));
    setCourseTitles(courseTitleList.filter(el => el != newCourseString.title));
  } else {
    setCourseList(new Array<Course>());
    setCourseTitles(new Array<String>());
  }
}

function checkout(courseList: Array<Course>, courseTitleList: Array<String>, cartVisible: boolean, navigate: NavigateFunction) {
  navigate("/checkout", { state: {courseList: courseList, courseTitleList: courseTitleList, cartVisible: cartVisible} });
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
  display: flex;
  flex-direction: row;
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
`
const DraggableIcon = styled.img`
  // max-width: 15px;
  max-height: 25px;
  margin: 0 10px;
`
const Description = styled.p`
    display: none;
    font-size: 15px;
    margin-left: 20px;
    color: rgb(80,80,80);
    z-index: 1;
  `
const CourseListing = styled.div`
  font-size: 20px;
  border: 1px solid rgb(0,0,0,0.2);
  border-radius: 10px;
  padding: 20px 15px;
  margin: 20px 0;
  cursor: default;
  display: flex;
  flex-direction: row;
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
const CartBtns = styled.div`
  position: absolute;
  right: 5%;
  display: flex;
  flex-direction: row;
`
const CartBtn = styled.button`
  min-height: 25px;
  min-width: 50px;
  padding: 10px 10px;
  margin-left: 15px;
  background-color: #efefef;
  border: none;
  border-radius: 5px;
  font-size: 15px;
  cursor: pointer;
`
const CheckoutBtn = styled.button`
  min-height: 50px;
  width: 100%;
  padding: 10px 10px;
  margin-top: 20px;
  background-color: 115, 255, 145; // rgb(179, 237, 255);
  border: none;
  border-radius: 5px;
  font-size: 22px;
  cursor: pointer;
`


export default Cart;
