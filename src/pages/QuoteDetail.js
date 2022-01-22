import React, {useEffect} from "react";
import { useParams, Route, Link, useRouteMatch } from "react-router-dom";
import HighlightedQuote from "../components/quotes/HighlightedQuote";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import Comments from "../components/comments/Comments";
import useHttp from "../hooks/use-http";
import { getSingleQuote } from "../lib/api";

/* const DUMMY_QUOTES = [
  { id: "q1", author: "EURO", text: "Learning react is fun!." },
  { id: "q2", author: "MAX", text: "Learning react is boring!." },
]; */

const QuoteDetail = () => {
  const match = useRouteMatch();
  const params = useParams();
  const {quoteId} = params
  console.log(match);
  const {
    sendRequest,
    status,
    data: loadedQuote,
    error,
  } = useHttp(getSingleQuote, true);

  useEffect(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);

  if(error){
    return <p className="centered focused">{error}</p>
  }

  if(status === "pending"){
    return <div className="centered">
      <LoadingSpinner />
    </div>
  }

  if (!loadedQuote.text) {
    return <p>No quote found!</p>;
  }

  return (
    <React.Fragment>
      <HighlightedQuote text={loadedQuote.text} author={loadedQuote.author} />
      <Route path={match.path} exact>
        <div className="centered">
          <Link className="btn--flat" to={`${match.url}/comments`}>
            Load Comments
          </Link>
        </div>
      </Route>
      <Route path={`${match.path}/comments`}>
        <Comments />
      </Route>
    </React.Fragment>
  );
};

export default QuoteDetail;
