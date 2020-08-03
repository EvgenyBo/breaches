import React, { useState, useEffect, useRef } from "react";
import { useMediaPredicate } from "react-media-hook";
import Switch from "react-switch";
import { FaSun, FaMoon } from "react-icons/fa";

const ToggleTheme = () => {
  const preferredTheme = useMediaPredicate("(prefers-color-scheme: dark)")
    ? "dark"
    : "light";
  const [themeState, setThemeState] = useState(false);
  const isFirstRun = useRef(true);
  const getTheme = localStorage.getItem("Theme");

  const isInitialDark = () => {
    const isDark =
      getTheme === "dark" ||
      (preferredTheme === "dark" && getTheme !== "light");
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return isDark;
    }
  };
  useEffect(() => {
    if (isInitialDark() || themeState) {
      localStorage.setItem("Theme", "dark");
      document.body.classList.add("dark-mode");
      setThemeState(true);
    } else {
      localStorage.setItem("Theme", "light");
      document.body.classList.remove("dark-mode");
      setThemeState(false);
    }
  }, [preferredTheme, themeState]);

  return (
    <div className="header">
      <Switch
        onChange={() => setThemeState(!themeState)}
        checked={themeState}
        checkedIcon={<FaMoon className={"moon-icon"} color={"#F0C420"} />}
        uncheckedIcon={<FaSun className={"sun-icon"} color={"#FFDF22"} />}
        offColor={"#02CCFE"}
        onColor={"#234E86"}
        offHandleColor={"#fff"}
        onHandleColor={"#363737"}
      />
    </div>
  );
};

export default ToggleTheme;
