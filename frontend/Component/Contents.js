
//Contents page including Side Navbar , changable routes and logout logic

import React from 'react';
import Table from './Table';
import Dashboard from './Dashboard';
import CreateProject from './CreateProject';
import { Route, Routes } from 'react-router-dom';
import {useState} from 'react';
import { NavLink } from 'react-router-dom';
import "./Contents.css" ;
import { MDBContainer } from 'mdb-react-ui-kit';

        
function Contents ()
{
    // settting state
    const [pageInfo,setPageInfo] = useState('Dashboard');

    const logOut = () => 
    {
        window.localStorage.clear();
        window.localStorage.href = "./Login";
    }
        return (            
            <div className=' contents d-flex  '>        
                <div className='styledsidebar '>
                    <div className='navlinks  col-11 mx-auto'>

                        <div className='fun-nav col-7 mx-auto'> 
                            <NavLink className="active-link"  onClick={() => setPageInfo("Dashboard" )} to="/"><img  className='navtag'   src={require('./images/Dashboard.svg').default}  alt=''/></NavLink>

                            <NavLink className="active-link" onClick={() => setPageInfo("Table")} to="/Table"><img className='navtag'   src={require('./images/Project-list.svg').default}  alt=''/></NavLink>

                        <hr/>
                            <NavLink className="active-link" onClick={() => setPageInfo("CreateProject")} to="/CreateProject"><img className='navtag' src={require('./images/create-project.svg').default}  alt=''/></NavLink>
                        </div>
                        
                        <div className='logout-logo py-5 navs col-7 mx-auto'>
                        <NavLink className="active-link " to="/Login" id="logout" onClick={logOut}  ><img className='navtag ' src={require('./images/Logout.svg').default}  alt=''/></NavLink>
                        </div> 
                    </div>                  
                </div>   
                
                <div className='pages overflow-auto'>                
                    <div className="header-bg">   
                            <div className='mobile-logout'><NavLink className="mobile-menu" to="/Login"  onClick={logOut}  ><img className="small-tag" src={require('./images/Logout.svg').default}  alt=''/></NavLink></div>
                        <div className='logo-div  d-flex align-items-center'> 
                            <h5>{pageInfo}</h5>
                            <img className="logo py-5"  alt=''/> 
                        </div>                                           
                            <p id='page-board'>{pageInfo}</p>
                        <div className='routes overflow-auto'>
                            <Routes>
                                <Route exact path="/" element={<Dashboard/>}/> 
                                <Route exact path="/Dashboard" element={<Dashboard/>}/> 
                                <Route exact path="/Table" element={<Table/>}/> 
                                <Route exact path="/CreateProject" element={<CreateProject/>}/> 
                            </Routes>
                        </div>
                    </div>           
                </div>   

                <div className='menu d-flex'>
                    <div  className='sub-menu col-11 justify-content-between align-items-center'>
                        <NavLink className="mobile-menu" onClick={() => setPageInfo("Dashboard")} to="/"><img className='small-tag '   src={require('./images/Dashboard.svg').default}  alt=''/></NavLink>
                        <NavLink className="mobile-menu" onClick={() => setPageInfo("Table")} to="/Table"><img className='small-tag '   src={require('./images/Project-list.svg').default}  alt=''/></NavLink>                                    
                        <NavLink className="mobile-menu" onClick={() => setPageInfo("CreateProject")} to="/CreateProject"><img className='small-tag ' src={require('./images/create-project.svg').default}  alt=''/></NavLink>
                    </div>
                </div>                        
            </div>
        )
}


export default Contents;
