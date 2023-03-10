import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Commonservice from "./SPServices";
import { sp } from "@pnp/sp/presets/all";
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

export default function DetailTable(props) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table
        className={`${classes.table} modalTable`}
        aria-label="simple table"
      >
        <TableHead>
          <TableRow>
            <TableCell>Behavioral Traits</TableCell>
            <TableCell>Technical Traits</TableCell>
            <TableCell>Role Description</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.itemdetails.map((row, index) => (
            <TableRow key={index}>
              <TableCell>
                <div
                  dangerouslySetInnerHTML={{ __html: row.BehavioralTraits }}
                />
              </TableCell>
              <TableCell>
                <div
                  dangerouslySetInnerHTML={{ __html: row.TechnicalTraits }}
                />
              </TableCell>
              <TableCell>
                <div dangerouslySetInnerHTML={{ __html: row.RoleDesciption }} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
