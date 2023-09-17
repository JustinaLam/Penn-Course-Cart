import styled from 'styled-components';
import { CheckoutProps } from './Checkout';

// Page displayed when the user checks out their cart
const Receipt = ({courseList, courseTitleList}: CheckoutProps) => (
    <CoursesPageContainer style={WideStyle}>
      <CourseList>
      <SectionHeader>
        Check Out: Your Course Cart Receipt
      </SectionHeader>
      {/* Simple list of courses in the user's cart at the time of checkout */}
      <ReceiptList>
        {courseList.length > 0 ?
        (courseList.map(({dept, number, title, description}, index) => (
            // For each course, display the course code and title
            <CourseItem key={index}>
                <p className='receiptListing'>
                {dept + ' ' + number + ': ' + title}
                </p>
                <p className='description' id={dept+"-"+number}>
                Description:<br></br>
                {description}<br></br>
                </p>
            </CourseItem>
            ))
        ):
        (
            // If cart size is 0, display the appropriate message
            <SmallMessage>
                Your course cart is empty.
            </SmallMessage>
        )
        }
      </ReceiptList>
      </CourseList>
    </CoursesPageContainer>
)

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
  // border: 1px solid blue;
`
const CoursesPageContainer = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  // border: 1px solid red;
`
const ReceiptList = styled.div`
  border: 1px solid rgb(0,0,0,0.2);
  border-radius: 10px;
  padding: 10px 15px;
  cursor: default;
`
const WideStyle = {
  width: '80%'
}
const NarrowStyle = {
  width: '60%'
}

export default Receipt;