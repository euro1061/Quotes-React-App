import React from "react";
import { useEffect } from "react";
import QuoteList from "../components/quotes/QuoteList";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import NoQuotesFound from '../components/quotes/NoQuotesFound'
import useHttp from "../hooks/use-http";
import { getAllQuotes } from "../lib/api";
/* const DUMMY_QUOTES = [
  { id: "q1", author: "EURO", text: "Learning react is fun!." },
  { id: "q2", author: "MAX", text: "Learning react is boring!." },
]; */

const AllQuotes = () => {
  const {
    sendRequest,
    status,
    data: loadedQuote,
    error,
  } = useHttp(getAllQuotes, true);

  useEffect(()=>{
    sendRequest();
  },[sendRequest])

  if(status === "pending"){
    return <div className="centered">
      <LoadingSpinner />
    </div>
  }

  if(error){
    return <p className="centered focused">{error}</p>
  }

  if(status === "completed" && (!loadedQuote || loadedQuote.length === 0)){
    return <NoQuotesFound />
  }

  return <QuoteList quotes={loadedQuote} />;
};

export default AllQuotes;
