import React from 'react'
import {useState} from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Form from 'react-bootstrap/Form';

/* 
Create a functional Component for Add The todo in the db 
*/
function Create() {

    const [task, setTask]= useState(""); 
    const [newStatus, setStatus] = useState("");
    const [startDate,setStartDate]  = useState( );
    const [name,setName] = useState("");

  // handleAdd function is used for submit the data in the database with the help of the Add Todo button 
    const handleAdd = () =>{
       axios.post('http://localhost:3001/add',{task:task, status:newStatus, date:startDate, name:name })
       .then(result =>{console.log(result); // it print the result in the console  

        window.location.reload(); }  ) // After submit the data page is reload 

       .catch(err => console.log(err)) // if any error occurs it show the error  in the console 
    }
  return (
    
    <div>
           <h2> Add Todo </h2>
        <div className='container mt-2 border border-danger   bg-light text-dark'> 
        {/* Name */}
        <div> 
        <label className ='mt-5 text-start'> Client Name  </label>
        {/* <input type ="text" placeholder ='Client Name' className='form-control mt-3 me-4 rounded-pill sm'
        onChange={(e)=> setName(e.target.value)} /> */}

         <Form.Control type="text" placeholder="Client Name" onChange={(e)=> setName(e.target.value)} />
        </div>

        {/* Task  */}
        <div> 
          <label className='mt-3 text-end'> Task </label>
          <Form.Control type="text" placeholder="Enter the Task " onChange={(e)=> setTask(e.target.value)} />
        </div>

        {/* Status */}
        {/* <div> 
           <label className='mt-3 text-end'> Status</label>
           <Form.Control type ="text" placeholder ="Enter the Status" onChange ={(e)=> setStatus(e.target.value)}/>
        </div> */}


         {/*DropDown for Status  */}
          <div>
          <label className="mt-3 me-3">Status</label>
         <select select ={newStatus} onChange ={(e) => setStatus(e.target.value)}> 
                      <option value ="Pending"> Pending   </option>
                      <option value ="In-Progress"> In-Progress </option>
                      <option value ="Completed"> Completed  </option>
                    </select>
         </div> 
 
    

        {/* Date */}
        {/* <div> 
          <label className='mt-3 text-end'> Date </label>
          <input type = "datetime-local" placeholder='choose Date' className='form-control mt-3 me-4 rounded-pill sm'
           onChange={(e)=> setStartDate(e.target.value) }/>
        </div> */}

        {/* Date */}
        <div> 
         <label className='mt-3 ms-3 '> Date </label>
        </div> 

        <div  className = 'mt-3 form-control'> 
          <DatePicker 
            showIcon
              selected={startDate}
                 isClearable
                     placeholderText="Select the Date"
                            onChange={(date) => setStartDate(date)}
                />
        </div>
           <button  onClick={handleAdd} className="btn btn-success btn-md m-5">Add Todo</button>
         </div>
    
    
    </div>
  )
}

export default Create