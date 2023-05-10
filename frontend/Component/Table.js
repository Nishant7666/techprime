import React, { useEffect, useRef, useState } from "react";
import "./Table.css";
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import ReactPaginate from "react-paginate";
 

const Table = () => 
{
  //setting state
  const[data, setData]=useState([]);
  const[countId,setCountId]=useState("");
  const[query,setQuery]=useState('');
  
  const [values,setValues] = useState({id:"",newStatus:""});

  const [limit, setLimit] = useState(5);
  
  const [pageCount, setPageCount] = useState(1);
  const currentPage = useRef();
 
  const [sort,setSort] = useState([]);
  const keys = ["texthere", "department"];

  useEffect(() => {
    currentPage.current = 1;
    getAllUser();
    getPaginatedUsers();
  }, []);

  //fetching all user
  const getAllUser = () => {
    fetch("http://localhost:8000/getAllUser", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "ProjectData");
        setData(data.data);
      });
  };

  //pagination
  function handlePageClick(e) {
    console.log(e);
    currentPage.current = e.selected + 1;
    getPaginatedUsers();
  }
  function changeLimit()
  {
    currentPage.current = 1;
    getPaginatedUsers();
  }


  // page limiter
  function getPaginatedUsers() {
    fetch
    (
      `http://localhost:8000/paginatedUsers?page=${currentPage.current}&limit=${limit}`,
      {
        method:"GET",
      }
    )
    .then((res) => res.json())
    .then((data) => 
    {
      console.log(data,"userData");
      setPageCount(data.pageCount);
      setData(data.result);
    });
  }

  const SearchPg = (e) =>
  {
    // console.log("my data here babe" , data)
    return Object.values(e).filter((item) => 
    item.texthere.toLowerCase().includes(query));
    // keys.some((key) => item[key].toLowerCase().includes(query)
    
 
  };

  function Update(String,countId)
  {
    const newStatus = String;
    const id = countId;
    fetch("http://localhost:8000/UpdateStatus", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        newStatus,
        id,
      }),
    })
    .then((res) => res.json())
      .then((data) => 
        {
          console.log(data, "userRegister");
          if (data.status == "ok") 
          {
            console.log("row Updated",data);
          }
          else
          {
            console.log("User not Found try Again");
          }
        }
      )
        .catch
        ((error) =>
        {
          console.error(error);
          alert("Failed to retrieve data. Please try again later.");
        }
        );
  }

  console.log(query);
  return (
    <div className="auth-wrapper lists">   
    <div className="d-view-list">   
      <form class="input-group" >
        <div class="input-group rounded d-flex ">
          <input type="text" onChange={(e) => setQuery(e.target.value)} class="form-control rounded" placeholder="Search by Projec Name" aria-label="Search" aria-describedby="search-addon" />
        </div>
        <div class="form-outline d-sort-by   flex m-3">
        <input type="text" class="form-control rounded" aria-label="Search" aria-describedby="search-addon" />
        {/* <Dropdown as={ButtonGroup}>
          <Button class="input-group rounded" variant="success">SortBy</Button>
          <Dropdown.Toggle  split variant="success" id="dropdown-split-basic" />
          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">Project Name</Dropdown.Item>
            <Dropdown.Item href="#/action-1">Type</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Reason</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Department</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Priority</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Location</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown> */}
        </div>
      </form>

      <div className="auth-inner table-responsive" style={{ width: "100%" }}>        
      <table class="table">        
    <thead className="list-head" style={{background:"rgba(92, 224, 180, 0.356)"}}>  
    <tr className="d-thead">
      <th id="pro-header" scope="col-4">Project Name</th>
      <th scope="col">Reason</th>
      <th scope="col">Type</th>
      <th scope="col">Division</th>
      <th scope="col">Category</th>
      <th scope="col">Priority</th>
      <th scope="col">Dept.</th>
      <th scope="col">Location</th>
      <th>Status</th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
    {SearchPg(data).map((countId) => 
      {
        
        return (
        <tbody>
        
        <tr className="list-data d-view-list">
          <th key={countId._id} id="pro-name">{countId.texthere} <br/> 
          {countId.startDate} to {countId.endDate}
          </th>
          <th>{countId.reason}</th>
          <th>{countId.type}</th>
          <th>{countId.division}</th>
          <th>{countId.category}</th>
          <th>{countId.priority}</th>
          <th>{countId.department}</th>
          <th>{countId.location}</th>
          <th id="status-color">{countId.currentStatus}</th>
          <th><button type="button"  onClick={(event) => Update("Running",countId._id)} class="btn status btn-primary">Start</button></th>
          <th><button type="button" onClick={(event) => Update("Closed",countId._id)} class="btn status btn-primary">Close</button></th>
          <th><button type="button" onClick={(event) => Update("Cancelled",countId._id)} class="btn status btn-primary">Cancel</button></th>
        </tr>


          
        <div className="card-body m-view-list">
          <div className="card-title d-flex container">
            <div className="m-div"> 
              <h6 id="list-title">{countId.texthere}</h6> 
              <span>{countId.startDate} to {countId.endDate} </span> 
            </div>  
            <span id="status-color"> {countId.currentStatus}</span> 
          </div>
            <div className="card-text"> 

            <span>Reason: {countId.reason}</span> 
              <div className="d-flex">
                <span>Type: {countId.type}</span> 
                | <span>Category: {countId.category}</span> 
              </div> 
              <div className="d-flex">
                <span>Div: {countId.division}</span> 
                | <span>Dept: {countId.division}</span> 
              </div> 
              <span>Location: {countId.location}</span>
              <br></br>
              <span>Priority: {countId.priority}</span>
            </div>
          <div className="d-flex">
            <button href="#" onClick={(event) => Update("Running",countId._id)} className="btn btn-primary">Start</button>
            <button href="#" onClick={(event) => Update("Closed",countId._id)} className="btn btn-primary">Close</button>
            <button href="#" onClick={(event) => Update("Cancelled",countId._id)} className="btn btn-primary">Cancel</button>
          </div>
      </div>
            </tbody>
            );
      
      })
    }


</table>

        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< prev"
          renderOnZeroPageCount={null}
          marginPagesDisplayed={2}
          containerClassName="pagination justify-content-center"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          activeClassName="active"
          forcePage={currentPage.current - 1}
        />
      </div>
    </div>
    </div>
  );
};

export default Table;
 