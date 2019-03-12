import React from 'react';
import {Badge, Button, ListGroup, ListGroupItem} from "reactstrap";

import {FaAngleDown, FaAngleRight} from 'react-icons/fa'

class FilterView extends React.Component {

    state = {
        isExpanded: false
    };

    toggleFilterExpanded = () => {
        const isExpanded = !this.state.isExpanded;
        this.setState({isExpanded: isExpanded});
    };

    render() {
        let values = null;
        if (this.state.isExpanded)
            values = (
                <ListGroup>
                    {
                        this.props.filter.values.map(
                            ({uri, value, count}, idx) => {
                                return (
                                    <ListGroupItem key={idx}>
                                        <label><input type="checkbox" value={uri}
                                                      checked={!!this.props.selectedValues.find(x => x === uri)}
                                                      onChange={(event) => this.props.checked(event)}/>
                                            {value}
                                            <Badge style={{marginLeft: '2px'}} pill>{count}</Badge>
                                        </label>
                                    </ListGroupItem>);
                            })
                    }
                </ListGroup>);

        return (
            <div>
                <div style={{display: 'flex', flexFlow: 'row'}}>
                    <Button onClick={this.toggleFilterExpanded} style={{flexGrow: 1, textAlign: 'left'}}>
                        {this.state.isExpanded ? <FaAngleDown/> : <FaAngleRight/>}
                        {this.props.filter.title}
                    </Button>
                </div>
                {values}
            </div>
        );
    }
};

export default FilterView;