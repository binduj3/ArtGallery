import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { updateFile } from "../../../actions/dashboard";

const EditFileModal = ({ current }) => {
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();

  useEffect(() => {
    if (current) {
      setDescription(current.description);
    }
  }, [current]);

  const onValidate = () => {
    let errorList = {};
    let isValid = true;

    if (!description || description.trim() === "") {
      isValid = false;
      errorList.description = "Description is required";
    }

    setErrors(errorList);
    return isValid;
  };

  const onSaveClick = (e) => {
    e.preventDefault();
    if (onValidate()) {
      current.description = description;
      dispatch(updateFile(current._id, {description}, current));

      document.getElementById("close-updateFile").click();
    }
  };

  const onClose = () => {
    setDescription("");
    setErrors({});
  };

  return (
    <div
      className='modal fade'
      id='editFileModal'
      tabIndex='-1'
      aria-labelledby='editFileModalLabel'
      aria-hidden='true'
    >
   
      <div className='modal-dialog modal-lg'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h5 className='modal-title' id='editFileModalLabel'>
              Update File
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
          </div>
          <div className='modal-footer'>
            <button
              type='button'
              className='btn bg-color-orange'
              data-dismiss='modal'
              id='close-updateFile'
              onClick={() => onClose()}
            >
              Close
            </button>
            <button
              type='submit'
              className='btn bg-color-white '
              onClick={onSaveClick}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditFileModal;
