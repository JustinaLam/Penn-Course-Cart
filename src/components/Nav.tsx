import {NavProps} from "../App"
import styled from 'styled-components';
import { TbCircle1, TbCircle2, TbCircle3, TbCircle4, TbCircle5, TbCircle6, TbCircle7 } from 'react-icons/tb'
import { BsDash } from 'react-icons/bs'


const Nav = (props: NavProps) => (
  <NavBar id="nav">
    <h2 id="logo">Penn Course Cart</h2>
    <input type="text" id="searchBar" placeholder="Enter a course" onKeyUp={() => handleSearchInput(props)}></input>

    {/* Cart icon */}
    {/* <img src="https://user-images.githubusercontent.com/88551260/191154491-a20640f3-e005-4fc4-8fd9-5a30de85da9d.png" */}
    <img src="https://user-images.githubusercontent.com/88551260/215313621-3ac115b3-229d-4d82-b285-fd71dc17cdc2.png"
      id="cartImg"
      onClick={() => props.setCartVisibility(!props.cartVisible)}>
    </img>
    <div id="cart-ct">
      {(() => {
        switch (props.courseTitleList.length) {
          case 1:
            return (<TbCircle1 size="2em"></TbCircle1>)
          case 2:
            return (<TbCircle2 size="2em"></TbCircle2>)
          case 3:
            return (<TbCircle3 size="2em"></TbCircle3>)
          case 4:
            return (<TbCircle4 size="2em"></TbCircle4>)
          case 5:
            return (<TbCircle5 size="2em"></TbCircle5>)
          case 6:
            return (<TbCircle6 size="2em"></TbCircle6>)
          case 7:
            return (<TbCircle7 size="2em"></TbCircle7>)
          default:
        }
      })()}
    </div>
    {/* Filter icon and counter */}
    <img src="https://user-images.githubusercontent.com/88551260/215313407-a059fd08-8dab-4c97-a5a1-f08bfc09136f.png"
      id="filterImg"
      onClick={() => props.setFilterVisibility(!props.filterVisible)}>
    </img>
    {/* Filter min and max text input fields */}
    {props.filterVisible && 
      <>
      <Bound type="text" id="leftBound" placeholder="Min" value={props.min.toString()} 
          onChange={(e) => props.setMin(e.target.value.length > 0 ? parseInt(e.target.value) : 0)}/>
      <Dash>
        <BsDash/>
      </Dash>
      <Bound type="text" id="rightBound" placeholder="Max" value={props.max == 8000 ? "" : props.max.toString()} 
          onChange={(e) => props.setMax(e.target.value.length > 0 ? parseInt(e.target.value) : 8000)}/>
      </>
    }
  </NavBar>
)

function handleSearchInput(props: NavProps) {
  var searchBar = document.getElementById("searchBar") as HTMLInputElement;
  props.setSearchInput(searchBar.value);
}

const NavBar = styled.div`
  background-color: rgb(1, 31, 91);
  width: 100%;
  padding: 0 1rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  min-height: 100px;
  color: white;
`
const Bound = styled.input`
  position: relative;
  float: left;
  padding: 14px 16px;
  border: 0px;
  border-radius: 15px;
  margin-top: 25px;
  // margin-left: -5px;
  margin-right: 20px;
  font-size: 17px;
  color: #5f5f5f;
  width: 50px; 
`
const Dash = styled.div`
  float: left;
  padding: 0;//14px 16px;
  border: 0px;
  border-radius: 15px;
  margin-top: 40px;
  margin-left: -5px;
  // margin-right: 20px;
  font-size: 25px;
  color: white;
  width: 50px; 
`

export default Nav;
