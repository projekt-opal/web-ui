import React from 'react'
import Layout from "../../../components/layout/layout";
import { Button, Col, Container, Row, Table } from "reactstrap";
import { withRouter } from 'next/router';
import Link from 'next/link';

class View extends React.Component {

    // static async getInitialProps({query, res}) {
    //     if (!(['keywords', 'licenses', 'providers'].includes(query.field))) {
    //         res.writeHead(302, {Location: '/'});
    //         res.end()
    //     }
    // }

    state = {
        fields: [
            {
                info: {
                    title: 'CC_BY',
                    href: '#'
                },
                additional: {
                    title: 'Creative Common License',
                    href: '#'
                },
                count: 10
            },
            {
                info: {
                    title: 'CC_BY3',
                    href: '#'
                },
                additional: {
                    title: 'Creative Common License',
                    href: '#'
                },
                count: 1032
            },
            {
                info: {
                    title: 'CC_BY2',
                    href: '#'
                },
                additional: {
                    title: 'Creative Common License',
                    href: '#'
                },
                count: 76
            },
            {
                info: {
                    title: 'CC_BY4',
                    href: '#'
                },
                additional: {
                    title: 'Creative Common License',
                    href: '#'
                },
                count: 52
            }
        ]
    };

    load10More = () => {
        console.log("load10More");
    };

    storeRelatedLicenseInfo = (title) => {
        console.log(title);
        window.localStorage.setItem("LICENSE_NAME", title);
    }

    render() {
        // const { router } = this.props;
        // let field = router.query.field;
        // field = field.charAt(0).toUpperCase() + field.slice(1);

        const f = this.state.fields.map((f, idx) => (
            <tr key={idx}>
                <td>
                    <div style={{ display: 'flex', flexFlow: 'row wrap' }}>
                        <Link><a href="./one" target="_blank" >
                            <Button
                                style={{ background: 'transparent', border: 'none', color: 'black' }} onClick={() => this.storeRelatedLicenseInfo(f.info.title)}>

                                <h5> {f.info.title}</h5>
                            </Button></a></Link>

                        <div style={{ flexGrow: 1 }} />
                        <span>{f.count}</span>
                    </div>
                    {
                        f.additional && (
                            <>
                                {f.additional.title}
                            </>
                        )
                    }
                </td>
            </tr>
        ));

        return (
            <Layout>
                <Container style={{ 'marginTop': '2rem' }}>
                    <Row>
                        <Col>
                            <Table hover bordered responsive striped>
                                <thead>
                                    <tr>
                                        <th>Browse Datasets by License</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {f}
                                </tbody>
                            </Table>
                            <Row>
                                <Button className="mx-auto" style={{ marginBottom: '1rem' }} onClick={this.load10More}
                                    disabled={this.props.dataSets === null}> Load
                                    10 more </Button>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </Layout>
        );

    }
}

export default withRouter(View);