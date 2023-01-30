import {CapacityPopupProps} from "./Home"
import styled from 'styled-components'
import { BiXCircle } from 'react-icons/bi'


const CapacityPopup = ({capacityPopup, setCapacityPopup}: CapacityPopupProps) => {
    return (
        <Container>
            <StyledBiXCircle size="3em" onClick={e=>setCapacityPopup(!capacityPopup)}/>
            <Header>
                You have reached the maximum cart capacity of 7 courses. <br></br>
                Please remove one from your cart in order to add more.
            </Header>
        </Container>
    )
}

const Header = styled.div`
    font-size: 160%; 
    text-align: center; 
    border-bottom: 4px dashed black;
    padding: 10%; 
    width: 80%; 
    margin: auto;
`
const StyledBiXCircle = styled(BiXCircle)`
    left: 100%; 
    transform: translateX(-100%); 
    position: absolute; 
    float: right; 
    size: 5em;
    &:hover {
        color: lightblue; 
    }
`
const Container = styled.div`
    background: rgb(179, 237, 255); 
    width: 60vh; 
    height: 40vh; 
    position: fixed;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
    z-index: 2;
    box-shadow: 1.7px 3.4px 3.4px hsl(0deg 0% 0% / 0.2);
    border-radius: 20px; 
    display: flex; 
    flex-direction: column; 
    align-items: center; 
`
export default CapacityPopup 
