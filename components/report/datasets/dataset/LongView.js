import React from 'react';
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    CardSubtitle,
    CardText,
    CardFooter,
    Badge,
    Container,
    Row,
    Col, Input, InputGroupAddon, InputGroupText, InputGroup
} from "reactstrap";

class LongView extends React.Component {

    state = {
        isOneLineDescription: true
    };

    oneLineDescriptionClicked = () => {
        let newState = {...this.state};
        newState.isOneLineDescription = !newState.isOneLineDescription;
        this.setState(newState);
    };

    render() {

        let description = 'A really long description, a really long description,a really long description,a really long description' +
            ',a really long description,a really long description,a really long description,a really long description,' +
            ',a really long description,a really long description,a really long description,a really long description,' +
            ',a really long description,a really long description,a really long description,a really long description,' +
            'a really long description';
        if (this.state.isOneLineDescription)
            description = 'A one line description of the given dataset goes here';

        let title = 'The given Title';

        let keywords = ['key1', 'key2', 'key3'];
        let theme = 'Energy';
        let catalog = 'Govdata';
        let harvestingDate = '20.02.2019';
        let dataSetFileType = 'PDF';
        let overallRating = 3; // of 5

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
                        <Button color="link" onClick={this.oneLineDescriptionClicked}>
                            {this.state.isOneLineDescription ? 'more' : 'less'}
                        </Button>
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