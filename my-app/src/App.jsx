/* eslint-disable */
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // Import Bootstrap JS (for components like modals)
import './App.css'
import { useState, useEffect } from "react";
let allQuotes;

function App() {

  const [quoteBox, setQuote] = useState({backgroundColor:"bg-primary",quoteTextColor:"text-primary"  })
  const [color, setColor] = useState({backgroundColor:"bg-primary", textColor:"text-primary"})
  const [loading, setLoading] = useState(true);
  
  const backgroundColors = [
    "bg-sunset-orange",
    "bg-deep-coffee",
    "bg-emerald-green",
    "bg-royal-purple",
    "bg-navy-storm",
    "bg-mulberry-brown",
    "bg-coral-red"
  ];
  
  const textColors = [
    "text-sunset-orange",
    "text-deep-coffee",
    "text-emerald-green",
    "text-royal-purple",
    "text-navy-storm",
    "text-mulberry-brown",
    "text-coral-red"
  ];

  
  const fetchData = async () => {

        
    try{
      const response = await fetch("https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json")
      allQuotes = await response.json();
      allQuotes= allQuotes.quotes
      let ind = Math.floor(Math.random() * 100);
      let quote = allQuotes ? allQuotes[ind]?.quote : ""
      let author = allQuotes ? allQuotes[ind]?.author : ""
      let indColor = Math.floor(Math.random() * 7);
      quoteBox.backgroundColor = backgroundColors[indColor];
      quoteBox.quoteTextColor = textColors[indColor];
      setQuote({quote, author, backgroundColor:quoteBox.backgroundColor, quoteTextColor:quoteBox.quoteTextColor })
      
      return allQuotes
      
      }
    catch(error){

      console.error("Error fetching data:", error);
    }finally {
      setLoading(false);
    }
  };

  useEffect(()=> {
       
   
  
  fetchData() 


    }, [])

  const changeQuote = async()=>{
    debugger;
    
    let ind = Math.floor(Math.random() * 100);
    let quote = allQuotes ? allQuotes[ind]?.quote : "undefined";
    let author = allQuotes ? allQuotes[ind]?.author : "undefined";
    let indColor = Math.floor(Math.random() * 7);
    quoteBox.backgroundColor = backgroundColors[indColor];
    quoteBox.quoteTextColor = textColors[indColor];
    setQuote({quote, author, backgroundColor:quoteBox.backgroundColor, quoteTextColor:quoteBox.quoteTextColor });

  }  


    return (
        <div id="quote-box" className={`quote-box bg-white border border-dark w-500px mx-auto`}>
          
          <p id="text" className={`text-center ${quoteBox.quoteTextColor}`}><span>""</span>{quoteBox.quote}</p>
          <p id="author" className={`text-end ${quoteBox.quoteTextColor}`}>{quoteBox.author} </p>
          <div id="change-quote" className = "d-flex justify-content-between align-items-center mt-5 mb-3">
            <div className="d-flex gap-1">
            <button className={`btn btn-primary ${quoteBox.backgroundColor} border-0`}>twitter</button>
            <button className={`btn btn-primary ${quoteBox.backgroundColor} border-0`}>Tumbler</button>
            </div>
                                    
            <button className={`btn btn-primary ${quoteBox.backgroundColor} border-0`} onClick={changeQuote}>new quote</button>
            


          </div>
         </div>



    )

    


}     
     

export default App
