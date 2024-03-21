import React from 'react'
import {useState} from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
/* 
Create a functional Component for Add The todo in the db 
*/
function Create() {

    const [task, setTask]= useState(); 
  // handleAdd function is used for submit the data in the database with the help of the Add Todo button 
    const handleAdd = () =>{
       axios.post('http://localhost:3001/add',{task:task})
       .then(result =>{console.log(result); // it print the result in the console  

        window.location.reload(); }  ) // After submit the data page is refresh 

       .catch(err => console.log(err)) // if any error occurs it shows the error  in the console 
    }
  return (
    
    <div>
           <h2> Add Todo </h2>
        <div className='container mt-2 border border-danger rounded-pill'> 
           <input type="text" placeholder='Enter the Todo' className='form-control mt-5  me-4 rounded-pill sm'   onChange={(e)=> setTask(e.target.value)} /> 
           <button  onClick={handleAdd} className="btn btn-success btn-md m-5">Add Todo</button>
         </div>
    
    
    </div>
  )
}

export default Create