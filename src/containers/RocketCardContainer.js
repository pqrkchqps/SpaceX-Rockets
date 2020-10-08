//Container designed to fetch data and display cards for each rocket retrieved
//Simple state based component that holds the rockets in its state
//and passes each rocket to a corresponding RocketCard through props

import React, {Component} from 'react';
import RocketCard from '../components/RocketCard';
import {Row} from 'reactstrap';
import axios from 'axios';
import '../styles/RocketCardContainer.scss';

class RocketCardContainer extends Component {
  constructor (props){
    super(props);
    this.state = {
      rockets: []
    }
  }
  componentDidMount(){
    //Get rocket data from spacex api and set state of rockets with data
    axios.get('https://api.spacexdata.com/v4/rockets')
    .then(res => {
      this.setState({rockets: res.data});
    })
  }
  render() {
    return (
      <Row className="rocket-card-container">
        {this.state.rockets.map(rocket => (
          <RocketCard id={rocket.id} key={rocket.id} title={rocket.name} text={rocket.description} image_src={rocket.flickr_images[0]} />
        ))}
      </Row>
    );
  }

}

export default RocketCardContainer;
