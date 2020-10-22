import React from 'react';
import {
    Box,
    Button,
    Collapse,
    Container,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableContainer,
    TableBody,
    Typography,
    IconButton,
    withStyles
} from "@material-ui/core"

import {
    SwapHoriz,
    AddSharp,
    ExpandLess,
    ExpandMore
} from '@material-ui/icons/';

import * as DeviceApi from "../api/DeviceApi";
import GenerateData from './SampleData'
import SearchBar from './SearchBar'
import SortBy from './SortBy'
import DeviceListTabs from './VerticalTabs'
import TabPanel from './TabPanel'
import DevicesTable from './DevicesTable'

// tabs. decide on sender or receiver table
export default class ContentsTable extends React.Component {
    constructor(props) {
        super(props)
        var sampleData = GenerateData();
        this.state = {
            senders: sampleData.senders,
            receivers: sampleData.receivers,
            value: 0
        }
        this.handleValueChange = this.handleValueChange.bind(this);
        this.handleSendersChange = this.handleSendersChange.bind(this);
        this.handleReceiversChange = this.handleReceiversChange.bind(this);
    }

    componentDidMount() {
        DeviceApi.getSenders(this.handleSendersChange);
        DeviceApi.getReceivers(this.handleReceiversChange);
    }

    handleValueChange(value) {
        this.setState({
            value: value
        });
    }

    handleSendersChange(senders) {
        this.setState({
            senders: senders
        });
    }

    handleReceiversChange(receivers) {
        this.setState({
            receivers: receivers
        });
    }

    render() {
        return (
            <React.Fragment>
                <Box style={{display: 'flex', flexGrow: 1, margin: "1em 0em"}}>
                    <SearchBar/>
                    <SortBy/>
                </Box>
                <Box style={{display: 'flex', flexGrow: 1, maxHeight: 500}}>
                    {DeviceListTabs(this.props.classes, [this.state.value, this.handleValueChange])}
                    <TabPanel value={this.state.value} index={0}>
                        <DevicesTable rows={this.state.senders} />
                    </TabPanel>
                    <TabPanel value={this.state.value} index={1}>
                        <DevicesTable rows={this.state.receivers} />
                    </TabPanel>
                </Box>
            </React.Fragment>
        );
    }
}