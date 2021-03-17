import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";

import { getAllFiles, deleteFile } from "../../../actions/dashboard";
import UploadFilesModal from "./UploadFilesModal";

var $ = require("jquery");
$.DataTable = require("datatables.net-bs4");

const Dashboard = () => {
  const dispatch = useDispatch();
  const dashboardDetails = useSelector((state) => state.dashboard);
  const { files } = dashboardDetails;

  useEffect(() => {
    dispatch(getAllFiles());
    // eslint-disable-next-line
  }, [getAllFiles]);

  useEffect(() => {
    $("#tableUploadFiles").DataTable({
      destroy: true,
      data: files,
      columns: [
        { data: "_id", autoWidth: true },
        { data: "pic" },
        { data: "description", autoWidth: true },
        { data: null, autoWidth: false },
      ],
      columnDefs: [
        {
          targets: [0],
          visible: false,
          data: "_id",
        },
        {
          targets: [1],
          width: "20%",
          orderable: false,
          createdCell: (td, cellData, rowData) =>
            ReactDOM.render(
              <>
                <img src={rowData.pic} alt='Pic' className='img-fluid' />
              </>,

              td
            ),
        },
        {
          targets: [3],
          width: "20%",
          className: "text-right",
          orderable: false,
          createdCell: (td, cellData, rowData) =>
            ReactDOM.render(
              <>
                <button
                  className='btn btn-sm  ml-1'
                  onClick={() => onDelete(rowData._id)}
                >
                  <i className='fa fa-trash'></i> Delete
                </button>
              </>,

              td
            ),
        },
      ],
    });
    // eslint-disable-next-line
  }, [files]);

  const onDelete = (id) => {
    if (id) {
      deleteFile(id);
    }
  };

  if (!files || files === null || files === undefined) return <>Loading ...</>;
  return (
    <div className='container'>
      <UploadFilesModal />
      <div className='row my-5'>
        <div className='col-12'>
          <div className='row'>
            <div className='col-md-4 col-12'>
              <h4>Upload files</h4>
            </div>
            <div className='col-md-8 col-12 d-flex'>
              <button
                className='btn ml-auto'
                data-toggle='modal'
                data-target='#uploadFilesModal'
              >
                <i className='fa fa-plus'></i> Upload Files
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className='row my-5'>
        <div className='col-12'>
          <div className='table-responsive  m-2 p-2'>
            <table
              className='table table-striped table-hover mt-4'
              id='tableUploadFiles'
              cellSpacing='0'
              width='100%'
            >
              <thead>
                <tr className='bg-color-teal color-white'>
                  <th></th>
                  <th>Pic</th>
                  <th>Description</th>
                  <th></th>
                </tr>
              </thead>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
