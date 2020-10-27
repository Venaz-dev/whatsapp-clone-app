import React from "react";

const TimeFormat = ({ time }) => {
  let hours = time.getHours();
  let minutes = time.getMinutes();
  let day = time.getDay();
  let today = new Date().getDay();

  const formatHours = () => {
    if (hours >= 10) {
      if (hours > 12) {
        if (hours - 12 >= 10) {
          return hours - 12;
        } else {
          return `0${hours - 12}`;
        }
      } else {
        return hours;
      }
    } else {
      return `0${hours}`;
    }
  };
  const formatMinutes = () => {
      if(minutes < 10){
          return `0${minutes}`
      }else{
          return minutes
      }
  }

  return (
    <div
      style={{
        fontSize: "11px",
        color: "#999",
        position: "absolute",
        bottom: "5px",
        right: "15px",
      }}
    >
      {day != today ? (
        <p style={{ margin: 0 }}>
          {today - day} day{today - day > 1 && "s"} ago.
        </p>
      ) : (
        <p style={{ margin: 0 }}>
          {formatHours()}:{formatMinutes()} {hours >= 12 ? "PM" : "AM"}.
        </p>
      )}
    </div>
  );
};

export default TimeFormat;
