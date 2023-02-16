import React, { useState } from "react";
import NewTaskArea from "./NewTaskArea";
import Agenda from "./Agenda";
import { Grid } from "@mui/material";
import '../TimeTracking.css'

// const drawerWidth = 240;
// const styles = (theme) => ({
//   root: {
//     display: "flex"
//   },
//   drawerPaper: {
//     position: "relative",
//     whiteSpace: "nowrap",
//     width: drawerWidth,
//     transition: theme.transitions.create("width", {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.enteringScreen
//     })
//   },
//   toolbarIcon: {
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     marginRight: "8px",
//     ...theme.mixins.toolbar
//   },
//   drawerPaperClose: {
//     backgroundColor: "#333358",
//     overflowX: "hidden",
//     transition: theme.transitions.create("width", {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.leavingScreen
//     }),
//     width: theme.spacing.unit * 7,
//     [theme.breakpoints.up("sm")]: {
//       width: theme.spacing.unit * 9
//     }
//   },
//   content: {
//     display: "flex",
//     width: "100%",
//     flexGrow: 1,
//     height: "100vh",
//     overflow: "auto"
//   }
// });

function Dashboard(props) {
  const { classes } = props;
  const [open, setOpen] = useState(false);
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  return (
      <div className="root">
        <Grid container className="content">
          <NewTaskArea />
        </Grid>
      </div>
  );
}

export default Dashboard;
