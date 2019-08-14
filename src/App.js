import React, { Component } from 'react';
import 'typeface-roboto';
import Fab from '@material-ui/core/Fab';
import Typography from '@material-ui/core/Typography';
import PlayArrowOutlinedIcon from '@material-ui/icons/PlayArrowOutlined';
import PauseOutlinedIcon from '@material-ui/icons/PauseOutlined';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {powerOn: false, speed: 0}
  }

  componentWillUnmount(){
    this.setState({
      powerOn:false
    })
  }

  getNetwork = () => {
    const connectionInfo = navigator.connection

    this.setState({
      powerOn: true,
      speed: connectionInfo.downlink
    })

    const changeFunc = (e) => this.state.powerOn && this.setState({speed: e.target.downlink})

    navigator.connection.onchange = changeFunc;
  }

  render() {
    return (
      <div style={{
        background: 'linear-gradient(to right bottom, #ffefba, #ffffff)'
      }}>
        <div 
          style={{height: '100vh',display:'flex',flexDirection:'column', justifyContent:'center', alignItems:'center'}}
        >
          <Typography style={{marginBottom: 50}} variant="h1">{this.state.speed}Mbps</Typography>
          {!this.state.powerOn ?
          <Fab style={{
            width: 120,
            background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
            border: 0,
            boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
            color: 'white'
          }} variant="extended" size="large" onClick={this.getNetwork}><PlayArrowOutlinedIcon/>Start</Fab>:
          <Fab style={{
            width: 120,
            background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
            border: 0,
            boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
            color: 'white',
          }} color='secondary' size="large" variant="extended" onClick={()=>this.setState({powerOn:false, speed:0})}><PauseOutlinedIcon/>Stop</Fab>
          }
        </div>
      </div>
    );
  }
}

export default App;