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
      .getByTitle("Growth Mapping")
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
              OrderNumber: data[i].OrderNumber ? data[i].OrderNumber : 0,
            });
          }
          let arrSort = listdata.sort(function (a, b) {
            if (a.Department < b.Department) {
              return -1;
            }
            if (a.Department > b.Department) {
              return 1;
            }
            return 0;
          });
          setitems([...arrSort]);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  async function getDatafromsharepoint(itemID) {
    //await Commonservice.SPReadItemUsingId({Listname:"DepartmentList",SelectedId:itemID,Select:"*"}).then(function(data)
    await sp.web.lists
      .getByTitle("Growth Mapping")
      .items.getById(itemID)
      .get()
      .then(function (data) {
        let rows = [];
        if (data) {
          rows = [];
          rows.push({
            Department: data.Department,
            Position: data.Position,
            OrderNumber: data.OrderNumber ? data.OrderNumber : 0,
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
          let arrSortPosition = item.Details.sort(function (a, b) {
            if (a.OrderNumber < b.OrderNumber) {
              return -1;
            }
            if (a.OrderNumber > b.OrderNumber) {
              return 1;
            }
            return 0;
          });
          console.log(arrSortPosition);
          return (
            <TreeItem
              className="parentItem"
              nodeId={index.toString()}
              label={item.Department}
            >
              {arrSortPosition.map(function (seconditem, index) {
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
                      setTimeout(() => {
                        setmodalopen(true);
                      }, 500);

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
      {items.length == 0 ? <div className="clsNodata">No data Found</div> : ""}
    </div>
  );
}
