import React, {useState, useEffect} from 'react'
import './App.css'
import Axios from "axios";
import Card from "./components/card";

function App() {

    const baseUrl = "http://localhost:8080/api"

    const [values, setValues] = useState();
    const [games, setGames] = useState();

    const handleChangeValues = (value) => {
        setValues((prevValue) => ({
            ...prevValue,
            [value.target.name]: value.target.value,
        }))
    }

    const handleClickButton = () => {
        Axios.post(`${baseUrl}/user`, {
            name: values.name,
            email: values.email,
        }).then((response) =>{
            console.log(response)
        });
    }

    useEffect(() => {
        Axios.get(`${baseUrl}/user`)
            .then((response)=>{
            setGames(response.data)
        })
        }
    )


  return (
    <div className="App">
      <div className="container">
          <h1 className="title">User</h1>
          <h3>Add a User</h3>
          <div className="register-box">
              <input className="register-input" type="text" name="name" placeholder="Title" onChange={handleChangeValues} />
              <input className="register-input" type="text" name="email" placeholder="Email" onChange={handleChangeValues} />
              {/* <input className="register-input" type="text" name="category" placeholder="Category" onChange={handleChangeValues} /> */}
              <button className="register-button" onClick={handleClickButton}>Add</button>
          </div>
          <br/>
          <div className="cards">
              {typeof games !== 'undefined' &&
                  games.map((user) => {
                      return <Card
                          key={user.id}
                          id={user.id}
                          name={user.name}
                          email={user.email}
                        
                      >
                      </Card>;
                  })}
          </div>
      </div>
    </div>
  )
}

export default App
