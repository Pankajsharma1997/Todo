import React from 'react';
import {useState,useEffect} from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Create from './Create';




function Home() {
 // todos, setTodos array is used for store the todos that fetch from the db 
    const [todos, setTodos] = useState([]);
      const [editableId, setEditableId] = useState(null); 
      const [editedName, setEditedName] = useState(" ");
      const [editedTask, setEditedTask] = useState(""); 
      const [editedStatus, setEditedStatus] = useState("");
      const [editedDate, setEditedDate]   = useState(new Date());


    // Show all the data from the database in to the Front page 
    useEffect(() => {
      axios.get('http://127.0.0.1:3001/get')
        .then(res => {
          setTodos(res.data);
        })
        .catch(err => console.log(err));
    }, []);


  /* Note: toffleEditable()  function is used to change the state of the specific row which you want to edit 
             */

   // Function to toggle the editable state for a specific row 
   const toggleEditable = (id) => { 
    const rowData = todos.find((todo) => todo._id === id); 
    if (rowData) { 
        setEditableId(id); 
        setEditedName(rowData.name);
         setEditedTask(rowData.task);
        setEditedStatus(rowData.status);
        setEditedDate(rowData.date || "");

  
    } else { 
        setEditableId(null); 
        setEditedName("");
        setEditedTask(""); 
        setEditedStatus("");
        setEditedDate("");  
   
    } 
}; 


// Function to save edited data to the database 
const saveEditedTask = (id) => { 
   const editedData = { 
         name : editedName,
         task: editedTask, 
         status: editedStatus,
         date: editedDate,
   }; 

   // If the fields are empty 
   if (!editedName || !editedTask || !editedStatus || !editedDate) { 
       alert("All fields must be filled out."); 
       return; 
   } 
      // Updating edited data to the database through updateById API 
      axios.post('http://127.0.0.1:3001/updateTodoList/' + id, editedData) 
      .then(result => { 
          console.log(result); 
          setEditableId(null); 
          setEditedName("");
          setEditedTask(""); 
          setEditedStatus("");
          setEditedDate(" ");
          window.location.reload(); 
      }) 
      .catch(err => console.log(err)); 
    } 

    
    
    // Delete Task from database 
    const deleteTask = (id) => { 
        axios.delete('http://127.0.0.1:3001/deleteTodoList/' + id) 
            .then(result => { 
                console.log(result); 
                window.location.reload(); 
            }) 
            .catch(err => 
                console.log(err) 
            ) 
    }

  return (
     <div className='container mt-5' >
      <div className='row'>
      <div className="col-md-4">
          <Create /> 
          </div>
      <div className="col-md-8"> 
      
                    <h2 className="text-center"> Matrix Infologics Todo List</h2> 
                    <div className="table-responsive"> 
                      <table className="table table-bordered"> 
                            <thead className="table-primary"> 
                                <tr> 
                                    <th> Client Name </th>
                                    <th>Task</th> 
                                    <th> Status </th>
                                    <th> Date</th>
                                    <th>Actions</th> 
                                </tr> 
                            </thead> 
                           
                               {   
                               
               /* Ternary Operator is used to show the todos in the list  */   

           todos.length === 0 
           ? 
           // If  No todo in the list it shows the meassage No Record found 
           <td>  <h2> No Record Found </h2> </td>
           : 
           // Else shows the details of the todos in the table 
           <tbody> 
            {
              todos.map(todo =>(
                
                <tr key = {todo._id}> 
                {/* Edit the Todo cliet Name  */}
                <td> 
                    {editableId === todo._id ? (<input type ="text" className ="form-control" value={editedName} 
                    onChange={(e) =>setEditedName(e.target.value)}/>)
                     : ( 
                        todo.name
                        )}
                </td>

                 {/* Edit the Todo task */}
                <td>
                {editableId === todo._id ? ( 
                                                    <input 
                                                        type="text"
                                                        className="form-control"
                                                        value={editedTask} 
                                                        onChange={(e) => setEditedTask(e.target.value)} 
                                                    /> 
                                                ) : ( 
                                                    todo.task 
                                                )}
                  </td>
                
                 {/*  Edit the Todo Status  */}
                  {/* <td> 
                    {editableId === todo._id ? ( 
                                            <input type= "text" className="form-control"
                                             value={editedStatus}  onChange={(e) => setEditedStatus(e.target.value)}/> )
                                            : (todo.status)

                      }
                  </td> */}

                 {/*  Edit the Todo Status  */}
                 <td> 
                 
                    {editableId === todo._id ? 
                    ( <select value ={editedStatus} onChange ={(e) => setEditedStatus(e.target.value)}> 
                      <option value ="Pending"> Pending   </option>
                      <option value ="In-Progress"> In-Progress </option>
                      <option value ="Completed"> Completed  </option>

                    </select> ):(todo.status)
                }
                 </td>


                  {/*  Edit the Date and Time */}
                  {/* <td>  
                    {editableId === todo._id ? (
                                            <input type = "datetime-local"
                                             className="form-control" 
                                             value={editedDate} onChange ={(e) => setEditedDate(e.target.value)}/> 
                                             ) : (todo.date
                                             ? new Date(todo.date).toLocaleString() : ''

                    )}
                  </td> */}

                  { /* Edit  the Date */}
                  { editableId === todo._id ? (
                     <DatePicker 
                         showIcon
                         selected ={editedDate} 
                         isClearable
                         placeholderText='Select the new date'
                         dateFormat="MMMM d, yyyy"
                         onChange={(date) => setEditedDate(date)}
                  /> ) 
                  :(todo.date? new Date(todo.date).toDateString():'')}
             


               <td> 
                                                {editableId === todo._id ? ( 
                                                    <button className="btn btn-success btn-sm me-2 " onClick={() => saveEditedTask(todo._id)}> 
                                                        Save 
                                                    </button> 
                                                ) : ( 
                                                    <button className="btn btn-primary btn-sm me-1" onClick={() => toggleEditable(todo._id)}> 
                                                        Edit 
                                                    </button> 
                                                )} 
                                                <button className="btn btn-danger btn-sm ml-1" onClick={() => deleteTask(todo._id)}> 
                                                    Delete 
                                                </button> 
                                            </td> 
             </tr>
              ))
            }
              </tbody>
            }    
             </table> 
        </div>
        </div>
        </div> 
        </div>
    
  )
}

export default Home