import React from 'react'
import {useState} from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
/* 
Create a functional Component for Add The todo in the db 
*/
function Create() {

    const [task, setTask]= useState(""); 
    const [newStatus, setStatus] = useState("");
    const [date,setDate]  = useState("");
    const [name,setName] = useState("");
  // handleAdd function is used for submit the data in the database with the help of the Add Todo button 
    const handleAdd = () =>{
       axios.post('http://localhost:3001/add',{task:task, status:newStatus, date:date, name:name })
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
        <input type ="text" placeholder ='Client Name' className='form-control mt-3 me-4 rounded-pill sm'
        onChange={(e)=> setName(e.target.value)} />
        </div>

        {/* Task  */}
        <div> 
          <label className='mt-5 text-end'> Task </label>
        <input type="text" placeholder='Enter the Todo' className='form-control mt-3  me-4 rounded-pill sm'  
         onChange={(e)=> setTask(e.target.value)} /> 
        </div>

        {/* Status */}
        <div> 
          <label className='mt-3 text-end'> Status</label>
        <input type="text" placeholder='Enter the Status' className='form-control  mt-3 me-4 rounded-pill sm'   
        onChange={(e)=> setStatus(e.target.value)} /> 
        </div>

        {/* Date */}
        <div> 
          <label className='mt-3 text-end'> Date </label>
          <input type = "datetime-local" placeholder='choose Date' className='form-control mt-3 me-4 rounded-pill sm'
           onChange={(e)=> setDate(e.target.value) }/>
        </div>
           <button  onClick={handleAdd} className="btn btn-success btn-md m-5">Add Todo</button>
         </div>
    
    
    </div>
  )
}

export default Create