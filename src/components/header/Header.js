import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './Header.scss';
import useLocalStorage from 'use-local-storage';

const Header = (props) => {
    const timeRemaining = useSelector((state) => state.time.timeRemaining);
    const [counter, setCounter] = useState(50);

    useEffect(() => {
      if (counter === 0) {
        setTimeout(() => setCounter(timeRemaining - 1), 1000);
      } else {
        setTimeout(() => setCounter(counter - 1), 1000);
      }
     }, [counter]);
    
    const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const [theme, setTheme] = useLocalStorage('theme', defaultDark ? 'dark' : 'light');

    const switchTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        props.changeTheme(newTheme);
        setTheme(newTheme); 
    }

    const [isSmallScreen, setIsSmallScreen] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 550px)");
        mediaQuery.addEventListener('change', handleMediaQueryChange);
        handleMediaQueryChange(mediaQuery);
    
        return () => {
          mediaQuery.removeEventListener(handleMediaQueryChange);
        };
      }, []);
    
      const handleMediaQueryChange = mediaQuery => {
        if (mediaQuery.matches) {
          setIsSmallScreen(true);
        } else {
          setIsSmallScreen(false);
        }
      };

    return (
        <div className="header" data-theme={theme}>
            <div className="candidate">Front-end Test Candidate</div>
            <div className="time-remaining">
                { counter }
                {' '}
                seconds remaining
            </div>
            <div class="vertical-line">
            <button onClick={switchTheme} type="button" className="theme-toggle">
                {theme === 'light' ? 'Dark' : 'Light'} mode
            </button>
            </div>
        </div>
    );
};

export default Header;
