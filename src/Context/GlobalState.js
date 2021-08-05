import axios from "axios";
import React, { useState, useEffect } from "react";
import GlobalStateContext from "./GlobalContextState";
import {BASE_URL} from "../constants/Url";

export const GlobalState = (props) => {
  const [poke, setPoke] = useState([]);
  const [actualPage, setActualPage] = useState("");
  const [back, setBack] = useState(false);
  const [loading, setLoading] = useState(true)
  const [text, setText] = useState('')

  useEffect(() => {
    getPoke();
  }, []);

  const getPoke = () => {
    axios
      .get(`${BASE_URL}/get`)
      .then((res) => {
        setPoke(res.data.pokeRedFox);
        setLoading(false)
      })
      .catch((error) => {
        window.alert(error.message)
      });
  };

  const requests = {poke, setPoke, getPoke, loading, setLoading };
  const filter = {text, setText};

  return (
    <GlobalStateContext.Provider value={{ requests, back, setBack, actualPage, setActualPage, filter }}>
      {props.children}
    </GlobalStateContext.Provider>
  );
};

export default GlobalState;