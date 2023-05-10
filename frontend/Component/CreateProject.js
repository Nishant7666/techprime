import React ,{ useEffect} from 'react';
import "./CreateProject.css"
import { useState } from 'react';
import axios from 'axios';

export default class CreateProject extends React.Component {
        
      constructor(props){
        super(props);
        this.state = 
        {
          texthere:"",
          reason:"",
          type:"",
          division:"",
          category:"",
          priority:"",
          department:"",
          startDate:"",
          endDate:"",
          location:"",
          currentStatus:" ",
          message:"sadf",
          divError:"",
          typeError:"",
          textError:"",
          resonError:"",
          categoryError:"",
          deptError:"",
          stDtError:"",
          endDtError:"",
          prioError:"",          
          locError:"",
        };
        this.saveProject = this.saveProject.bind(this);
    }
    
      saveProject(event) 
      {
      event.preventDefault();
      const
      {
        texthere,
        reason,
        type,
        division,
        category,
        priority,
        department,
        startDate,
        endDate,
        currentStatus,
        location,
      } = this.state;

      if(texthere.trim() === '')
      {
        this.setState({textError:" texthere is required"});
      }
      else
      {
        this.setState({textError:""})
      }
      if (reason.trim() === '')
      {
        this.setState({resonError:"reason must be specified"});
      }
      else
      {
        this.setState({resonError:""})
      }
      if (type.trim() === '')
      {
        this.setState({typeError:"type must not be empty"})
      }
      else
      {
        this.setState({typeError:""})
      }
      if (division.trim() === '')
      {
        this.setState({divError:"division must not be empty"})
      }
      else
      {
        this.setState({divError:""})
      }
      if (category.trim() === '')
      {
        this.setState({categoryError:"category must not be empty"})
      }
      else
      {
        this.setState({categoryError:""})
      }
      if (priority.trim() === '')
      {
        this.setState({prioError:"priority must not be empty"})
      }
      else
      {
        this.setState({prioError:""})
      }
      if (department.trim() === '')
      {
        this.setState({deptError:"department must not be empty"})
      } 
      else
      {
        this.setState({deptError:""})
      }
      if (startDate.trim() === '')
      {
        this.setState({stDtError:"startDate must not be empty"})
      }
      else
      {
        this.setState({stDtError:""})
      }
      if (endDate.trim() === '')
      {
        this.setState({endDtError:"endDate must not be empty"})
      }
      else
      {
        this.setState({endDtError:""})
      }
      if (location.trim() === '')
      {
        this.setState({locError:"location must not be empty"})
      }
      else
      {
        this.setState({locError:""})
      }
      
        fetch
        ("http://localhost:8000/CreateProject",
        {
          method:"POST",crossDomain:true,headers:
          {
            "content-Type":"application/json",
              Accept:"application/json",
            "Access-Control-Allow-Origin":"*",
          },
          body:JSON.stringify
          (
            {
            texthere,
            reason,
            type,
            division,
            category,
            priority,
            department,
            startDate,
            endDate,
            currentStatus,
            location
            }
          ),
        })
        .then((res) => res.json())
        .then((data) => {
          console.log(data,"projectRegistered");
          this.setState({message : " project Registered"})
          window.location.href = "/Table";
        });
      
    }

render () {

  return (
    <form onSubmit={this.saveProject} className='project-form'>      
      <div className="text-area">
        <div className="form text-here">
          <textarea name='texthere'  type='text'  onChange={(e) => this.setState({texthere: e.target.value })} className="form-control text-area" id="exampleFormControlTextarea1" rows={3} placeholder="Entet Project Theme" />
          <div id='error'>{this.state.textError}</div>
        </div>
        <button type="submit" className="save-project btn-primary">Save Project</button>
      </div>
      <div className="main-row col-md-10 py-5">
        <div className="row grid-template-rows">  
          <div className="form col-md-4 ">
            <label htmlfor="inputState">Reason</label>
            <input name='reason'    type='text'  onChange={(e) => this.setState({reason: e.target.value })}   id="inputState" className="form-control" placeholder='For Bussiness' />
            <div id='error'>{this.state.resonError}</div>
          </div> 
          <div className="form col-md-4">
            <label htmlfor="inputState">Type</label>
            <input name='type'  type='text' onChange={(e) => this.setState({type: e.target.value })} id="inputState" className="form-control" placeholder='Internal' />             
            <div id='error'>{this.state.typeError}</div>
            
          </div> 
          <div className="form col-md-4">
            <label htmlfor="inputState">Division</label>
            <input  name='division'   type='division'  onChange={(e) => this.setState({division: e.target.value })} id="inputState" className="form-control" placeholder='Filters' />
              <div id='error'>{this.state.divError}</div>
              
          </div> 
        </div>   
        <div className="row  grid-template-rows">  
          <div className="form col-md-4">
            <label htmlfor="inputState">Category</label>
            <input name='category'   onChange={(e) => this.setState({category: e.target.value })} id="inputState" className="form-control" placeholder='Quality A' />             
            <div id='error'>{this.state.categoryError}</div>
          </div> 
          <div className="form col-md-4">
            <label htmlfor="inputState">Priority</label>
            <input name='priority'   onChange={(e) => this.setState({priority: e.target.value })} id="inputState" className="form-control" placeholder='High'/>             
            <div id='error'>{this.state.prioError}</div>
          </div> 
          <div className="form col-md-4">
            <label htmlfor="inputState">Department</label>
            <input name='department' onChange={(e) => this.setState({department: e.target.value})}   id="inputState" className="form-control" placeholder='Strategy' />               
             <div id='error'>{this.state.deptError}</div>
          </div> 
        </div>   
        <div className="row  grid-template-rows">  
          <div className="form col-md-4">
            <label htmlfor="inputState">Start Date as per Project Plan</label>            
            <input type="date" name='startDate'   onChange={(e) => this.setState({startDate: e.target.value })} id="inputState" className="form-control" placeholder='D Month Yr'/>
            <div id='error'>{this.state.stDtError}</div>
          </div> 
          <div className="form col-md-4">
            <label htmlfor="inputState">Start Date as per Project Plan</label>
            <input  name='endDate' type='date'  onChange={(e) => this.setState({endDate: e.target.value })}  id="inputState" className="form-control" placeholder='D Month Yr'/>
              <div id='error'>{this.state.endDtError}</div>
          </div> 
          <div className="form col-md-4">
            <label htmlfor="inputState">Location</label>
            <input name='location'   type='text'  onChange={(e) => this.setState({location: e.target.value })}  id="inputState" className="form-control" placeholder='Pune'/>
             <div id='error'>{this.state.locError}</div>
          </div> 
        </div>  
          
        <div className='mobile-submit '>
        <button id='mobile-save' type="submit" className="  btn-primary">Save Project</button>
        </div>
        

        <div className='status-div '>
          <div className='d-flex status-attribute'><h4>Status:</h4><p class="fst-italic">Registered</p></div>
        </div>
      </div> 

      <div>
        <h4></h4>
      </div>

  </form>
  )

  }
  }
