import React from 'react'
import Layout from "../components/layout/layout";
import SearchBar from '../components/search/SearchBar'
import {Row, Container} from "reactstrap";
import TableView from "../components/report/datasets/table/TableView";

const Home = () => (
    <Layout>
        <Container fluid >
            <br />
            <Row>
                <SearchBar/>
            </Row>
            <br/>
            <Row>
                <TableView/>
            </Row>
        </Container>
    </Layout>
);

export default Home
