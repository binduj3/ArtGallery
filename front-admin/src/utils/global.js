import Swal from "sweetalert2";

export const Message = (
  icon = "success",
  title = "Added",
  text = "",
  showConfirmButton = "false",
  timer = 1500
) => {
  Swal.fire({
    icon: icon,
    title: title,
    text: text,
    showConfirmButton: showConfirmButton,
    timer: timer,
  });
};

export const DeleteMessage = (id, callback) => {
  Swal.fire({
    title: "Are you sure you want to delete?",

    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#fd6a02",
    cancelButtonColor: "#fff",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      callback(id);
    }
  });
};

export const fileValidation = (file) => {
  let allowedExtensions = /(\.jpg|.png|.gif)$/i;

  if (file && !allowedExtensions.exec(file.name)) {
    return false;
  }
  return true;
};
