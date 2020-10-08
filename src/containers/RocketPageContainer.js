//Container designed to hold the RocketPage for a particular rockets

import React, {Component} from 'react';
import RocketPage from '../components/RocketPage'
import axios from 'axios';

//Uses with withRouter to get the id of the rocket from the URL
import { withRouter } from "react-router";

class RocketPageContainer extends Component {
  constructor (props){
    super(props);
    this.state = {
      //id of rocket
      id: null,

      //rocket and launches to be passed to RocketPage
      launches: [],
      rocket: {}
    }
  }

  componentDidMount(){
    //Get id param from URL
    const {id} = this.props.match.params;
    this.setState({id: id});

    //Uses two api calls to get launch and rocket data
    axios.get('https://api.spacexdata.com/v4/launches')
    .then(res => {
      //It filters the response data for the rocket id
      const launches = res.data.filter(launch => launch.rocket===id)
      this.setState({launches: launches});
    })
    axios.get('https://api.spacexdata.com/v4/rockets')
    .then(res => {
      const rocket = res.data.filter(rocket => rocket.id===id)[0];
      this.setState({rocket: rocket});
    })
  }

  render() {
    return (
      <div className="rocket-page-container">
        <RocketPage
          id={this.state.id}
          key={this.state.id}
          launches={this.state.launches}
          rocket={this.state.rocket}
        />
      </div>
    );
  }
}

export default withRouter(RocketPageContainer);
