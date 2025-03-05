/* eslint-disable */
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons";
import { faTwitter, faTumblr } from "@fortawesome/free-brands-svg-icons";

function App() {
  const [body, setBody] = useState({ color: "body-color" });
  const [isLoaded, setIsLoaded] = useState(false);
  const [allQuotes, setAllQuotes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"
        );
        const data = await response.json();
        setAllQuotes(data.quotes);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoaded(true);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={`background h-100 min-vh-100 w-100 p-1px  ${body.color}`}>
      <QuoteBox
        updateBody={setBody}
        allQuotes={allQuotes}
        isLoaded={isLoaded}
      />
    </div>
  );
}

export default App;

function QuoteBox({ updateBody, allQuotes, isLoaded }) {
  const [quoteBox, setQuoteBox] = useState({
    quote: "",
    author: "",
    backgroundColor: "body-color",
    quoteTextColor: "text-color",
  });
  const [isFading, setIsFading] = useState(false);
  const [hideQuote, setHideQuote] = useState(true);

  const backgroundColors = [
    "bg-sunset-orange",
    "bg-deep-coffee",
    "bg-emerald-green",
    "bg-royal-purple",
    "bg-navy-storm",
    "bg-mulberry-brown",
    "bg-coral-red",
  ];

  const textColors = [
    "text-sunset-orange",
    "text-deep-coffee",
    "text-emerald-green",
    "text-royal-purple",
    "text-navy-storm",
    "text-mulberry-brown",
    "text-coral-red",
  ];

  const updateQuoteBox = () => {
    let indQuote = Math.floor(Math.random() * allQuotes.length);
    let quote = allQuotes[indQuote]?.quote || "";
    let author = allQuotes[indQuote]?.author || "";
    let indColor = Math.floor(Math.random() * backgroundColors.length);
    let backgroundColor = backgroundColors[indColor];
    let quoteTextColor = textColors[indColor];

    setQuoteBox({ quote, author, backgroundColor, quoteTextColor });
    updateBody({ color: backgroundColor });
  };

  useEffect(() => {
    if (allQuotes.length === 0) return;
    setHideQuote(true);
    updateQuoteBox();

    setTimeout(() => {
      setIsFading(true);

      setTimeout(() => {
        setHideQuote(false);
        setIsFading(false);
      }, 500);
    }, 1000);
  }, [allQuotes]);

  const changeQuote = async () => {
    setIsFading(true);

    setTimeout(() => {
      updateQuoteBox();
      setIsFading(false);
    }, 500);
  };

  return (
    <div
      id="quote-box"
      className={`quote-box bg-white border border-dark w-500px mx-auto border-0 rounded-1 `}
    >
      <p
        id="text"
        className={`text-center fs-3  position-relative ${quoteBox.quoteTextColor} ${isFading ? "fade-out" : "fade-in"}`}
      >
        {isLoaded && (
          <FontAwesomeIcon icon={faQuoteLeft} className="me-2 fs-2" />
        )}{" "}
        {!hideQuote ? quoteBox.quote : ""}
      </p>
      <p
        id="author"
        className={`text-end ${quoteBox.quoteTextColor} ${isFading ? "fade-out" : "fade-in"}`}
      >
        {!hideQuote && (
          <>
            <span className="me-1">-</span> {quoteBox.author}
          </>
        )}{" "}
      </p>
      <div
        id="change-quote"
        className="d-flex justify-content-between align-items-center mt-5 mb-3"
      >
        <div className="d-flex gap-1">
          <a
            href={`https://twitter.com/intent/tweet?${encodeURIComponent(quoteBox.quote + " - " + quoteBox.author)}`}
            target="_blank"
          >
            <button
              className={`btn btn-primary fade-button ${quoteBox.backgroundColor} btn-hover-light border-0 tumblr`}
            >
              <FontAwesomeIcon icon={faTwitter} />
            </button>
          </a>
          <a
            href={`https://www.tumblr.com/login?redirect_to=https%3A%2F%2Fwww.tumblr.com%2Fwidgets%2Fshare%2Ftool%3Fposttype%3Dquote%26tags%3Dquotes%252Cfreecodecamp%26caption%3DKevin%2BKruse%26content%3DLife%2Bisn%25E2%2580%2599t%2Babout%2Bgetting%2Band%2Bhaving%252C%2Bit%25E2%2580%2599s%2Babout%2Bgiving%2Band%2Bbeing.%26canonicalUrl%3Dhttps%253A%252F%252Fwww.tumblr.com%252Fbuttons%26shareSource%3Dtumblr_share_button`}
            target="_blank"
          >
            <button
              className={`btn btn-primary fade-button ${quoteBox.backgroundColor} btn-hover-light border-0 tumblr`}
            >
              <FontAwesomeIcon icon={faTumblr} />
            </button>
          </a>
        </div>

        <button
          className={`btn btn-primary fade-button ${quoteBox.backgroundColor} btn-hover-light border-0`}
          onClick={changeQuote}
        >
          new quote
        </button>
      </div>
    </div>
  );
}
