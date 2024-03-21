import React from 'react';
import {useState,useEffect} from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import Create from './Create';



function Home() {

    const [todos, setTodos] = useState([]); // todos, setTodos array is used for store the todos that fetch from the db 


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
                <td>{todo.task}  </td>
                <td><button className="btn btn-danger btn-sm ml-1" onClick={() => deleteTask(todo._id)}> 
                                                    Delete 
                                                </button>   </td>
              
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
