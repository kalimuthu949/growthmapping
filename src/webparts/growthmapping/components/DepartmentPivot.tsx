import * as React from "react";
import TreeView from "@material-ui/lab/TreeView";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import TreeItem from "@material-ui/lab/TreeItem";
import { graph } from "@pnp/graph/presets/all";
import "../assets/Css/DepartmentPivot.css";
import DetailPopup from "./DetailPopup";
import { sp } from "@pnp/sp/presets/all";
export default function DepartmentPivot() {
  const [items, setitems] = React.useState([]);
  const [selecteditem, setselecteditem] = React.useState([]);
  const [selectedDept, setselectedDept] = React.useState("");
  const [modalopen, setmodalopen] = React.useState(false);
  const [reload, setreload] = React.useState(true);
  React.useEffect(function () {
    getdata();
  }, []);

  function removeDuplicates(arr) {
    return arr.filter((item, index) => arr.indexOf(item) === index);
  }

  function modalclose() {
    setmodalopen(false);
  }

  async function getdata() {
    let listdata = [];
    let listchoices = [];
    await sp.web.lists
      .getByTitle("DepartmentList")
      .items.top(5000)
      .get()
      .then(function (data) {
        if (data.length > 0) {
          for (let i = 0; i < data.length; i++) {
            listchoices.push(data[i].Department);
          }
          listchoices = removeDuplicates(listchoices);
          for (let i = 0; i < listchoices.length; i++) {
            listdata.push({ Department: listchoices[i], Details: [] });
          }
          for (let i = 0; i < data.length; i++) {
            let index = listdata.findIndex(
              (o) => o.Department == data[i].Department
            );
            listdata[index].Details.push({
              ID: data[i].ID,
              Position: data[i].Position,
              Department: data[i].Department,
            });
          }
          console.log(listdata);
          setitems([...listdata]);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  async function getDatafromsharepoint(itemID) {
    //await Commonservice.SPReadItemUsingId({Listname:"DepartmentList",SelectedId:itemID,Select:"*"}).then(function(data)
    await sp.web.lists
      .getByTitle("DepartmentList")
      .items.getById(itemID)
      .get()
      .then(function (data) {
        let rows = [];
        if (data) {
          rows = [];
          rows.push({
            Department: data.Department,
            Position: data.Position,
            BehavioralTraits: data["BehavioralTraits"],
            TechnicalTraits: data["TechnicalTraits"],
            RoleDesciption: data["RoleDesciption"],
          });
          setselecteditem([...rows]);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <div className="clsgrowthmapping">
      <TreeView
        aria-label="file system navigator"
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
      >
        {items.map(function (item, index) {
          return (
            <TreeItem
              className="parentItem"
              nodeId={index.toString()}
              label={item.Department}
            >
              {item.Details.map(function (seconditem, index) {
                let labelvalue = seconditem.Position;
                return (
                  <TreeItem
                    className="childItem"
                    nodeId={items.length.toString()}
                    label={labelvalue}
                    onClick={() => {
                      var test = seconditem.ID;
                      getDatafromsharepoint(seconditem.ID);
                      setselectedDept(seconditem.Department);
                      setmodalopen(true);
                      setreload(!reload);
                    }}
                  />
                );
              })}
            </TreeItem>
          );
        })}
      </TreeView>
      <DetailPopup
        className="modalPopUp"
        modal={modalopen}
        itemdetails={selecteditem}
        Department={selectedDept}
        closeclick={modalclose}
      />
    </div>
  );
}
