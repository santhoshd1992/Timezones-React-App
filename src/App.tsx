import React, { useState } from "react";
import "./App.css";

const App: React.FC = () => {
  const [lastClicked, setLastClicked] = useState<Date | undefined>(undefined);
  const [buttonColor, setButtonColor] = useState<string>("#ff0000");
  const [transitionClass, setTransitionClass] = useState<string>("");

  const onClick = () => {
    setLastClicked(new Date());
    setButtonColor(getRandomColor());

     // Trigger a transition by toggling a class
     setTransitionClass("transition-effect");

     // Remove the class after the animation duration to reset the state
     setTimeout(() => {
       setTransitionClass("");
     }, 300); // Adjust the duration to match the transition time in CSS
  };

  const getRandomColor = (): string => {
    // Generate a random color in hexadecimal format
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const formatDate = (date: Date, timeZone?: string) => {
    return new Intl.DateTimeFormat(undefined, {
      timeZone: timeZone || undefined,  // Omitting this will use the user's local timezone
      dateStyle: "full",
      timeStyle: "long",
    }).format(date);
  };

  return (
    <>
      <div>
        <button onClick={onClick} style={{ backgroundColor: buttonColor }}>
          Click
        </button>
      </div>
      <div className={`TimeContainer ${transitionClass}`}>
        <div className="TimeItem">
          <div className="TimeZoneChip" style={{backgroundColor:"red"}}>Local time</div>
          <div className="TimeDate">
            {lastClicked ? formatDate(lastClicked) : "Click the Button!"}
          </div>
        </div>
        <div className="TimeItem">
          <div className="TimeZoneChip" style={{backgroundColor:"blue"}}>GMT Time</div>
          <div className="TimeDate">
            {lastClicked ? formatDate(lastClicked, "UTC") : "Click the Button!"}
          </div>
        </div>
        <div className="TimeItem">
          <div className="TimeZoneChip" style={{backgroundColor:"green"}}>ACT Time</div>
          <div className="TimeDate">
            {lastClicked ? formatDate(lastClicked, "Australia/Darwin") : "Click the Button!"}
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
