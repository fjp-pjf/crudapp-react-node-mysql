import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';


function App() {

  const [userList, setUserList] = useState({
      id: "",
      firstname:  "",
      lastname: "",
      email:  ""
  });
  const [tabledata, setTableData] = useState([]);


  useEffect(() => {
    const getAllData = async() => {
      const res =  await axios.get("http://localhost:3001/api/get");
      console.log(res.data.data);
      setTableData(res.data.data);
    }
    getAllData();
  }, []);



  const handleSubmit = async(e) => {
    const res = await axios.post("http://localhost:3001/api/insert", userList);
    e.preventDefault();
  };


  const handleOnChange = (e) => {
    setUserList({ ...userList, [e.target.name]: e.target.value, });
  };


  const handleEdit = async (id) => {
    const res = await axios.get(`http://localhost:3001/api/edit/${id}`);
    setUserList( tabledata.filter((item) => item.id === id )[0]);
  }


  const handleUpdate = async(id) =>{
    const res = await axios.post(`http://localhost:3001/api/update/${id}`, userList);
    setUserList({firstname:'', lastname:'', email:''});
  };


  const handleDelete =async(id)=>{
    const res = await axios.delete(`http://localhost:3001/api/delete/${id}`);
  }

  return (
    <>
      <div className="form">
        { userList.id ? <h2>{userList.firstname} Update Here..!! </h2> : null }
        <input
          type="text"
          name="firstname"
          placeholder="FirstName"
          onChange={handleOnChange}
          value={userList.firstname}
          required
        />{" "}

        <br />

        <input
          type="text"
          name="lastname"
          placeholder="LastName"
          onChange={handleOnChange}
          value={userList.lastname}
          required
        />{" "}

        <br />
        
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={userList.email}
          onChange={handleOnChange}
          required
        />{" "}

        <br />
        
        <div>

        { userList.id ? 
          <button className="addUserButton" onClick={() => handleUpdate(userList.id)}>
            Update Here..!!
          </button>:  
          <button  className="addUserButton" onClick={handleSubmit}>SAVE Here..!</button>
        }

        </div>

        { tabledata.map((item, index) => {
          return (
            <>
              <div key={ index } className="card">
                <h2>{item.firstname}</h2>
                <h4>{item.lastname}</h4>
                <p>{item.email}</p>
                  <div className="updatebtn">

                    <div>
                      <button className="addUserButton" onClick={() => handleEdit(item.id)}>
                        edit
                      </button>
                    </div>

                    <br />

                    <div>
                      <button className="addUserButton" onClick={()=>handleDelete(item.id)}>
                        Delete
                      </button>
                    </div>

                  </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default App;
