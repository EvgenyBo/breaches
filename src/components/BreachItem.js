import React from "react";
import { Collapse } from "react-collapse";

export const Spinner = () => (
  <div>
    <h5>Loading...</h5>
  </div>
);

export const BreachItem = ({
  BreachDate,
  Title,
  LogoPath,
  Description,
  onClick,
  isCollapsed,
  PwnCount,
}) => {
  console.log("isCollapsed", isCollapsed);
  let desc = Description.replace(/&quot;/g, "");
  return (
    <div className={"breach"}>
      <div onClick={onClick} className="breach-header">
        <div className={"breach-body"}>
          <span className="breach-title">{Title}</span>
          <span className="breach-date">Breach Date: {BreachDate}</span>
        </div>
        <div className={"breach-img"}>
          <img className={"breach-logo"} src={LogoPath} alt="breach-img" />
        </div>
      </div>
      <div className={`breach-content ${!isCollapsed ? "hidden" : ""}`}>
        <Collapse
          style={{ diplay: isCollapsed ? "" : "none" }}
          isOpened={isCollapsed}
        >
          <hr />
          <span className="breach-pwned">Pwned {PwnCount} times!</span>
          <div className={"breach-desc"}>{`${desc.replace(
            /<\/?[^>]+(>|$)/g,
            ""
          )}`}</div>
        </Collapse>
      </div>
    </div>
  );
};
