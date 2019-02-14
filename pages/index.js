import React from 'react'
import Layout from "../components/layout/layout";
import SearchBar from '../components/search/SearchBar'
import {Row} from "reactstrap";
import TableView from "../components/report/datasets/table/TableView";

const Home = () => (
    <Layout>
        <main className="container-fluid">
            <br />
            <Row>
                <SearchBar/>
            </Row>
            <br />
            <Row>
                <TableView />
            </Row>
        </main>
    </Layout>
);

export default Home
