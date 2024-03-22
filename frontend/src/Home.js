import React from 'react';
import {useState,useEffect} from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import Create from './Create';



function Home() {
 // todos, setTodos array is used for store the todos that fetch from the db 
    const [todos, setTodos] = useState([]);
      const [editableId, setEditableId] = useState(null); 
      const [editedTask, setEditedTask] = useState(""); 


    // show all the data from the database in to the Front page 
    useEffect(() => {
      axios.get('http://127.0.0.1:3001/get')
        .then(res => {
          setTodos(res.data);
        })
        .catch(err => console.log(err));
    }, []);

    
    // Delete task from database 
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

   // Function to toggle the editable state for a specific row 
   const toggleEditable = (id) => { 
    const rowData = todos.find((todo) => todo._id === id); 
    if (rowData) { 
        setEditableId(id); 
        setEditedTask(rowData.task); 
  
    } else { 
        setEditableId(null); 
        setEditedTask(""); 
   
    } 
}; 

    // Function to save edited data to the database 
    const saveEditedTask = (id) => { 
      const editedData = { 
          task: editedTask, 
      }; 

      // If the fields are empty 
      if (!editedTask) { 
          alert("All fields must be filled out."); 
          return; 
      } 
      // Updating edited data to the database through updateById API 
      axios.post('http://127.0.0.1:3001/updateTodoList/' + id, editedData) 
      .then(result => { 
          console.log(result); 
          setEditableId(null); 
          setEditedTask(""); 
          window.location.reload(); 
      }) 
      .catch(err => console.log(err)); 
} 

  return (
     <div className='container mt-5' >
      <div className='row'> 
      <div className="col-md-6">
          <Create /> 
          </div>
      <div className="col-md-6"> 
      
                    <h2 className="text-center">Todo List</h2> 
                    <div className="table-responsive"> 
                      <table className="table table-bordered"> 
                            <thead className="table-primary"> 
                                <tr> 
                                    <th>Task</th> 
                                    <th>Actions</th> 
                                </tr> 
                            </thead> 
                           
                               {   
                               
               /* Ternary Operator is used to show the todos in the list  */   

           todos.length === 0 
           ? 
           //  No todo in the list it shows the meassage No Record found 
           <td>  <h2> No Record Found </h2> </td>
           : 
           // Else shows the details of the todos in the table 
           <tbody> 
            {
              todos.map(todo =>(
                
                <tr key = {todo._id}> 
                
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
             
               <td> 
                                                {editableId === todo._id ? ( 
                                                    <button className="btn btn-success btn-sm me-3" onClick={() => saveEditedTask(todo._id)}> 
                                                        Save 
                                                    </button> 
                                                ) : ( 
                                                    <button className="btn btn-primary btn-sm me-3" onClick={() => toggleEditable(todo._id)}> 
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
