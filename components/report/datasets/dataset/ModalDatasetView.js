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
    Modal, ModalHeader, ModalBody, ModalFooter, Table,
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
import ReactTooltip from 'react-tooltip'

class ModalDatasetView extends React.Component {

    state = {
        modal: false,
        tooltipOpen: false
    };

    showDatasetView = () => {
        this.setState(prevState => ({
          modal: !prevState.modal
        }));
    }

    countRating = (overallRating) => {
        const rating = [0, 0, 0, 0, 0];
        for (let i = 1; i <= overallRating; i++)
            rating[i - 1] = 2;
        if (overallRating - Math.floor(overallRating) >= 0.5)
            rating[Math.floor(overallRating)] = 1;
        return (<span>
            {
                rating.map((r, idx) => r === 0 ? <FaRegStar key={idx}/> : r === 1 ? <FaStarHalfAlt key={idx}/> : <FaStar key={idx}/>)
            }
        </span>);
    }

    render() {
        const datasetView = this.props.dataSet;
            // {
            //     description: "500 georeferenzierte und mit Kurztexten versehene Archivaufnahmen der Österreichischen Mediathek und des Hauses der Stadtgeschichte Salzburg mit Österreich-Bezug. Oral History Interviews zur Salzbruger Stadtgeschichte, Historische Stimmen, politische Ereignisse, Musik und Literatur, Metadaten von https://www.mediathek.at/audiovisueller-atlas/ ",
            //     overallRating: "3.648858349950768",
            //     title: "Daten und Texte audiovisueller Atlas",
            //     uri: "http://projekt-opal.de/dataset/_mcloudde_vieljhrlicherasterdesmittlerenvegetationsbeginnsindeutschland_0",
            //     dataFiles: {
            //         name: "NAME",
            //         publisher: "PUBLISHER",
            //         links: [
            //             {
            //                 fileType: "PDF",
            //                 link: "https://www.govdata.de/ckan/dataset/windkraftanlagen-im-genehmigungsverfahren.rdf",
            //             },
            //             {
            //                 fileType: "CSV",
            //                 link: "http://185.223.104.6/data/llur72/genehmigungsverfahren.csv",
            //             },
            //         ],
            //     },
            //     metadataInfo: 
            //     {
            //         "Letzte Änderung": "15.08.2019",
            //         "Veröffentlichungsdatum": "01.07.2019",
            //         "Zeitraum": "01.07.2019 - 01.07.2019" 
            //     },
            //     qualityMetrics: 
            //     {
            //         "score1": 1,
            //         "score2": 0,
            //         "score3": 4.5,
            //     }

            // };

        let overallRatingMain = this.countRating(datasetView.overallRating);
        const otherRatings = {};
        Object.keys(datasetView.qualityMetrics).forEach(key => {
            otherRatings[key] = this.countRating(datasetView.qualityMetrics[key]);
        });

        return (
            <div>
                <CardTitle style={{display: 'inline', marginLeft: '0.5em'}} onClick={this.showDatasetView}>{this.props.dataSet.title}</CardTitle>
                <Modal isOpen={this.state.modal} size='lg'
                  toggle={this.showDatasetView}>
                  <ModalHeader toggle={this.showDatasetView}>{datasetView.title}</ModalHeader>
                  <ModalBody>
                    <p>Description: {datasetView.description}</p>
                    <p style={{'float': 'left', 'marginRight': '15px', 'marginTop': '10px'}}>Data file(s)</p>
                    <Card style={{'marginBottom': '15px', 'padding': '10px'}}>
                        <div style={{'display': 'flex'}}>
                            <div style={{'flex': '50%'}}>{datasetView.dataFiles.name}</div>
                            <div style={{'flex': '50%'}}>{datasetView.dataFiles.publisher}</div>
                        </div>
                        
                        {datasetView.dataFiles.links.map(i => {
                            return <div>
                                <Badge>{i.fileType}</Badge>
                                <a href={i.link}>
                                    {i.link}
                                </a>
                            </div>
                        })}
                        
                        
                     </Card>     
                    
                    <Card style={{'padding': '10px', 'marginBottom': '15px'}}>
                        <CardTitle style={{display: 'inline', marginLeft: '0.5em'}}>Metadata info</CardTitle>
                        <Table bordered>
                            <tbody>
                            {
                                Object.keys(datasetView.metadataInfo).map(key => {
                                    return  <tr>
                                                <td>{key}</td>
                                                <td>{datasetView.metadataInfo[key]}</td>
                                              </tr>
                                })
                            }
                            </tbody>
                        </Table>
                    </Card>

                    <Card style={{'padding': '10px'}}>
                        <CardTitle style={{display: 'inline', marginLeft: '0.5em'}}>Quality metrics</CardTitle>
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
                                Object.keys(otherRatings).map(key => {
                                    return  <tr>
                                                <td><span data-tip="some text">{key}</span>
                                                    <ReactTooltip place="bottom" />
                                                </td>
                                                
                                                <td>{otherRatings[key]}</td>
                                              </tr>
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
            </div>            
        );
    }

}

export default ModalDatasetView;