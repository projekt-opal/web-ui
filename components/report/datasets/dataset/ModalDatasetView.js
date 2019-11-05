import React from 'react';
import {
    Badge,
    Button,
    Card,
    CardHeader,
    CardTitle,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Table,
} from "reactstrap";
import {FaRegStar, FaStar, FaStarHalfAlt} from "react-icons/fa";
import ReactTooltip from 'react-tooltip';
import axios from '../../../../webservice/axios-dataSets';

class ModalDatasetView extends React.Component {

    state = {
        dataSet: null,
        tooltipOpen: false
    };

    showDatasetView = () => {
        this.props.onToggleModal();
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

    componentDidMount() {
        axios.get("/dataSet?uri=" + this.props.uri)
            .then(response => {
                this.setState({dataSet: response.data})
            })
            .catch(err => console.log(err));
    }

    render() {
        const metaDataInfo = [];
        let overallRatingMain = <span/>;

        if (this.state.dataSet) {
            if (this.state.dataSet.issueDate) metaDataInfo["issueDate"] = this.state.dataSet.issueDate;
            if (this.state.dataSet.theme) metaDataInfo["theme"] = this.state.dataSet.theme;
            // if(dataset.keywords) metaDataInfo.push({keywords: dataset.keywords});
            // if(dataset.issueDate) metaDataInfo.push({issueDate: dataset.issueDate});
            if (this.state.dataSet.overallRating)
                overallRatingMain = this.countRating(this.state.dataSet.overallRating);
        } else return '';

        return (
            <div style={{display: 'flex', flexFlow: 'row wrap'}}>
                <label style={{display: 'block'}}>

                    {/*<CardTitle style={{display: 'inline', marginLeft: '0.5em'}}><a*/}
                    {/*    href="#">{this.state.dataSet.title}</a></CardTitle>*/}
                    <Modal isOpen={this.props.isModalOpen} size='lg'
                           toggle={this.showDatasetView}>
                        <ModalHeader toggle={this.showDatasetView}>{this.state.dataSet.title}</ModalHeader>
                        <ModalBody>
                            <p>Description: {this.state.dataSet.description}</p>
                            <p style={{'float': 'left', 'marginRight': '15px', 'marginTop': '10px'}}>Data
                                file(s)</p>
                            <Card style={{'marginBottom': '15px', 'padding': '10px'}}>
                                <div style={{'display': 'flex'}}>
                                    {
                                        <div style={{'flex': '50%'}}>{this.state.dataSet.publisher.name}</div>
                                    }
                                    <div style={{'flex': '50%'}}>{this.state.dataSet.publisher.publisher}</div>
                                </div>

                                {this.state.dataSet.distributions.map((distribution, idx) => {
                                    return <div key={idx}>
                                        <Badge>{distribution.fileType}</Badge>
                                        <a href={distribution.url}>
                                            {distribution.url}
                                        </a>
                                    </div>
                                })}


                            </Card>

                            <Card style={{'padding': '10px', 'marginBottom': '15px'}}>
                                <CardTitle style={{display: 'inline', marginLeft: '0.5em'}}>Metadata
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

                            <Card style={{'padding': '10px'}}>
                                <CardTitle style={{display: 'inline', marginLeft: '0.5em'}}>Quality
                                    metrics</CardTitle>
                                <Table bordered>
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
                                        this.state.dataSet.qualityMetrics.map((metric, idx) => {
                                            return (
                                                <tr key={idx}>
                                                    <td><span data-tip="some text">{metric.quality}</span>
                                                        <ReactTooltip place="bottom"/>
                                                    </td>
                                                    <td>{metric.value}</td>
                                                </tr>
                                            );
                                        })
                                    }
                                    </tbody>
                                </Table>
                            </Card>

                        </ModalBody>
                        <ModalFooter>
                            <Button color="secondary" onClick={this.showDatasetView}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
                </label>
                <div style={{flexGrow: '1'}}/>
                {overallRatingMain}
            </div>
        );
    }

}

export default ModalDatasetView;