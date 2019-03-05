import React from 'react';
import {
    Button,
    Card,
    CardBody,
    CardTitle,
    CardSubtitle,
    CardHeader,
    Input,
    CardText,
    Badge,
    CardFooter
} from "reactstrap";

class ShortView extends React.Component {

    state = {
        isOneLineDescription: true
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
        let dataSetFileType = this.props.dataSet.fileType;
        let overallRating = this.props.dataSet.overallRating;

        return (
            <Card color="LightCard" style={{flexGrow: '1'}}>
                <CardHeader>
                    <div style={{display: 'flex', flexFlow: 'row wrap'}}>
                        <label style={{display: 'block'}}>
                            <Input addon type="checkbox" style={{verticalAlign: 'middle', position: 'relative'}}
                                   aria-label="Checkbox for following text input"/>
                            <CardTitle style={{display: 'inline', marginLeft: '0.5em'}}>{title}</CardTitle>
                        </label>
                        <div style={{flexGrow: '1'}}/>
                        <span>overall rating: {overallRating}</span>
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
                    <Badge>{dataSetFileType}</Badge>
                </CardBody>
            </Card>
        );
    }
}

export default ShortView;


{/*<div className="card border-success mb-3" style="max-width: 18rem;">*/}
    {/*<div className="card-header bg-transparent border-success">Header</div>*/}
    {/*<div className="card-body text-success">*/}
        {/*<h5 className="card-title">Success card title</h5>*/}
        {/*<p className="card-text">Quick sample text to create the card title and make up the body of the card's*/}
            {/*content.</p>*/}
    {/*</div>*/}
    {/*<div className="card-footer bg-transparent border-success">Footer</div>*/}
{/*</div>*/}