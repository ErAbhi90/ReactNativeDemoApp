import React, { createContext, useEffect, useState } from "react";
import { getNewsAPI, getSourceAPI } from "./api";
import axios from "axios";

export const NewsContext = createContext();

const Context = ({ children }) => {
  const [news, setNews] = useState([]);
  const [category, setCategory] = useState("general");
  const [source, setSource] = useState();
  const [index, setIndex] = useState(1);
  const [darkTheme, setDarkTheme] = useState(false);

  const fetchNews = async (reset = category) => {
    const { data } = await axios.get(getNewsAPI(reset));
    setNews(data);
    setIndex(1);
  };

  useEffect(() => {
    fetchNews();
  }, [category]);

  const fetchNewsFromSource = async () => {
    try {
      const { data } = await axios.get(getSourceAPI(source));
      setNews(data);
      setIndex(1);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchNewsFromSource();
  }, [source]);

  return (
    <NewsContext.Provider
      value={{
        news,
        setCategory,
        index,
        setIndex,
        setSource,
        darkTheme,
        setDarkTheme,
        fetchNews,
      }}
    >
      {children}
    </NewsContext.Provider>
  );
};

export default Context;