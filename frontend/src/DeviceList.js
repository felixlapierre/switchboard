import React from 'react';
import {
    AppBar,
    Box,
    Button,
    Collapse,
    Container,
    makeStyles,
    Menu,
    Tab,
    Tabs,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableContainer,
    TableBody,
    TableSortLabel,
    Select,
    Typography,
    IconButton,
    TextField,
    MenuItem
} from "@material-ui/core"

import {
    SwapHoriz,
    AddSharp,
    ExpandLess,
    ExpandMore,
    Search,
    MoreVert
} from '@material-ui/icons/';

import PropTypes from "prop-types";
import GenerateData from "./SampleData";
import generateHeadCells from "./headCells";
import ActionMenu from "./ActionMenu";
import SearchBar from "./devListSearch";

// imports for material ui & etc

// temporary row
const rows = GenerateData();

function getStatusStyle(status) {
    if (status == 0) {
        return "green statusText";
    }
    else if (status == 1) {
        return "yellow statusText";
    }
    else if (status == 2) {
        return "red statusText";
    }
    else {
        return "lightGrey statusOfflineText";
    }
}
function getStatusText(status) {
    if (status == 0) {
        return "Online";
    }
    else if (status == 1) {
        return "Pending";
    }
    else if (status == 2) {
        return "Error";
    }
    else {
        return "Offline";
    }
}

function importData() {
    // get data from the database
}

function TitleBox() {
    return (
        <React.Fragment>
            <Box class="flexContents headerArea">
                <span class="paddedText title">My Devices</span>
                <span class="alignRightFloat">
                    <Button class="green buttonText">
                        <SwapHoriz /> Stream
                    </Button>
                    <Button class="blue buttonText">
                        <AddSharp /> Add Device
                    </Button>
                </span>
            </Box>
        </React.Fragment>
    );
}

// tabs. decide on sender or receiver table
function ContentsTable() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <React.Fragment>
            <AppBar position="static">
                <Tabs class="lightGrey blackFont flexContents"
                    //  variant="fullWidth"
                    value={value}
                    onChange={handleChange}
                    aria-label="simple tabs">

                    <LinkTab label="Senders" {...a11yProps(0)} />
                    <LinkTab label="Receivers" {...a11yProps(1)} />
                    <Tab disabled></Tab>
                    <Tab disabled></Tab>
                        {SearchBar()}
                    <Box>
                        <Typography variant="caption" class="paddedText">Sort By</Typography> 
                        <Select variant="outlined" id="sortBy" fullWidth="true" >

                        </Select>
                    </Box>
                </Tabs>

            </AppBar>
            <TabPanel value={value} index={0}>
                {DevicesTable(0)}
            </TabPanel>
            <TabPanel value={value} index={1}>
                {DevicesTable(1)}
            </TabPanel>
        </React.Fragment>
    );
}

function SingleTableRow(row) {
    const [open, setOpen] = React.useState(false);

    return (
        <React.Fragment>
            <TableRow key={row.id}>
                <TableCell style={{ width: 1, padding: 0, paddingLeft: 5 }}>
                    <IconButton onClick={() => setOpen(!open)}>
                        {open ? <ExpandMore /> : <ExpandLess />}
                    </IconButton>
                </TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.serial}</TableCell>
                <TableCell>
                    <div class={getStatusStyle(row.status)}>
                        {getStatusText(row.status)}
                    </div>
                </TableCell>
                <TableCell>{row.ip}</TableCell>
                <TableCell>{row.port}</TableCell>
                <TableCell align="center">
                    <ActionMenu />
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell class="chevronText lightestGrey" colspan={7}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={2}>
                            <Typography variant="caption">
                                Some extra info: {rowExtras(row.extras)}
                            </Typography>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}
function rowExtras(extras) {
    var extraStr = "";
    for (var i = 0; i < extras.length; i++) {
        extraStr = extraStr + extras[i] + " ";
    }
    return extraStr;
}


function DevicesTable() {
    var data = rows[arguments[0]];
    return (
        <React.Fragment>
            <Box>
                <TableContainer style={{ maxHeight: 500 }}>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell style={{ width: 1, padding: 0, paddingLeft: 5 }}></TableCell>
                                {generateHeadCells()}
                                <TableCell align="center"><Typography variant="caption">Actions</Typography></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((row) => (
                                SingleTableRow(row)
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </React.Fragment>
    );
}

// combine the fragments
function DeviceList() {
    return (
        <Container>
            <TitleBox />
            <ContentsTable />
        </Container>
    );
}

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`nav-tabpanel-${index}`}
            aria-labelledby={`nav-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired
};

function a11yProps(index) {
    return {
        id: `nav-tab-${index}`,
        "aria-controls": `nav-tabpanel-${index}`
    };
}

function LinkTab(props) {
    return (
        <Tab
            component="a"
            onClick={(event) => {
                event.preventDefault();
            }}
            {...props}
        />
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper
    }
}));

export default DeviceList;