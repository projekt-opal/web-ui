import React from 'react';
import {
    Badge,
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    CardSubtitle,
    CardText,
    CardTitle,
    Input,
    Modal, ModalHeader, ModalBody, ModalFooter, Table
} from "reactstrap";
import {
    FaRegStar,
    FaStar,
    FaStarAndCrescent,
    FaStarHalf,
    FaStarHalfAlt,
    FaStarOfDavid,
    FaStarOfLife
} from "react-icons/fa";
import ModalDatasetView from './ModalDatasetView';

class LongView extends React.Component {

    state = {
        isOneLineDescription: true,
    };

    oneLineDescriptionClicked = () => {
        let newState = {...this.state};
        newState.isOneLineDescription = !newState.isOneLineDescription;
        this.setState(newState);
    };

    render() {

        let description = this.props.dataSet.description;
        if (this.state.isOneLineDescription)
            description = description.substr(0, 100);

        let title = this.props.dataSet.title;

        let keywords = this.props.dataSet.keywords;
        let theme = this.props.dataSet.theme;
        let catalog = this.props.dataSet.catalog;
        let harvestingDate = this.props.dataSet.issueDate;
        let dataSetFileType = this.props.dataSet.fileType;
        let overallRating = this.props.dataSet.overallRating;
        const rating = [0, 0, 0, 0, 0];
        for (let i = 1; i <= overallRating; i++)
            rating[i - 1] = 2;
        if (overallRating - Math.floor(overallRating) >= 0.5)
            rating[Math.floor(overallRating)] = 1;
        let overallRatingStarts = (<span>
            {
                rating.map((r, idx) => r === 0 ? <FaRegStar key={idx}/> : r === 1 ? <FaStarHalfAlt key={idx}/> : <FaStar key={idx}/>)
            }
        </span>);

        // <Input addon type="checkbox" style={{verticalAlign: 'middle', position: 'relative'}}
        //        aria-label="Checkbox for following text input"/>

        //<CardTitle style={{display: 'inline', marginLeft: '0.5em'}} onClick={this.showDatasetView}>{title}</CardTitle>
        return (
            <Card color="LightCard" style={{flexGrow: '1'}}>
                <CardHeader>
                    <div style={{display: 'flex', flexFlow: 'row wrap'}}>
                        <label style={{display: 'block'}}>                      
                            <ModalDatasetView dataSet={this.props.dataSet}/>                           
                        </label>
                        <div style={{flexGrow: '1'}}/>
                        {overallRatingStarts}
                    </div>
                </CardHeader>
                <CardBody>
                    <CardSubtitle> {description}
                        {
                            this.props.dataSet.description.length > 100 &&
                            <Button color="link" onClick={this.oneLineDescriptionClicked}>
                                {this.state.isOneLineDescription ? 'more' : 'less'}
                            </Button>
                        }
                    </CardSubtitle>
                    <CardText>
                        <span> harvesting Date: </span>
                        <span>{harvestingDate}</span>
                    </CardText>
                    <Badge>{dataSetFileType}</Badge>
                    <CardFooter className="text-muted">
                        <div>
                            <span>{catalog}</span>
                            <span style={{marginLeft: '3rem'}}>{theme}</span>
                            <br/>
                            {
                                keywords.map((keyword, idx) => {
                                    return (
                                        <span key={idx} style={{marginLeft: '4px'}}>
                                {keyword}
                                </span>
                                    );
                                })
                            }
                        </div>
                    </CardFooter>
                </CardBody>
            </Card>
        );
    }

}

export default LongView;