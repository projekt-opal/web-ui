import React from 'react';
import {
    Badge,
    Button,
    Card,
    CardHeader,
    Container,
    Row,
    Col,
    CardTitle,
    Form,
    FormGroup,
    Label,
    Table,
} from "reactstrap";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import ReactTooltip from 'react-tooltip';

class DatasetView extends React.Component {

    state = {
        dataset: null
    };

    componentDidMount = () => {
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
            <div style={{ display: 'flex', flexFlow: 'row wrap' }}>
                <label style={{ display: 'block' }}>
                    <h3 className="text-center"> {this.state.dataSet == null ? '' : this.state.dataSet.title}</h3>
                    <Table borderless>
                        <tbody>
                            <tr>
                                <td>Description:</td>
                                <td>{this.state.dataSet == null ? '' : this.state.dataSet.description}</td>
                            </tr>
                            <tr>
                                <td>Data File(s): </td>
                                <td>
                                    <Card style={{ 'marginBottom': '15px', 'padding': '10px' }}>
                                        <div>
                                            {
                                                <div>{this.state.dataSet == null ? '' : this.state.dataSet.publisher.name}</div>
                                            }
                                            <div>{this.state.dataSet == null ? '' : this.state.dataSet.publisher.publisher}</div>
                                        </div>

                                        {this.state.dataSet == null ? '' : this.state.dataSet.distributions.map((distribution, idx) => {
                                            return <div key={idx}>
                                                <Badge>{distribution.fileType}</Badge>
                                                &nbsp;
                                                            <a href={distribution.url}>
                                                    {distribution.url}
                                                </a>
                                            </div>
                                        })}


                                    </Card>
                                </td>
                            </tr>
                        </tbody>
                    </Table>


                    <Card style={{ 'padding': '10px', 'marginBottom': '15px' }}>
                        <CardTitle style={{ display: 'inline', marginLeft: '0.5em' }}>Metadata
                                    info</CardTitle>
                        <Table bordered>
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
                    </Card>

                    <Card style={{ 'padding': '10px' }}>
                        <CardTitle style={{ display: 'inline', marginLeft: '0.5em' }}>Quality
                                    metrics</CardTitle>
                        <Table bordered>
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
                    </Card>


                </label>
            </div>

            //TableView using the links that I need - related to this particular dataset!
        );
    }
}

export default DatasetView;