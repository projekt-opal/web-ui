import React from 'react';
import { Badge, Button, Col, Collapse, Container, Row, Table } from "reactstrap";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
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
                rating.map((r, idx) => r === 0 ? <FaRegStar key={idx} /> : r === 1 ? <FaStarHalfAlt key={idx} /> :
                    <FaStar key={idx} />)
            }
        </span>);
    };


    getTitle() {
        return this.props.dataSet.title ? this.props.dataSet.title : this.props.dataSet.title_de;
    }

    getDescription() {
        return this.props.dataSet.description ? this.props.dataSet.description : this.props.dataSet.description_de;
    }

    getLandingPage = () => {

        if (this.props.dataSet.landingPage) {
            let url = this.props.dataSet.landingPage;
            return (
                <div><a href={url}>{this.props.dataSet.landingPage}</a></div>
            )
        }

    }

    getLanguage = () => {
        if (this.props.dataSet.language) {
            if (this.props.dataSet.language.includes("http://publications.europa.eu/resource/authority/language/")) {
                let uri = this.props.dataSet.language;
                uri = uri.replace("http://publications.europa.eu/resource/authority/language/", "").toLowerCase();
                return uri;

            }
            else if (this.props.dataSet.language.includes("http://") && !this.props.dataSet.language.includes("http://publications.europa.eu/resource/authority/language/")) {
                return this.props.dataSet.language;
            }
            else {
                return this.props.dataSet.language.toLowerCase();
            }

        }
    }

    getAsArray(obj) {
        let emptyTemporal = Object.values(obj).every(v => v === null);
        let someIsNull = Object.values(obj).some(v => v === null);
        if (emptyTemporal === false) {
            let arr = Object.keys(obj).map((key) => {
                if (obj[key] != null) {
                    return [key + ": ", obj[key] + " "];
                }
            })
            if (arr.length != 0) {
                return arr;
            }
        }
        return null;
    }

    render() {
        const metaDataInfo = [];
        let overallRatingMain = <span />;
        if (this.props.dataSet) {
            if (this.props.dataSet.issueDate) metaDataInfo["issueDate"] = this.props.dataSet.issueDate.toISOString().split('T')[0];
            if (this.props.dataSet.theme) metaDataInfo["theme"] = this.props.dataSet.theme;
            if (this.props.dataSet.keywords) metaDataInfo["keywords"] = this.props.dataSet.keywords.join(", ");
            if (this.props.dataSet.keywords_de) metaDataInfo["keywords"] = this.props.dataSet.keywords.join(", ");
            if (this.props.dataSet.modified) metaDataInfo["modified"] = this.props.dataSet.modified;
            if (this.props.dataSet.identifier) metaDataInfo["identifier"] = this.props.dataSet.identifier;
            if (this.props.dataSet.language) metaDataInfo["language"] = this.getLanguage();
            if (this.props.dataSet.contactPoint) {
                let obj = this.props.dataSet.contactPoint;
                let arr = this.getAsArray(obj);
                if (arr != null) {
                    metaDataInfo["contactPoint"] = arr;
                }
            }
            if (this.props.dataSet.temporal) {
                let obj = this.props.dataSet.temporal;
                let arr = this.getAsArray(obj);
                if (arr != null) {
                    metaDataInfo["temporal"] = arr;
                }
            }
            // if (this.props.dataSet.spatial) metaDataInfo["spatial"] = this.props.dataSet.spatial.geometry;
            if (this.props.dataSet.accrualPeriodicity) metaDataInfo["accrualPeriodicity"] = this.props.dataSet.accrualPeriodicity;
            if (this.props.dataSet.landingPage) metaDataInfo["landingPage"] = this.getLandingPage();
            if (this.props.dataSet.overallRating)
                overallRatingMain = this.countRating(this.props.dataSet.overallRating);
        } else return '';

        return (
            <Container fluid>
                <Row>
                    <Col>
                        <h3 style={{ marginTop: '.5rem', marginBottom: '0' }}>
                            {this.props.dataSet == null ? '' : this.getTitle()}</h3></Col>
                </Row>
                <hr />
                <Row>
                    <Col md='12'>
                        <h5>Description:</h5>
                        <p>{this.props.dataSet == null ? '' : this.getDescription()}</p>

                        <h5>Distribution(s):<Button color="link"
                            onClick={this.toggle}>{this.state.isOpenDistributions ? 'collapse' : 'expand'}</Button>
                        </h5>
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
                                            <Table bordered style={{
                                                tableLayout: 'fixed',
                                                width: '100%',
                                                wordWrap: 'break-word'
                                            }}>
                                                <tbody>
                                                    <tr>{distribution.title != null ? <td><div>Title: {distribution.title}</div></td> : ''}</tr>
                                                    <tr> {distribution.description != null ? <td><div>Description: {distribution.description}</div></td> : ''}</tr>
                                                    <tr>{distribution.issued != null ? <td><div>Issued: {distribution.issued}</div></td> : ''}</tr>
                                                    <tr>{distribution.modified != null ? <td><div>Modified: {distribution.modified}</div></td> : ''}</tr>
                                                    <tr>{distribution.license != null ? <td><div>License: {distribution.license && distribution.license.uri}</div></td> : ''}</tr>
                                                    <tr>{distribution.rights != null ? <td><div>Rights: {distribution.rights}</div></td> : ''}</tr>
                                                    <tr>{distribution.accessUrl != null ? <td><div>Access Url: <a href={distribution.accessUrl}>{distribution.accessUrl}</a></div></td> : ''}</tr>
                                                    <tr> {distribution.mediaType != null ? <td><div>Media Type: {distribution.mediaType}</div></td> : ''}</tr>
                                                    <tr>{distribution.byteSize === 0 ? '' : <td><div>ByteSize: {distribution.byteSize}</div></td>}</tr>
                                                    <tr>{distribution.downloadUrl != null ? <td><div>Download Url: <Badge>{distribution.fileType}</Badge>&nbsp;</div></td> : ''}</tr>
                                                    <tr>{distribution.url != null ? <td><a href={distribution.url}>{distribution.url}</a></td> : ''}</tr>

                                                </tbody>
                                            </Table>
                                        </div>
                                    })
                                    : ""
                            }
                        </Collapse>
                    </Col>
                </Row >
                <Row>
                    <Col md='12'>
                        <h5>Metadata Info:</h5>
                        <div>
                            <Table bordered style={{ tableLayout: 'fixed', width: '100%', wordWrap: 'break-word' }}>
                                <tbody>
                                    {
                                        Object.keys(metaDataInfo).map((key, idx) => {
                                            return <tr key={idx}>
                                                <td>{key.charAt(0).toUpperCase().concat(key.substring(1, key.length))}</td>
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
                {
                    this.props.dataSet.qualityMetrics &&
                    <Row>
                        <Col md='12'>
                            <h5>Quality Metrics:</h5>
                            <Table bordered style={{ tableLayout: 'fixed', width: '100%', wordWrap: 'break-word' }}>
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
                }
            </Container >
        );
    }

}

export default DatasetViewLayout;