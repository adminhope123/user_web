import React, { useContext } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import CloudDownload from '@material-ui/icons/CloudDownload';
import AssignmentIcon from '@material-ui/icons/Assignment';
import {  withStyles } from "@material-ui/core/styles";
import '../TimeTracking.css'
import { UserDataContext } from 'src/UserDataContext';

const styles = theme => ({
    icon: {
        color: '#CCC'
    }
})

function SideBar (props) {
    const { classes } = props;
    const { tasks } = useContext(UserDataContext);
    const handleDownload = () => {
        const taskData = tasks.map(t => `${t.description}, ${t.hours}:${t.mins}:${t.secs}\n`);
        const data = new Blob(taskData, {type: 'text/csv'});
        const csvURL = window.URL.createObjectURL(data);
        let tempLink = document.createElement('a');
        tempLink.href = csvURL;
        tempLink.setAttribute('download', 'tasks.txt');
        tempLink.click();
    }
    return(
        <div>
            <ListItem button>
                <ListItemIcon className={classes.icon}>
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
            </ListItem>

            <ListItem button onClick={handleDownload}>
                <ListItemIcon className={classes.icon}>
                    <CloudDownload/>
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
            </ListItem>

            <ListItem button>
                <ListItemIcon className={classes.icon}>
                    <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="Customers" />
            </ListItem>

            <ListItem button>
                <ListItemIcon className={classes.icon}>
                    <BarChartIcon />
                </ListItemIcon>
                <ListItemText primary="Reports" />
            </ListItem>

            <ListItem button>
                <ListItemIcon className={classes.icon}>
                    <LayersIcon />
                </ListItemIcon>
                <ListItemText primary="Integrations" />
            </ListItem>
        </div>
    )
}

export default SideBar;