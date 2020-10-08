//Displays on root of site.
//Selecting a card will display the rocket on a seperate RocketPage
//with all the launches for that rockets

//Simple component that just displays from props

import React from 'react';
import {
  Card, CardImg, CardText, CardBody, CardTitle, Col
} from 'reactstrap';

import { Link } from "react-router-dom";

import '../styles/RocketCard.scss'

const RocketCard = (props) => {
  return (
    <Col className="rocket-col">
      <Link to={"/rocket/"+props.id} >
        <Card className="rocket-card">
          <CardTitle><h3>{props.title}</h3></CardTitle>
          <CardBody>
            <CardImg top width="100%" src={props.image_src} />
            <CardText>{props.text}</CardText>
          </CardBody>
        </Card>
      </Link>
    </Col>
  );
}

export default RocketCard;
