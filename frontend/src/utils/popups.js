import { confirmAlert } from "react-confirm-alert";

export const popup = (title, message, yesOnClick, noOnClick) => {
  return confirmAlert({
    title: title,
    message: message,
    buttons: [
      {
        label: "Yes",
        onClick: () => {
          yesOnClick();
        },
      },
      {
        label: "No",
        onClick: () => {
          noOnClick();
        },
      },
    ],
  });
};
