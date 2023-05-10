import React, { useEffect } from 'react';
import './Dashboard.css'
import { useState } from 'react';
import BarChart from "./DBarChart";


const Dashboard = () =>
{

  const [ projectState , setprojectState] = useState
  (
    {
    totalproject: "0",
    closed: "0",
    running:"0",
    delay:"0",
    cancelled:"0",
    }
  );


  useEffect( () => 
    {
      fetch("http://localhost:8000/getAllCount",
      {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => 
        { 
          setprojectState
          ({ 
            totalproject:data.count,
            running:data.running,
            closed:data.closed,
            cancelled:data.cancelled,
            delay:data.delay
          })
        });
      },
      []);

    return (
        <div className="bar-graph ">
          <div className="d-flex fa-dashboard dash-box">
              <div className="countbox col-sm">
                <div className=' boxes '>
                  Total Projects
                  <div className=' count  '>{projectState.totalproject}</div>
                </div>
              </div>
              <div className="countbox col-sm">
                <div  className='boxes'>
                  Closed
                  <div className='count '>{projectState.closed}</div>
                </div>
              </div>
              <div className="countbox col-sm">
                <div  className='boxes'>
                  Running
                  <div className='count '>{projectState.running}</div>
                </div>
              </div>
              <div className="countbox col-sm">
                <div  className='boxes'>
                  Closure Delay
                  <div className='count '>{projectState.delay}</div>
                </div>
              </div>
              <div className="countbox col-sm">
                <div  className='boxes'>
                  Cancelled
                  <div className='count '>{projectState.cancelled}</div>
                </div>
              </div>
          </div>


          <div>
            <BarChart/>
		      </div>
      </div>
    )
}

export default Dashboard; 