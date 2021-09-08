import React, { Component } from 'react';
import axios from 'axios';
import loader from './loader/preloader.gif';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      loading:true,
      Count:0,
      playerList:[],
      playerDetails:{},
      showbtn:true
    }
  }

  Showdetails=()=>{
    axios.get("https://stark-reaches-89913.herokuapp.com/players").then(({data})=>{
      this.setState({playerList:data,loading:false,showbtn:false},this.getDetails);
    })
  }
  incrementPlayers=()=>{
    const {Count}=this.state;
    this.setState({Count:Count+1},this.getDetails);
  }
  decrementPlayers=()=>{
    const {Count}=this.state;
    this.setState({Count:Count-1},this.getDetails);
  }
  getDetails=()=>{
    const {Count,playerList}=this.state;
    this.setState({playerDetails:playerList[Count]});
  }
  

  render() { 
    const {playerList,loading,playerDetails,Count,showbtn}=this.state;
    const {Photo,PlayerName,Country,Born,BirtPlace,Batting,Bowling,Role,Description}=playerDetails;
    return ( 
      <React.Fragment>
        <div id="headding-div">
          <h1>Cricket Player Details</h1>
        </div>
          {showbtn===true?<button onClick={this.Showdetails} id="showbtn">Show Player Details</button>:<>
        { loading=== true ?<div id="loading-div"><img src={loader}/></div>:<>
          {Count===0?<></>:<button id="prev-button" onClick={this.decrementPlayers}>Prev</button>}
          {Count===playerList.length-1?<></>:<button id="next-button" onClick={this.incrementPlayers}>Next</button>}
        
        
          <div>
            <div id="player-details">
              <div id="player-image-div">
                <img id="player-details-image" src={Photo}/>
              </div>
              <div id="player-details-div">
                <h1 id="player-title">{PlayerName}</h1>
                <h2 id="player-brand">{Country}</h2>
                <h4 className="player-section-heading">Born:  <p className="player-personal-details">{Born}</p></h4>
                <h4 className="player-section-heading">BirthPlace:  <p className="player-personal-details">{BirtPlace}</p></h4>
                <h4 className="player-section-heading">Batting:  <p className="player-personal-details">{Batting}</p></h4>
                <h4 className="player-section-heading">Bowling:  <p className="player-personal-details">{Bowling}</p></h4>
                <h4 className="player-section-heading">Role:  <p className="player-personal-details">{Role}</p></h4>
                <h4 className="player-section-heading">Description:  </h4>
                <p className="player-personal-details">{Description}</p>
              </div>
            </div>
          </div>
        </>}
        </>}

      </React.Fragment>
    );
  }
}
 
export default App;