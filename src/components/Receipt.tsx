import styled from 'styled-components';
import {Course} from '../App';
import {CourseInfo} from '../App';
import {Section} from '../App';
import { CheckoutProps } from './Checkout';
import { useState, useEffect, useRef } from "react";
import { useLocation } from 'react-router-dom';

const semestersList = ['2020C', '2021A', '2021C', '2022A']
const statusMap = new Map()
const daysMap = new Map()


// Receipt page displayed when the user checks out their cart
const Receipt = ({courseList, courseTitleList}: CheckoutProps) => {
  const {state} = useLocation();
  const [semester, setSemester] = useState<string>("2022A")
  const [coursesInfo, setCoursesInfo] = useState(state && state.coursesInfo ? state.coursesInfo : new Array<CourseInfo>())

  // Set statusMap
  statusMap.set("O", "Open")
  statusMap.set("C", "Closed")
  statusMap.set("X", "Cancelled")
  statusMap.set("", "Unlisted")
  // Set daysMap
  daysMap.set("FMW", "MWF")
  daysMap.set("RT", "TR")
  daysMap.set("","Unknown")

  // Function to call API for a single course; return a Promise 
  function callAPICourse(course: Course, semester: string) {
    return new Promise<CourseInfo>((resolve,reject) => {
      fetch('/api/base/' + semester + '/courses/' + course.dept + '-' + course.number + '/')
        .then(res => res.json())
        .then(data => {
          // Create new CourseInfo object for info retrieved from API for this course
          const newCourseInfo:CourseInfo = {
            dept: course.dept,
            number: course.number,
            title: course.title,
            description: course.description,
            courseQuality: -1,
            instructorQuality: -1,
            difficulty: -1,
            workRequired: -1,
            sections: [],
          }
          if (!data || data.detail == "Not found.") {
            // Course not found by API call; return only course information
            console.log("Course " + course.dept + "-" + course.number + " not found")
          } else {
            // Update variables for info retrieved from API
            newCourseInfo.courseQuality = data.course_quality
            newCourseInfo.instructorQuality = data.instructor_quality
            newCourseInfo.difficulty = data.difficulty
            newCourseInfo.workRequired = data.work_required
            // Lecture sections info
            const sections:Section[] = []
            data.sections.forEach((rawSection:any) => {
              if (rawSection.activity == "LEC") {
                // Get days the class meets (e.g. MWF)
                var days = ""
                var m
                for (m = 0; m < rawSection.meetings.length; m++) {
                  days += rawSection.meetings[m].day
                }
                // Get time the class meets
                var time = ""
                if (days != "") {
                  // Get start time
                  var hour = Math.floor(rawSection.meetings[0].start)
                  var minutes = String(Math.floor((rawSection.meetings[0].start - hour) * 100))
                  hour = (hour % 12 == 0 ? 12 : hour % 12)
                  time += hour + ":" + minutes.padStart(2, "0");
                  // Get end time
                  hour = Math.floor(rawSection.meetings[0].end)
                  var minutes = String(Math.floor((rawSection.meetings[0].end - hour) * 100))
                  hour = (hour % 12 == 0 ? 12 : hour % 12)
                  time += " - " + hour + ":" + minutes.padStart(2, "0");
                }
                // Create Section object for this course lecture section
                var newSection:Section = {
                  id: rawSection.id,
                  status: (statusMap.has(rawSection.status) ? statusMap.get(rawSection.status) : rawSection.status),
                  days: (daysMap.has(days) ? daysMap.get(days) : days),
                  time: time,
                }
                sections.push(newSection)
              }
            })
            newCourseInfo.sections = sections
          }
          resolve(newCourseInfo)
        })
    });
  }

  // Function to iterate through courses in cart and call API for information on each
  const callAPI = (courseList:Array<Course>, semester:string, coursesInfo:Array<CourseInfo>, setCoursesInfo:(coursesInfo: Array<CourseInfo>) => void) => {
    var results:Promise<CourseInfo>[] = new Array<Promise<CourseInfo>>
    courseList.forEach((course) => {
      results.push(callAPICourse(course, semester))
    })
    // Wait for all new CourseInfo objects to be generated before updating state variable
    Promise.all(results).then((allResults) => {
      setCoursesInfo(allResults)
    })
  }

  // Update semester on click for API calls
  function updateSemester(sem: string, setSemester:(semester: string) => void) {
    setSemester(sem);
    var i;
    // Set appropriate color for each semester in defined list
    for (i = 0; i < semestersList.length; i++) {
      var el = document.getElementById(semestersList[i]);
      if (el != null) {
        if (semestersList[i] == sem) {
          // Set selected semester to dark blue background, white text
          el.style.backgroundColor = "rgb(1, 31, 91)";
          el.style.color = "white";
        } else {
          // Set all other semesters to grey background, dark blue text
          el.style.backgroundColor = "rgb(240, 240, 240)";
          el.style.color = "rgb(1, 31, 91)";
        }
      }
    }
    // Call API to update results only after semester state variable is updated 
    // (see useEffect for semester)
  }

  // Initially: set default semester button to selected, call API
  useEffect(() => {
    var el = document.getElementById(semester);
    if (el != null) {
      el.style.backgroundColor = "rgb(1, 31, 91)";
      el.style.color = "white";
    }
    if (coursesInfo.length == 0) {
      callAPI(courseList, semester, coursesInfo, setCoursesInfo);
    }
  }, []);
  
  // After semester updated
  useEffect(() => {
    // Call API to update results
    setCoursesInfo([])
    callAPI(courseList, semester, coursesInfo, setCoursesInfo)
  }, [semester]);


  // -------------------- Component ultimately returned and rendered: --------------------
  return (
    <CoursesPageContainer style={WideStyle}>
      <CourseList>
      <SectionHeader>
        Check Out: Your Course Cart Receipt
      </SectionHeader>

      <SemesterButtonRow>
        {/* Display a button for each semester in the defined list */}
        {semestersList.map((sem,index) => (
          <SemesterButton onClick={() => updateSemester(sem, setSemester)} id={sem}>{sem.substring(0,4)} {sem.endsWith('A') ? "Fall" : "Spring"}</SemesterButton>
        ))}
      </SemesterButtonRow>

      {/* Simple list of courses in the user's cart at the time of checkout */}
      <ReceiptList>
        {coursesInfo.length > 0 ?
        (coursesInfo.map(({dept, number, title, description, courseQuality, instructorQuality, difficulty, workRequired, sections}:CourseInfo, index:number) => (
            // For each course, display the course code and title
            <CourseItem key={index}>
                <p className='receiptListing'>
                {dept + ' ' + number + ': ' + title}
                </p>
                {courseQuality != -1 ? 
                (
                  <>
                  <MoreInfo id={"cart-" + dept+"-"+number}>
                  Course Quality: {String(courseQuality)}<br></br>
                  Instructor Quality: {String(instructorQuality)}<br></br>
                  Difficulty: {String(difficulty)}<br></br>
                  Work Required: {String(workRequired)}
                  </MoreInfo>
                  {sections.map((section,index) => (
                    <MoreInfo>
                      LEC Section: {String(section.id)}<br></br>
                      Status: {String(section.status)}<br></br>
                      Days: {String(section.days)}<br></br>
                      Time: {String(section.time)}
                    </MoreInfo>
                  ))}
                  </>
                )
                :
                (<MoreInfo>Not found in system for this semester.</MoreInfo>)
                }
            </CourseItem>
            ))
        ):
        (<>
          <SmallMessage>
            <br></br>Loading API results...
          </SmallMessage>
          {courseList.length > 0 ?
            (courseList.map(({dept, number, title, description}, index) => (
              // For each course that was not recognized by the API, display only course code and title
              <CourseItem key={index}>
                  <p className='receiptListing'>
                  {dept + ' ' + number + ': ' + title}
                  </p>
              </CourseItem>
              ))
            ) 
            :
            (
              // If cart size is 0, display the appropriate message
              <SmallMessage>
                  Your course cart is empty.
              </SmallMessage>
            )
          }
        </>)
        }
      </ReceiptList>
      </CourseList>
    </CoursesPageContainer>
  )
}

const SectionHeader = styled.div`
  font-size: 30px;
  padding-top: 40px;
  margin-bottom: 20px;
`
const SemesterButtonRow = styled.div`
    padding: 0;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`
const SemesterButton = styled.button`
    display: inline-block;
    justify-content: center;
    background-color: rgb(240, 240, 240);
    
    width: auto;
    height: auto;
    font-size: 17px;
    font-weight: 600;

    border: 2px solid rgb(1, 31, 91);
    color: rgb(1, 31, 91);
    border-radius: 10px;

    padding: 0.5em 0.75em;
    margin: 0 0.1em 1.25em;
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
const MoreInfo = styled.p`
  font-size: 15px;
  margin-left: 20px;
  color: rgb(80,80,80);
  z-index: 1;
  // margin-top: -25px;
  padding-top: 0;
`
const CoursesPageContainer = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
`
const ReceiptList = styled.div`
  border: 1px solid rgb(0,0,0,0.2);
  border-radius: 10px;
  padding: 0px 15px;
  cursor: default;
  padding-bottom: 20px;
`
const WideStyle = {
  width: '80%'
}

export default Receipt;