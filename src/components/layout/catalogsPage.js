import React from 'react';
import { Container, Row, Progress } from "reactstrap";
import BootstrapTable from 'react-bootstrap-table-next';

class CatalogsPage extends React.Component {

    state = {
        data: [ 
            {id: "1",
                country: "Ukraine",
                number_of_datasets: 102,
                open_licenses: 25,
                machine_readable: 10,
                availability: 0,
                metadata_completeness: 0
            }, 
            {id: "2",
                country: "Czech Republic",
                number_of_datasets: 44,
                open_licenses: 60,
                machine_readable: 20,
                availability: 10,
                metadata_completeness: 5
            }, 
            {id: "3",
                country: "Luxembourg",
                number_of_datasets: 22,
                open_licenses: 60,
                machine_readable: 20,
                availability: 10,
                metadata_completeness: 5
            }],
    };

    render() {

        let progressFormatter = (cell, row) => {
          return (
            <Progress color="green" value={cell}>{cell}%</Progress>//<span>$ { cell } NTD</span>
          );
        }

        const columns = [{
          dataField: 'id',
          text: 'ID'
        }, {
          dataField: 'country',
          text: 'Country'
        }, {
          dataField: 'number_of_datasets',
          text: 'Number of datasets',
          sort: true
        }, {
          dataField: 'open_licenses',
          text: 'Open licenses',
          formatter: progressFormatter,
          sort: true
        }, {
          dataField: 'machine_readable',
          text: 'Machine readable',
          formatter: progressFormatter,
          sort: true
        }, {
          dataField: 'availability',
          text: 'Availability',
          formatter: progressFormatter,
          sort: true
        }, {
          dataField: 'metadata_completeness',
          text: 'Metadata completeness',
          formatter: progressFormatter,
          sort: true
        }]
        const defaultSorted = [{
          dataField: 'country',
          order: 'desc'
        }];

        return (
            <Container fluid>
                <br />
                <BootstrapTable
                  bootstrap4
                  keyField="id"
                  data={ this.state.data }
                  columns={ columns }
                  defaultSorted={defaultSorted}
                />
            </Container>
        );
    }
}

export default CatalogsPage;