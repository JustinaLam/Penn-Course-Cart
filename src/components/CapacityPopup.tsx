import {CapacityPopupProps} from "./Home"
import React, { useState, useEffect } from 'react'
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
const FriendBoxContainer = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    width: 80%;
    overflow-y: auto;
`

const FriendBox = styled.div`
    padding: 20px; 
    font-size: 30px; 
    display: inline-flex;   
    width: 50%;
    margin: 20px;
    z-index: 3;
    box-shadow: 1.7px 3.4px 3.4px hsl(0deg 0% 0% / 0.2);
    border-radius: 10px;
    background-color: #fdfdfd;
`
const Image = styled.img`
    height: 40px;
    width: 40px; 
    border-radius: 50%;
    margin-right: 20%;
`

const EmptyMsg = styled.div`
    padding: 20px;
    margin: 20px;
    text-align: center;
    width: 100%;
    font-size: 30px; 
    display: inline-flex;
`

export default CapacityPopup 
