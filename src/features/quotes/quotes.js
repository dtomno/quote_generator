import React, { useRef, useState } from "react";
import { setQuotes } from "./quotesSlice";
import { useSelector, useDispatch } from "react-redux";
import { useTransition } from 'react-transition-state';
import TwitterIcon from '../../assets/ticon.svg';

const Quotes = () => {
    const quotes = useSelector(state => state.quotes);
    const heading = useRef();
    const text = useRef();
    const author = useRef();
    const quoteBox = useRef();
    const tweetButton = useRef();
    const newQuoteButton = useRef();

    var colors = ['#16a085','#27ae60','#f34040','#f39c12','#e74c3c','#9b59b6','#FB6964','#4c2ff5','#FFD600','#BDBB99','#77B1A9','#73A857'];

    const createColorIndex = () => Math.floor(Math.random()*colors.length);
    const createRandomIndex = () => Math.floor(Math.random()*quotes.length);

    const [randomIndex,setRandomIndex] = useState(createRandomIndex());
    const [colorIndex,setColorIndex] = useState(createColorIndex());
    const [{status, isMounted, isEnter},animate] = useTransition({ 
        timeout: 500, 
        preEnter: true,
        initialEntered: true  
    });

    const removeQuote = () => {
        animate();
        setColorIndex(createColorIndex);
        quoteBox.current.style.boxShadow = `0px 0px 4px 4px ${colors[colorIndex]}`;
        setTimeout(addQuote,500);
    };

    const addQuote = () => {
        if (isEnter) {
            setRandomIndex(createRandomIndex());
            animate();
        }
    }

    const handleErrors= (status) => {
        heading.current.innerHTML = status;
    };

    const clearErrors= (status = '') => {
        heading.current.innerHTML = 'Random quote generator';
    };

    const dispatch = useDispatch();

    const fetchQuotes = async() => {
        const API_URL = 'https://type.fit/api/quotes';
        let data;
        try {
            const response = await fetch(API_URL);
            if (response.status>=200 && response.status <=299){
                data = await response.json();
            }
        } catch (error) {
            handleErrors('Please check your network');
        }
        clearErrors();
        dispatch(setQuotes(data));
    }

    if (quotes.length < 1) {
        fetchQuotes();
    }
    
    return (
        <div ref={quoteBox} id="quote-box">
            <h1 ref={heading}>Random quote generator</h1>
            {isMounted && quotes.length > 0 && (
                <>
                    <div ref={text} className={`animate ${status}`} id="text">{ quotes[randomIndex].text}</div>
                    <div ref={author} className={`animate ${status}`} id="author">{quotes[randomIndex].author ? quotes[randomIndex].author: 'Anonymous'}</div>
                    <div id="tweet_newquote">
                        <div ref={tweetButton} id="tweet-box">
                            <a id="tweet-quote" href={`https://twitter.com/intent/tweet?hashtags=quotes&text="${quotes[randomIndex].text}" - ${quotes[randomIndex].author}`} target="_blank" rel="noreferrer">
                                <img className={`animate ${status}`} src={TwitterIcon} alt='tweet'/>
                            </a>
                        </div>
                        <div ref={newQuoteButton} id="new-quote" onClick={removeQuote}>New quote</div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Quotes;