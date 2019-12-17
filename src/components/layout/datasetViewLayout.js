import React from 'react';
import {Badge, Col, Container, Row, Table,} from "reactstrap";
import {FaRegStar, FaStar, FaStarHalfAlt} from "react-icons/fa";
import ReactTooltip from 'react-tooltip';

class DatasetViewLayout extends React.Component {

    state = {
        dataset: null
    };

    componentDidMount() {
        console.log(this.props.dataSet);
        this.setState({ dataSet: this.props.dataset })
    }

    countRating = (overallRating) => {
        const rating = [0, 0, 0, 0, 0];
        for (let i = 1; i <= overallRating; i++)
            rating[i - 1] = 2;
        if (overallRating - Math.floor(overallRating) >= 0.5)
            rating[Math.floor(overallRating)] = 1;
        return (<span>
            {
                rating.map((r, idx) => r === 0 ? <FaRegStar key={idx} /> : r === 1 ? <FaStarHalfAlt key={idx} /> :
                    <FaStar key={idx} />)
            }
        </span>);
    };

    render() {
        const metaDataInfo = [];
        let overallRatingMain = <span />;
        if (this.state.dataSet) {
            if (this.state.dataSet.issueDate) metaDataInfo["issueDate"] = this.state.dataSet.issueDate;
            if (this.state.dataSet.theme) metaDataInfo["theme"] = this.state.dataSet.theme;
            // if(dataset.keywords) metaDataInfo.push({keywords: dataset.keywords});
            // if(dataset.issueDate) metaDataInfo.push({issueDate: dataset.issueDate});
            if (this.state.dataSet.overallRating)
                overallRatingMain = this.countRating(this.state.dataSet.overallRating);
        } else return '';

        return (
            <Container fluid>
                <Row>
                    <Col>
                        <h3 style={{ marginTop: '.5rem', marginBottom: '0' }}>
                            {this.state.dataSet == null ? '' : this.state.dataSet.title}</h3></Col>
                </Row>
                <hr />
                <Row>
                    <Col md='7'>
                        <h5>Description:</h5>
                        <p>{this.state.dataSet == null ? '' : this.state.dataSet.description}</p>

                        <h5>Data File(s):</h5>
                        <div>
                            {
                                <div>{this.state.dataSet == null ? '' : this.state.dataSet.publisher.name}</div>
                            }
                            <div>{this.state.dataSet == null ? '' : this.state.dataSet.publisher.publisher}</div>
                        </div>

                        {this.state.dataSet == null ? '' : this.state.dataSet.distributions.map((distribution, idx) => {
                            return <div key={idx}>
                                <Badge>{distribution.fileType}</Badge>&nbsp;

                                <a href={distribution.url}>{distribution.url}</a>


                            </div>
                        })}
                    </Col>
                    <Col md='5'>
                        <h5>Metadata Info:</h5>
                        <div>
                            <Table bordered style={{ tableLayout: 'fixed', width: '100%', wordWrap: 'break-word' }}>
                                <tbody>
                                    {
                                        Object.keys(metaDataInfo).map((key, idx) => {
                                            return <tr key={idx}>
                                                <td>{key}</td>
                                                <td>{metaDataInfo[key]}</td>
                                            </tr>
                                        })
                                    }
                                </tbody>
                            </Table>
                        </div>
                    </Col>
                </Row>
                <hr />
                <Row>
                    <Col md='7'>
                        <h5>Quality Metrics:</h5>
                        <Table bordered style={{ tableLayout: 'fixed', width: '100%', wordWrap: 'break-word' }}>
                            <thead>
                                <tr>
                                    <th>Overall score</th>
                                    <th>
                                        {overallRatingMain}
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.dataSet.qualityMetrics.map((metric, idx) => {
                                        return (
                                            <tr key={idx}>
                                                <td><span data-tip="some text">{metric.quality}</span>
                                                    <ReactTooltip place="bottom" />
                                                </td>
                                                <td>{metric.value}</td>
                                            </tr>
                                        );
                                    })
                                }
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default DatasetViewLayout;