import React, {useState} from 'react'
import Login from "../../components/Auth/login"
import Register from "../../components/Auth/register"

const Index = () => {
    const [login, setLogin] = useState(true)
  return (
    <div>
        {
            login ?
            <Login signup={() => setLogin(!login)}/>
            :
            <Register login={() => setLogin(!login)}/>
        }
      
    </div>
  )
}

export default Index
