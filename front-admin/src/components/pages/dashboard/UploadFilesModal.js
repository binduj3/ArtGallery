import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { upLoadFiles } from "../../../actions/dashboard";

const UploadFilesModal = () => {
  const [year, setYear] = useState();
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
    }
    //  else {
    //   for (let eachFile of file) {
    //     if (eachFile && !fileValidation(eachFile)) {
    //       isValid = false;
    //       errorList.file = "Please upload file in image format";
    //       break;
    //     }
    //   }
    // }

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
      formData.append("year", year);

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

    // for (let eachFile of file) {
    //   if (eachFile && !fileValidation(eachFile)) {
    //     errorList.file = "Please upload file in pdf format";
    //     break;
    //   }
    // }

    setErrors(errorList);
  };

  return (
    <div
      className='modal fade'
      id='uploadFilesModal'
      tabIndex='-1'
      aria-labelledby='uploadFilesModalLabel'
      aria-hidden='true'
    >
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
            <form>
              <div className='form-group'>
                <label htmlFor='year' className='col-form-label'>
                  Year
                </label>
                <input
                  type='date'
                  className={`form-control ${errors.year && "border-danger"}`}
                  id='add-date'
                  required
                  value={year}
                  name='year'
                  onChange={(e) => setYear(e.target.value)}
                />
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
