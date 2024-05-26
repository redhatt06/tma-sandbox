import React from 'react';
import './Statistics.css';
import TappingChart from "./components/TappingChart";
const Statistics = () => {
  return (
<div className='main-container'>
<div className="grid-container">
  <div className="grid-item item1"><TappingChart/></div>
  <div className="grid-item item2"><p >Total Taps</p><p className='black'>89252</p></div>

  <div className="grid-item item5">5</div>
</div>
</div>
    
  );
};

export default Statistics;
