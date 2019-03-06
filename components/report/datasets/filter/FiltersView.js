import React from 'react';
import {Col, Container, Row} from "reactstrap";

import FilterView from './fileterView';

const filtersView = (props) => {
    return (
        <Container fluid >
            {props.filters.map( (filter, idx) => <Row key={idx}><Col md={{size: 12}}><FilterView filter={filter}/></Col></Row>)}
        </Container>
    );
};

export default filtersView;