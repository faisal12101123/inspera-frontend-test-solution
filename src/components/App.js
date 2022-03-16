import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { setRemainingTime } from '../actions/timeActions';
import timeService from '../services/timeService';
import Header from './header/Header';
import useLocalStorage from 'use-local-storage';
import './App.scss';

const GET_REMAINING_TIME_TIMER = 10 * 1000; // every 10 seconds
let interval;

const App = () => {
    const dispatch = useDispatch();

    const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const [theme, setTheme] = useLocalStorage('theme', defaultDark ? 'dark' : 'light');
    const updateTheme = (newTheme) => {
        setTheme(newTheme)
    }
    
    const updateTime = async () => {
        const timeRemaining = await timeService.requestUpdatedTime();
        dispatch(setRemainingTime(timeRemaining));
    };

    useEffect(async () => {
        await updateTime();
        interval = setInterval(() => {
            updateTime();
        }, GET_REMAINING_TIME_TIMER);
        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <div className="app-wrapper default">
            <Header changeTheme={updateTheme}/>
            <div className="body" data-theme={theme}>
                <h1>Welcome to your Inspera exam</h1>
                <hr />
                <div className="text-interaction">
                    <label>
                        <p>What is your answer?</p>
                        <input
                            placeholder="Type here..."
                        />
                    </label>
                </div>
                <hr />
                <div className="mpc-interaction">
                    <div className="mpc-row-div mpc-row-div-top">
                    <label>
                        <input type="checkbox" value="Alternative 1" className="mpc-row-input"/>
                        <p className="mpc-row-p">Alternative 1</p>
                    </label>
                    </div>
                    <div className="mpc-row-div">
                    <label>
                        <input type="checkbox" value="Alternative 2" className="mpc-row-input"/>
                        <p className="mpc-row-p">Alternative 2</p>
                    </label>
                    </div>
                    <div className="mpc-row-div">
                    <label>
                        <input type="checkbox" value="Alternative 3" className="mpc-row-input"/>
                        <p className="mpc-row-p">Alternative 3</p>
                    </label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;
