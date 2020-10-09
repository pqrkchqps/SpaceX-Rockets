//Displayed page after a rocket is selected
//Uses media to display the the rocket and card to seperate content

import React, {Component} from 'react';
import {
  Container, Media, Button, Row, Col, Card, Collapse
} from 'reactstrap';

import '../styles/RocketPage.scss'

class RocketPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //used to change the sort order
      sortAscending: true
    }
  }

  //Just toggles the sort order
  //Updating the sort will activate a rerender
  //which will redraw a newly sorted array
  //See Render Function for details
  toggleSort = (e) =>{
    e.preventDefault()
    const newSortOrder = !this.state.sortAscending;
    this.setState({
      sortAscending: newSortOrder
    });
  }

  //Toggles the collapse of launch data for each launch
  toggleCollapse = (launch) => (e) =>{
    e.preventDefault()
    //collapse starts out as undefined,
    //which is interpreted as true
    if (launch.collapse === undefined){
      launch.collapse = true;
    }

    //toggle the collapse state for the particular launch
    launch.collapse = !launch.collapse;

    //setState to be the same to cause a redraw of render function
    this.setState({
      sortAscending: this.state.sortAscending
    });
  }

  render () {
    let launches;

    //props never update, but state changes when the sort order changes
    //this means the launches array will need to be replaced with the new order
    if (this.state.sortAscending){
      launches = this.props.launches.sort(ascendingSort);
    } else {
      launches = this.props.launches.sort(descendingSort);
    }

    const rocket = this.props.rocket;
    return (
      <Container>
        {/*Rocket Information Card*/}
        <Container className="rocket-page-card">
          <Card>
            <Row>
              <Col><Media heading>{rocket.name}</Media></Col>
            </Row>
            <Row>
              <Col>
                <Media body>
                  {/*Check that the api has finished and flickr_images is available*/}
                  <Media object src={rocket.flickr_images && rocket.flickr_images[0]} />
                  {rocket.description}
                </Media>
              </Col>
            </Row>
          </Card>
        </Container>

        {/*Launch Container to hold launches at a reasonable width*/}
        <Container className='launches'>

          {/*Launch header card to hold toggle button and the launch header*/}
          <Card className="launch-header">
            <Row>
              {/*Spacer used to help center launches header*/}
              <Col sm="1" md="4" />
              <Col><h3>Launches</h3></Col>
              <Col>
                <Button onClick={this.toggleSort}>Date: {this.state.sortAscending ? "Ascending" : "Descending"}</Button>
              </Col>
            </Row>
          </Card>

          {/*Each launch in a seperate card listed below each other*/}
          {launches.map(launch => (
            <Card key={launch.id} className='launch'>
              <Row><Col /><h4 onClick={this.toggleCollapse(launch)}>Name: {launch.name}</h4><Col /></Row>
              <Collapse isOpen={launch.collapse === false}>
                <Row>
                  <Col lg="3">Flight Number: {launch.flight_number}</Col>
                  <Col>Date (UTC): {launch.date_utc}</Col>
                </Row>
                <Row>
                  <Col>Success: {launch.success ? "Yes" : "No"}</Col>
                  <Col>Recovered: {(launch.fairings && launch.fairings.recovered) ? "Yes" : "No"}</Col>
                  <Col>Reused: {(launch.fairings && launch.fairings.reused) ? "Yes" : "No"}</Col>
                </Row>
                <Row><Col className="launch-details">Details: {launch.details ? launch.details : "None"}</Col></Row>
                {launch.failures[0] ? (
                  <div>
                    <Row><Col sm="4" md="4"><h6 className="failures-header">Failures:</h6></Col></Row>

                    {/*Each launch failure is indexed by a number*/}
                    {launch.failures.map((failure, i) => (
                      <Row><Col>{(i+1) + ": " + failure.reason}</Col></Row>
                    ))}
                  </div>
                ) : ''}
              </Collapse>
            </Card>
          ))}

        </Container>
      </Container>
    );
  }
}

//Two simple compare functions to pass to sort
const ascendingSort = (a, b) => {
  if (a.date_utc > b.date_utc){
    return 1;
  } else if (a.date_utc < b.date_utc){
    return -1;
  }
  else {
    return 0;
  }
}

const descendingSort = (a, b) => {
  if (a.date_utc < b.date_utc){
    return 1;
  } else if (a.date_utc > b.date_utc){
    return -1;
  }
  else {
    return 0;
  }
}

export default RocketPage;
