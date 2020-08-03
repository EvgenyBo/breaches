import React, { useState, useEffect } from "react";

import ToggleTheme from "components/ToggleTheme";
import { BreachItem, Spinner } from "components/BreachItem";
import "./App.scss";
import Axios from "axios";

const App = () => {
  const [breaches, setBreaches] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [currBreaches, setCurrBreaches] = useState(0);
  const [collapsedIndex, setCollapsedIndex] = useState(null);

  useEffect(() => {
    let retrieveBreaches = localStorage.getItem("Breaches");
    let cIndex = localStorage.getItem("CollapsedIndex");
    if (retrieveBreaches) {
      const { currBreaches, breaches } = JSON.parse(retrieveBreaches);
      setBreaches(breaches);
      setCollapsedIndex(cIndex ? Number(cIndex) : cIndex);
      setCurrBreaches(currBreaches);
    } else {
      fetchBreachesData(currBreaches);
    }
    window.addEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = () => {
    if (
      Math.ceil(window.innerHeight + document.documentElement.scrollTop) !==
        document.documentElement.offsetHeight ||
      isFetching
    ) {
      return;
    }
    setIsFetching(true);
  };

  const fetchBreachesData = async (offset) => {
    const result = await Axios.get(
      `https://guard.io/v2/hiring/fe/breaches?offset=${offset}`,
      {
        headers: {
          "X-Best-Pokemon": "jigglypuff",
        },
      }
    );
    const { total, items } = result.data;
    setCurrBreaches(currBreaches + items.length);
    setBreaches([...breaches, ...items]);
    localStorage.setItem(
      "Breaches",
      JSON.stringify({
        currBreaches: currBreaches + items.length,
        breaches: [...breaches, ...items],
      })
    );
  };

  useEffect(() => {
    if (!isFetching) return;
    fetchMoreBreachItems();
  }, [isFetching]);

  const fetchMoreBreachItems = async () => {
    fetchBreachesData(currBreaches);
    setIsFetching(false);
  };

  const setCollapsed = (i) => {
    const index = i !== collapsedIndex ? i : null;
    setCollapsedIndex(i !== collapsedIndex ? i : null);
    localStorage.setItem("CollapsedIndex", index);
  };

  const BreachesList = () => {
    return breaches.map((breach, i) => (
      <BreachItem
        onClick={() => setCollapsed(i)}
        isCollapsed={i === collapsedIndex}
        key={breach.Name}
        {...breach}
      />
    ));
  };

  return (
    <div className="app">
      <ToggleTheme />
      <h2>Breaches Demo</h2>
      <div className={"breach-container"}>
        {breaches.length > 0 ? <BreachesList /> : <Spinner />}
      </div>
      {isFetching && <h1>Fetching more list items...</h1>}
    </div>
  );
};

export default App;
