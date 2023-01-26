import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Commonservice from "./SPServices";
import { sp } from "@pnp/sp/presets/all";
const useStyles = makeStyles({
  table: {
    minWidth: 650
  },
  column:{
    width:"260px",
    height:"400px",
    overflow:"auto"
  }
});

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

export default function DetailTable(props) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center"><b>Behavioral Traits</b></TableCell>
            <TableCell align="center"><b>Technical Traits</b></TableCell>
            <TableCell align="center"><b>Role Desciption</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.itemdetails.map((row,index) => (
            <TableRow key={index}>
              <TableCell className={classes.column} align="center"><div dangerouslySetInnerHTML={{__html: row.BehavioralTraits}} /></TableCell>
              <TableCell align="center"><div dangerouslySetInnerHTML={{__html: row.TechnicalTraits}} /></TableCell>
              <TableCell align="center"><div dangerouslySetInnerHTML={{__html: row.RoleDesciption}} /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
