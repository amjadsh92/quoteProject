/* eslint-disable */
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // Import Bootstrap JS (for components like modals)
import './App.css'
import { useState, useEffect } from "react";
let allQuotes;

function App() {

  const [quote, setQuote] = useState(null)
  const [loading, setLoading] = useState(true);
  
 
  const fetchData = async () => {

        
    try{
      const response = await fetch("https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json")
      allQuotes = await response.json();
      allQuotes= allQuotes.quotes
      let ind = Math.floor(Math.random() * 100);
      let choosedQuote = allQuotes ? allQuotes[ind]?.quote : ""
      let author = allQuotes ? allQuotes[ind]?.author : ""
      setQuote({choosedQuote, author})
      return allQuotes
      
      }
    catch(error){

      console.error("Error fetching data:", error);
    }finally {
      setLoading(false);
    }
  };

  useEffect(()=> {
       
   
  //(async ()=> {allQuotes = await fetchData()})();
  fetchData() 
  console.log("allQuotes",allQuotes)

    }, [])

  const changeQuote = async()=>{
    debugger;
    
    let ind = Math.floor(Math.random() * 100);
    //allQuotes = await fetchData();
    let choosedQuote = allQuotes ? allQuotes[ind]?.quote : "undefined";
    let author = allQuotes ? allQuotes[ind]?.author : "undefined";
    setQuote({choosedQuote, author});

  }  


    return (
        <div id="quote-box" className="quote-box border border-dark w-500px h-250px mx-auto">
          
          <p id="text" className="text-center"><span>""</span>{quote?.choosedQuote}</p>
          <p id="author" className="text-end">{quote?.author} </p>
          <div id="change-quote" className = "d-flex justify-content-between align-items-center mt-5 mb-3">
            <div >
            <button className="btn btn-primary">twitter</button>
            <button className="btn btn-primary mx-1">Tumbler</button>
            </div>
            
            <button className="btn btn-primary" onClick={changeQuote}>new quote</button>
            


          </div>
         </div>



    )

    


}     
     

  



  
  


export default App
