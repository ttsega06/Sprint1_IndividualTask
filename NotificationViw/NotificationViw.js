import { Component } from "react";
// import { Link } from "react-router-dom";
// import Switch from "react-switch"
import "./Notification.css";
import React, { useState, useEffect } from "react";

//create your forceUpdate hook
function useForceUpdate() {
  const [value, setValue] = useState(0); // integer state
  return () => setValue((value) => value + 1); // update state to force render
  // A function that increment 👆🏻 the previous state like here
  // is better than directly setting `setValue(value + 1)`
}

export default function NotificationViw(props) {
  const links = [
    {
      route: "/",
      text: "Back to main screen",
      class: "home-button",
    },
  ];
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetch(
      "https://qyv6v2cspb.execute-api.us-west-2.amazonaws.com/dev/Notification?userId=123"
    )
      .then((res) => res.json())
      .then(
        (result) => {
          setNotifications(result.data);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {}
      );
  }, []);

  const closeNotification = (n) => {
    return () => {
      console.log("removing " + n);
      // notifications.remove(n)
      const index = notifications.indexOf(n);
      notifications.splice(index, 1);
      let updatedNotifications = notifications.slice(); // make a copy
      setNotifications(updatedNotifications);
      console.log(notifications);
      //   useForceUpdate();
    };
  };

  return (
    // padding 5 all around
    <div className="p-5">
      <div className="container-fluid">
        <div className="row justify-content-md-center">
          <div className="col-3 sidebar">
            {links.map((x) => (
              <p key={x.text} className="sidebar-item pb-5">
                {/* <Link to={x.route}> */}
                <button className={"button " + x.class}>{x.text}</button>
                {/* </Link> */}
              </p>
            ))}
          </div>

          <div className="col content">
            {notifications.map((n) => (
              <div
                id="toast-warning"
                className="flex items-center w-full max-w-xs p-4 m-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
                role="alert"
                key={n.message}
              >
                <div className="ml-3 text-sm font-normal">{n.message}</div>
                <button
                  type="button"
                  className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
                  data-dismiss-target="#toast-warning"
                  aria-label="Close"
                  onClick={closeNotification(n)}
                >
                  <span className="sr-only">Close</span>
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
