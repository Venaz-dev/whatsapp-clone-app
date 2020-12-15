import React from "react";

const TimeFormat = ({ time }) => {
  let hours = time.getHours();
  let minutes = time.getMinutes();
  let isToday = time.getDay()
  let day = time.getTime();
  let today = new Date().getTime();

  let difference = today - day;
 
  let seconds = Math.floor(difference / 1000);
  let defminutes = Math.floor(seconds / 60);
  let defhours = Math.floor(defminutes / 60);
  let days = Math.floor(defhours / 24);
  let month = Math.floor(days / 30)

  defhours %= 24;
  defminutes %= 60;
  seconds %= 60;

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
    if (minutes < 10) {
      return `0${minutes}`;
    } else {
      return minutes;
    }
  };

  return (
    <div
      style={{
        fontSize: "11px",
        color: "#999",
        position: "absolute",
        bottom: "0",
        right: "10px",
      }}
    >
      {isToday != new Date().getDay() ? (
        <p style={{ margin: 0 }}>
          {
            days < 30 ? `${days} day${days > 1 && "s"} ago.`
            :  month + " month"+ " ago"
          }
          
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
