import React from 'react'
import Layout from "../components/layout/layout";
import SearchBar from '../components/search/SearchBar'
import {Row} from "reactstrap";

const Home = () => (
    <Layout>
        <main className="container-fluid">
            <br />
            <Row>
                <SearchBar/>
            </Row>
            <Row>
                test
            </Row>
        </main>
    </Layout>
);

export default Home
