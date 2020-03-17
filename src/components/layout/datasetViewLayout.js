import React from 'react';
import {Badge, Col, Container, Row, Table, Collapse, Button} from "reactstrap";
import {FaRegStar, FaStar, FaStarHalfAlt} from "react-icons/fa";
import ReactTooltip from 'react-tooltip';

class DatasetViewLayout extends React.Component {

    state = {
        isOpenDistributions: false,
    };

    toggle = () => {
        this.setState({
            isOpenDistributions: !this.state.isOpenDistributions
        });
    };


    countRating = (overallRating) => {
        const rating = [0, 0, 0, 0, 0];
        for (let i = 1; i <= overallRating; i++)
            rating[i - 1] = 2;
        if (overallRating - Math.floor(overallRating) >= 0.5)
            rating[Math.floor(overallRating)] = 1;
        return (<span>
            {
                rating.map((r, idx) => r === 0 ? <FaRegStar key={idx}/> : r === 1 ? <FaStarHalfAlt key={idx}/> :
                    <FaStar key={idx}/>)
            }
        </span>);
    };


    getTitle() {
        return this.props.dataSet.title ? this.props.dataSet.title : this.props.dataSet.title_de;
    }

    getDescription() {
        return this.props.dataSet.description ? this.props.dataSet.description : this.props.dataSet.description_de;
    }



    render() {
        const metaDataInfo = [];
        let overallRatingMain = <span/>;
        if (this.props.dataSet) {
            if (this.props.dataSet.issueDate) metaDataInfo["issueDate"] = this.props.dataSet.issueDate;
            if (this.props.dataSet.theme) metaDataInfo["theme"] = this.props.dataSet.theme;
            if (this.props.dataSet.keywords) metaDataInfo["keywords"] = this.props.dataSet.keywords.join(", ");
            if (this.props.dataSet.modified) metaDataInfo["modified"] = this.props.dataSet.modified;
            if (this.props.dataSet.identifier) metaDataInfo["identifier"] = this.props.dataSet.identifier;
            if (this.props.dataSet.language) metaDataInfo["language"] = this.props.dataSet.language;
            if (this.props.dataSet.contactPoint) metaDataInfo["contactPoint"] = this.props.dataSet.contactPoint;
            if (this.props.dataSet.temporal) metaDataInfo["temporal"] = this.props.dataSet.temporal;
            if (this.props.dataSet.spatial) metaDataInfo["spatial"] = this.props.dataSet.spatial;
            if (this.props.dataSet.accrualPeriodicity) metaDataInfo["accrualPeriodicity"] = this.props.dataSet.accrualPeriodicity;
            if (this.props.dataSet.landingPage) metaDataInfo["landingPage"] = this.props.dataSet.landingPage;
            if (this.props.dataSet.overallRating)
                overallRatingMain = this.countRating(this.props.dataSet.overallRating);
        } else return '';

        return (
            <Container fluid>
                <Row>
                    <Col>
                        <h3 style={{marginTop: '.5rem', marginBottom: '0'}}>
                            {this.props.dataSet == null ? '' : this.getTitle()}</h3></Col>
                </Row>
                <hr/>
                <Row>
                    <Col md='12'>
                        <h5>Description:</h5>
                        <p>{this.props.dataSet == null ? '' : this.getDescription()}</p>

                        <h5>Distribution(s):<Button color="link" onClick={this.toggle}>{this.state.isOpenDistributions ? 'collapse' : 'expand'}</Button></h5>
                        <Collapse isOpen={this.state.isOpenDistributions}>
                            <div>
                                {
                                    <div>{this.props.dataSet !== null && this.props.dataSet.publisher ?
                                        this.props.dataSet.publisher.name : ""}</div>
                                }
                                <div>{this.props.dataSet !== null && this.props.dataSet.publisher ?
                                    this.props.dataSet.publisher.publisher : ""}</div>
                            </div>

                            {
                                this.props.dataSet !== null && this.props.dataSet.distributions ?
                                    this.props.dataSet.distributions.map((distribution, idx) => {
                                        return <div key={idx}>
                                            <Table bordered style={{tableLayout: 'fixed', width: '100%', wordWrap: 'break-word'}}>
                                                <tbody>
                                                    <tr>
                                                        <td>
                                                            <div className="container">
                                                              <div className="row">
                                                                <div className="col-5">
                                                                    <div>Issued: {distribution.issued}</div>
                                                                    <div>Modified: {distribution.modified}</div>
                                                                    <div>License: {distribution.license && distribution.license.uri}</div>
                                                                    <div>Rights: {distribution.rights}</div>
                                                                </div>
                                                                <div className="col-5">                                                       
                                                                    <div>AccessUrl: {distribution.accessUrl}</div>
                                                                    <div>MediaType: {distribution.mediaType}</div>
                                                                    <div>ByteSize: {distribution.byteSize}</div>
                                                                    DownloadUrl: <Badge>{distribution.fileType}</Badge>&nbsp;
                                                                    <a href={distribution.url}>{distribution.url}</a>
                                                                </div>
                                                             </div>
                                                            </div>     
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </Table>
                                        </div>
                                    })
                                    : ""
                            }
                        </Collapse>
                    </Col>
                </Row>
                <Row>
                    <Col md='12'>
                        <h5>Metadata Info:</h5>
                        <div>
                            <Table bordered style={{tableLayout: 'fixed', width: '100%', wordWrap: 'break-word'}}>
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
                <hr/>
                {this.props.dataSet.qualityMetrics &&
                <Row>
                    <Col md='12'>
                        <h5>Quality Metrics:</h5>
                        <Table bordered style={{tableLayout: 'fixed', width: '100%', wordWrap: 'break-word'}}>
                            <thead>
                            <tr>
                                <th>Overall score</th>
                                <th>
                                    {overallRatingMain}
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.props.dataSet.qualityMetrics.map((metric, idx) => {
                                    return (
                                        <tr key={idx}>
                                            <td><span data-tip="">{metric.quality}</span>
                                                <ReactTooltip place="bottom"/>
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
                }
            </Container>
        );
    }

}

export default DatasetViewLayout;