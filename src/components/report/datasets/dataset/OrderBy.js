import React from 'react';
import {
    Button,
    ButtonDropdown,
    Container,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Form,
    FormGroup,
    Input,
    Label,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Row
} from "reactstrap";
import {FaSearchLocation} from 'react-icons/fa'
import { withTranslation } from 'react-i18next';

class OrderBy extends React.Component {

    state = {
        dropdownOpen: false,
        listOrderByValues: ['relevance', 'location', 'title', 'issueDate', 'description', 'Theme'],
        selectedOrderByIndex: 0,

        showLocationMenu: false,

        latitude: {
            editedValue: '',
            selectedValue: ''
        },
        longitude: {
            editedValue: '',
            selectedValue: ''
        }
    };

    componentDidMount() {
        if (this.props.isMobile)
            this.orderByChanged(1);
    }

    toggle = () => {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    };

    toggleModal = () => {
        this.setState({
            showLocationMenu: !this.state.showLocationMenu
        })
    };

    selectLocation = () => {
        this.setState({
                showLocationMenu: !this.state.showLocationMenu,
                selectedOrderByIndex: 1,
                latitude: {
                    editedValue: this.state.latitude.editedValue,
                    selectedValue:  this.state.latitude.editedValue
                },
                longitude: {
                    editedValue:  this.state.longitude.editedValue,
                    selectedValue: this.state.longitude.editedValue
                },
            }, () => this.props.orderByChanged(
            {
                selectedOrderValue: this.state.listOrderByValues[1],
                latitude: this.state.latitude.selectedValue,
                longitude: this.state.longitude.selectedValue
            }
            )
        );
    };

    orderByChanged = (idx) => {
        if (idx === 1) //'location'
            this.setState({showLocationMenu: true});
        else {
            this.setState({selectedOrderByIndex: idx}, () => this.props.orderByChanged(
                {
                    selectedOrderValue: this.state.listOrderByValues[this.state.selectedOrderByIndex]
                }
                )
            );
        }
    };

    getCurrentLocation = () => {
        this.getAccessToPosition(navigator);
    };

    getAccessToPosition = (navigator) => {
        if (navigator && navigator.geolocation) {
            const getPosition = function (options) {
                return new Promise(function (resolve, reject) {
                    navigator.geolocation.getCurrentPosition(resolve, reject, options);
                });
            };
            getPosition()
                .then((position) => {
                    this.setState({
                        latitude: {
                            editedValue: position.coords.latitude,
                            selectedValue: this.state.latitude.selectedValue
                        },
                        longitude: {
                            editedValue: position.coords.longitude,
                            selectedValue: this.state.longitude.selectedValue
                        }
                    });
                })
                .catch((err) => {
                    console.log(err.message);
                });
        }
    };

    handleLatitudeChange = (event) => {
        this.setState({
            latitude: {
                editedValue: event.target.value,
                selectedValue: this.state.latitude.selectedValue
            }
        });
    };

    handleLongitudeChange = (event) => {
        this.setState({
            longitude: {
                editedValue: event.target.value,
                selectedValue: this.state.longitude.selectedValue
            }
        });
    };

    render() {
        const { t } = this.props;
        const modal = this.state.showLocationMenu ? <Modal size="lg"
                                                           centered={true} autoFocus={true}
                                                           isOpen={this.state.showLocationMenu}
                                                           toggle={this.toggleModal}>
            <ModalHeader>Select A Location</ModalHeader>
            <ModalBody>
                <Container fluid>
                    <Form inline>
                        <Row>
                            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                <Label for="latitude" className="mr-sm-2">Latitude</Label>
                                <Input type="number" step="any" name="email" id="latitude"
                                       value={this.state.latitude.editedValue}
                                       placeholder="latitude" onChange={this.handleLatitudeChange}/>
                            </FormGroup>
                            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                <Label for="longitude" className="mr-sm-2">Longitude</Label>
                                <Input type="number" step="any" name="password" id="longitude"
                                       value={this.state.longitude.editedValue}
                                       placeholder="longitude" onChange={this.handleLongitudeChange}/>
                            </FormGroup>
                            <Button onClick={this.getCurrentLocation}><FaSearchLocation/></Button>
                        </Row>
                    </Form>
                </Container>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={this.selectLocation}>Select</Button>{' '}
                <Button color="secondary" onClick={this.toggleModal}>Cancel</Button>
            </ModalFooter>
        </Modal> : "";
        return (
            <>
                {modal}
                <ButtonDropdown style={{marginLeft: '2px'}} isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                    <DropdownToggle caret>
                        {t(this.state.listOrderByValues[this.state.selectedOrderByIndex])}
                    </DropdownToggle>
                    <DropdownMenu>
                        {
                            this.state.listOrderByValues.map((orderByValue, idx) => {
                                return <DropdownItem onClick={() => this.orderByChanged(idx)}
                                                     active={idx === this.state.selectedOrderByIndex}
                                                     key={idx}>{t(orderByValue)}
                                </DropdownItem>
                            })
                        }
                    </DropdownMenu>
                </ButtonDropdown>
            </>
        )
    }
}

export default withTranslation()(OrderBy);