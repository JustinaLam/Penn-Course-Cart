import courses from '../data/courses.json'
import styled from 'styled-components';
import { CoursesProps } from './Home';
import { Course } from '../App';

// Courses list on home page
const Courses = ({input, courseList, setCourseList, courseTitleList, setCourseTitles, cartVisible, setCapacityPopup, min, max}: CoursesProps) => (
  <>
    <CoursesPageContainer style={cartVisible ? NarrowStyle : WideStyle}>
      <CourseList>
      {/* Display courses whose _title or department_ contains search input */}
      <SectionHeader>
        Matching Courses
      </SectionHeader>
      {/* Case on whether such courses exist: */}
      {courses
        .filter(item => (item.title.toLowerCase().includes(input.toLowerCase()) || 
                        (item.dept + "" + item.number).toLowerCase().includes(input.toLowerCase()) ||
                        (item.dept + " " + item.number).toLowerCase().includes(input.toLowerCase()) ||
                        (item.dept + "-" + item.number).toLowerCase().includes(input.toLowerCase()))
                        &&
                        (item.number >= Number(min) && item.number <= Number(max)))
        .length > 0 ?
        // If such courses exist, display them
        (courses
          .filter(item => (item.title.toLowerCase().includes(input.toLowerCase()) || 
                        (item.dept + "" + item.number).toLowerCase().includes(input.toLowerCase()) ||
                        (item.dept + " " + item.number).toLowerCase().includes(input.toLowerCase()) ||
                        (item.dept + "-" + item.number).toLowerCase().includes(input.toLowerCase()))
                        &&
                        (item.number >= Number(min) && item.number <= Number(max)))
          .map(({dept, number, title, description}, index) => (
            // A container initially showing course code and title; 
            // when clicked, the course description and "Add to Cart" button appear (toggleable)
            <CourseItem key={index}>
              <p className={courseTitleList.includes(title) ? 'grayCourseListing': 'courseListing'} onClick={() => toggleDescription(dept+"-"+number)}>
                {dept + ' ' + number + ': ' + title}
              </p>
              <p className='description' id={dept+"-"+number}>
                {/* Course description */}
                Description:<br></br>
                {description}<br></br>
                {courseTitleList.includes(title) ? 
                  // If course is already in cart, grey out the "Add to Cart" button
                  <button className="grayAddToCartBtn">
                    In cart
                  </button>
                :
                  // Otherwise, show an active "Add to Cart" button
                  <button className="addToCartBtn" onClick={() => addToCart(
                        courseList, courseTitleList, {dept, number, title, description}, 
                        setCourseList, setCourseTitles, setCapacityPopup)}>
                    Add To Cart
                  </button>
                }
              </p>
            </CourseItem>
          ))
        )
        :
        // If no such courses exist, display the appropriate message
        <SmallMessage>
          There are no courses whose titles match this search.
        </SmallMessage>
      }
      </CourseList>
      <CourseList>

      {/* Display courses whose _description_ contains search input, but not title */}
      <SectionHeader>
        Matching Descriptions
      </SectionHeader>
      {/* Case on whether such courses exist: */}
      {courses.filter(item => item.description.toLowerCase().includes(input.toLowerCase()) &&
                      (item.number >= Number(min) && item.number <= Number(max)) &&
                      !(item.title.toLowerCase().includes(input.toLowerCase()) || 
                      (item.dept + "" + item.number).toLowerCase().includes(input.toLowerCase()) ||
                      (item.dept + " " + item.number).toLowerCase().includes(input.toLowerCase()) ||
                      (item.dept + "-" + item.number).toLowerCase().includes(input.toLowerCase())))
              .length > 0 ?
      // If such courses exist, display them
      (courses
        .filter(item => item.description.toLowerCase().includes(input.toLowerCase()) &&
                      (item.number >= Number(min) && item.number <= Number(max)) &&
                      !(item.title.toLowerCase().includes(input.toLowerCase()) || 
                      (item.dept + " " + item.number).toLowerCase().includes(input.toLowerCase()) ||
                      (item.dept + "-" + item.number).toLowerCase().includes(input.toLowerCase())))
        .map(({dept, number, title, description}, index) => (
            // A container initially showing course code and title; 
            // when clicked, the course description and "Add to Cart" button appear (toggleable)
            <CourseItem key={index}>
            <p className={courseTitleList.includes(title) ? 'grayCourseListing': 'courseListing'} onClick={() => toggleDescription(dept+"-"+number)}>
              {dept + ' ' + number + ': ' + title}
            </p>
            <p className='description' id={dept+"-"+number}>
              {/* Course description */}
              Description:<br></br>
              {description}<br></br>
              {courseTitleList.includes(title) ? 
                // If course is already in cart, grey out the "Add to Cart" button
                <button className="grayAddToCartBtn">
                  In cart
                </button>
              :
                // Otherwise, show an active "Add to Cart" button
                <button className="addToCartBtn" onClick={() => addToCart(
                      courseList, courseTitleList, {dept, number, title, description}, 
                      setCourseList, setCourseTitles, setCapacityPopup)}>
                  Add To Cart
                </button>
              }
            </p>
          </CourseItem>
        ))
      )
      :
      // If no such courses exist, display the appropriate message
      <SmallMessage>
        There are no courses that match this search in description only.
      </SmallMessage>
      }
      </CourseList>
    </CoursesPageContainer>
  </>
)
// Toggle (on click) whether course description is visible
function toggleDescription(id: string) {
  var el = document.getElementById(id);
  if (el != null) {
    if (el.style.display == "block") {
      el.style.display = "none";
    } else {
      el.style.display = "block";
    }
  }
}
// Add a selected course to the user's cart
function addToCart(courseList:Array<Course>, courseTitleList:Array<String>, 
                  newCourseString: {dept:String, number:Number, title:String, description:String}, 
                  setCourseList: (courseList: Array<Course>) => void, 
                  setCourseTitles: (courseTitleList: Array<String>) => void,
                  setCapacityPopup: (capacityPopup: boolean) => void) {
  // Make sure this course is not in cart already
  if (!courseTitleList.includes(newCourseString.title)) {
    if(courseTitleList.length < 7) {
      // Add course to cart lists if within capacity
      setCourseList(courseList.concat(newCourseString));
      setCourseTitles(courseTitleList.concat(newCourseString.title));
    } else if (courseTitleList.length >= 7) {
      // Display message to user that they have reached the 7-course limit
      setCapacityPopup(true);
    }
    // Close the description of the course in the main list
    toggleDescription(newCourseString.dept + "-" + newCourseString.number);
  }
}

const SectionHeader = styled.div`
  font-size: 30px;
  padding-top: 40px;
  margin-bottom: 20px;
`
const SmallMessage = styled.div`
  font-size: 18px;
  margin-bottom: 50px;
`
const CourseList = styled.div`
  display: flex;
  flex-direction: column;
  padding-right: 10%;
`
const CourseItem = styled.div`
  width: 100%;
`
const CoursesPageContainer = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
`
const WideStyle = {
  width: '80%'
}
const NarrowStyle = {
  width: '60%'
}

export default Courses;