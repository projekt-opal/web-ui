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

        // <Input addon type="checkbox" style={{verticalAlign: 'middle', position: 'relative'}}
        //        aria-label="Checkbox for following text input"/>

        //<CardTitle style={{display: 'inline', marginLeft: '0.5em'}} onClick={this.showDatasetView}>{title}</CardTitle>
        return (
            <Card color="LightCard" style={{flexGrow: '1'}}>
                <ModalDatasetView dataSet={this.props.dataSet}/>                           
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