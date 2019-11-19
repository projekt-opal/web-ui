import React from 'react'
import Layout from "../../../components/layout/layout";
import { Row, Container } from "reactstrap";
import { withRouter } from 'next/router'

class View extends React.Component {


    render() {
        const { router } = this.props;
        console.log(router);
        return (
            <Layout>
                <Container fluid >
                    <br />
                    <Row>
                        Row1
                    </Row>
                    <br />
                    <Row>
                        Row2
                    </Row>
                </Container>
            </Layout>
        );

    }
}

export default withRouter(View);