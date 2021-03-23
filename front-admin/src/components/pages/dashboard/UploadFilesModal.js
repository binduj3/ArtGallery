import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Datetime from "react-datetime";
import Moment from "moment";

import { upLoadFiles } from "../../../actions/dashboard";
import { fileValidation } from "../../../utils/global";

const UploadFilesModal = () => {
  const [year, setYear] = useState(new Date());
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState("");
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();

  const onValidate = () => {
    let errorList = {};
    let isValid = true;

    if (!description || description.trim() === "") {
      isValid = false;
      errorList.description = "Description is required";
    }

    if (files.length < 0 || !files || files === "") {
      isValid = false;
      errorList.files = "Upload File";
    } else {
      for (let eachFile of files) {
        if (eachFile && !fileValidation(eachFile)) {
          isValid = false;
          errorList.files = "Please upload file an image";
          break;
        }
      }
    }

    setErrors(errorList);
    return isValid;
  };

  const onSaveClick = (e) => {
    e.preventDefault();
    if (onValidate()) {
      const formData = new FormData();
      for (let eachFile of files) {
        formData.append("files", eachFile);
      }
      formData.append("description", description);
      formData.append("year", Moment(year).format("YYYY"));

      dispatch(upLoadFiles(formData));

      document.getElementById("close-uploadFiles").click();
    }
  };

  const onClose = () => {
    setDescription("");
    setErrors({});
  };

  const handleFileChange = (e) => {
    const file = e.target.files;
    let errorList = {};

    setFiles(file);

    for (let eachFile of file) {
      if (eachFile && !fileValidation(eachFile)) {
        errorList.files = "Please upload file an image";
        break;
      }
    }

    setErrors(errorList);
  };

  const onChangeYear = (newYear) => {
    setYear(newYear);
  };

  return (
    <div
      className='modal fade'
      id='uploadFilesModal'
      tabIndex='-1'
      aria-labelledby='uploadFilesModalLabel'
      aria-hidden='true'
    >
      console.log("yea" + year.toString());
      <div className='modal-dialog modal-lg'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h5 className='modal-title' id='uploadFilesModalLabel'>
              Upload Files
            </h5>
            <button
              type='button'
              className='close'
              data-dismiss='modal'
              aria-label='Close'
            >
              <span aria-hidden='true'>&times;</span>
            </button>
          </div>
          <div className='modal-body'>
            <form encType='multipart/form-data'>
              <div className='form-group'>
                <label htmlFor='year' className='col-form-label'>
                  Year
                </label>
                <Datetime
                  dateFormat='YYYY'
                  timeFormat={false}
                  value={year}
                  onChange={onChangeYear}
                />
                {/* <input
                  type='date'
                  className={`form-control ${errors.year && "border-danger"}`}
                  id='add-date'
                  required
                  value={year}
                  name='year'
                  onChange={(e) => setYear(e.target.value)}
                /> */}
                <div className='text-danger'>{errors.year}</div>
              </div>

              <div className='form-group'>
                <label htmlFor='files' className='col-form-label'>
                  Files
                </label>
                <input
                  type='file'
                  className={`form-control ${errors.files && "border-danger"}`}
                  id='files'
                  required
                  name='files'
                  onChange={handleFileChange}
                  accept=' application/image'
                  multiple
                />
                <div className='text-danger'>{errors.files}</div>
              </div>

              <div className='form-group'>
                <label htmlFor='description' className='col-form-label'>
                  Description
                </label>
                <textarea
                  className={`form-control ${
                    errors.description && "border-danger"
                  }`}
                  id='description'
                  required
                  name='description'
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
                <div className='text-danger'>{errors.description}</div>
              </div>
            </form>
          </div>
          <div className='modal-footer'>
            <button
              type='button'
              className='btn'
              data-dismiss='modal'
              id='close-uploadFiles'
              onClick={() => onClose()}
            >
              Close
            </button>
            <button type='submit' className='btn ' onClick={onSaveClick}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadFilesModal;
