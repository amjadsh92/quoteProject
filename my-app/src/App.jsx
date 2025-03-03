/* eslint-disable */
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // Import Bootstrap JS (for components like modals)
import './App.css'
import { useState, useEffect } from "react";
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'

import {faQuoteLeft} from '@fortawesome/free-solid-svg-icons'
import { faTwitter, faTumblr } from "@fortawesome/free-brands-svg-icons";
let allQuotes;

function App() {

const [background, setBackground] = useState({color: "body-color"})

 
return(
  <div className = {`background h-100 min-vh-100 w-100 p-1px  ${background.color}`}>

      <QuoteBox updateBackground= {setBackground}  />
 
  </div>

)
    


}     
     

export default App






function QuoteBox({updateBackground}){
  

  const [quoteBox, setQuote] = useState({quote:"", author:"", backgroundColor:"bg-primary",quoteTextColor:"text-primary"  })
  const [isFading, setIsFading] = useState(false)
  const [isLoaded, setIsLoaded]= useState(false)
  
  const backgrounColors = [
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
      let indQuote = Math.floor(Math.random() * 100);
      let quote = allQuotes ? allQuotes[indQuote]?.quote : ""
      let author = allQuotes ? allQuotes[indQuote]?.author : ""
      let indColor = Math.floor(Math.random() * 7);
      let backgroundColor = backgrounColors[indColor];
      let quoteTextColor = textColors[indColor];
      let bodyColor = backgrounColors[indColor]
      setQuote({quote, author, backgroundColor, quoteTextColor })
      updateBackground({color: bodyColor})
      
      
      }
    catch(error){

      console.error("Error fetching data:", error);
    }finally {
      setIsLoaded(true);
    }
  };

  useEffect(()=> {
       
   
  
  fetchData() 


    }, [])

  const changeQuote = async()=>{
    setIsFading(true)
    
    setTimeout( () => {
    let indQuote = Math.floor(Math.random() * 100);
    let quote = allQuotes ? allQuotes[indQuote]?.quote : "undefined";
    let author = allQuotes ? allQuotes[indQuote]?.author : "undefined";
    let indColor = Math.floor(Math.random() * 7);
    let backgroundColor = backgrounColors[indColor];
    let quoteTextColor = textColors[indColor];
    let bodyColor = backgrounColors[indColor]
    setQuote({quote, author, backgroundColor, quoteTextColor });
    setIsFading(false)
    
    updateBackground({color:bodyColor})
    }, 500
    )
  }  


    return (
        isLoaded ? (<div id="quote-box" className={`quote-box bg-white border border-dark w-500px mx-auto border-0 rounded-1 `}>
          
          <p id="text" className={`text-center fs-3  position-relative ${quoteBox.quoteTextColor} ${isFading ? "fade-out":"fade-in" }`}><FontAwesomeIcon icon={faQuoteLeft} className="me-2 fs-2" /> {quoteBox.quote}</p>
          <p id="author" className={`text-end ${quoteBox.quoteTextColor} ${isFading ? "fade-out":"fade-in" }`}><span className="me-1">-</span>{quoteBox.author} </p>
         <div id="change-quote" className = "d-flex justify-content-between align-items-center mt-5 mb-3">
            <div className="d-flex gap-1">
            {/* <a 
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(quoteBox.quote + " - " + quoteBox.author)}`} 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={(event) => event.stopPropagation()} // Prevent triggering other button behavior
              className={`btn btn-primary fade-button ${quoteBox.backgroundColor} btn-hover-light border-0 twitter`}
>
             <FontAwesomeIcon icon={faTwitter} />
             </a> */}
             <a href={`https://twitter.com/intent/tweet?${encodeURIComponent(quoteBox.quote + " - " + quoteBox.author)}` } target="_blank"><button className={`btn btn-primary fade-button ${quoteBox.backgroundColor} btn-hover-light border-0 tumblr`}><FontAwesomeIcon icon={faTwitter} /></button></a> 
            <a href={`https://www.tumblr.com/login?redirect_to=https%3A%2F%2Fwww.tumblr.com%2Fwidgets%2Fshare%2Ftool%3Fposttype%3Dquote%26tags%3Dquotes%252Cfreecodecamp%26caption%3DKevin%2BKruse%26content%3DLife%2Bisn%25E2%2580%2599t%2Babout%2Bgetting%2Band%2Bhaving%252C%2Bit%25E2%2580%2599s%2Babout%2Bgiving%2Band%2Bbeing.%26canonicalUrl%3Dhttps%253A%252F%252Fwww.tumblr.com%252Fbuttons%26shareSource%3Dtumblr_share_button`} target = "_blank"><button className={`btn btn-primary fade-button ${quoteBox.backgroundColor} btn-hover-light border-0 tumblr`}><FontAwesomeIcon icon={faTumblr} /></button></a>
            </div>
                                    
            <button className={`btn btn-primary fade-button ${quoteBox.backgroundColor} btn-hover-light border-0`} onClick={changeQuote}>new quote</button>
            


          </div>
         </div>) : ""



    )

}