import './App.css';
import React, { useEffect, useRef, useState } from 'react'
import io from "socket.io-client"

const socket = io.connect('http://localhost:4000')

function App() {
  const [ state, setState ] = useState({ message: "", name: "" })
	const [ chat, setChat ] = useState([])


	useEffect(
		() => {
		socket.on('message',({name,message}) =>{
      setChat([...chat,{name,message}])
    })})

	const onTextChange = (e) => {
		setState({ ...state, [e.target.name]: e.target.value })
	}
  console.log("zsihan",state);
	const onMessageSubmit = (e) => {
		e.preventDefault()
		const { name, message } = state;
    socket.emit('message',{name,message})
		setState({ message: "", name })
	}
console.log("thechat",chat);


  return (
    <div className="App">
     <form onSubmit={onMessageSubmit}>
				<h1>Messenger</h1>
				<div className="name-field">
					<input name="name" onChange={(e) => onTextChange(e)} value={state.name} label="Name" />
				</div>
				<div>
					<input
						name="message"
						onChange={(e) => onTextChange(e)}
						value={state.message}
						id="outlined-multiline-static"
						variant="outlined"
						label="Message"
					/>
				</div>
				<button type='submit'>Send Message</button>
			</form>
			<div className="render-chat">
				<h1>Chat Log</h1>
        {chat.map((item,index)=>{
          return(
            <>
            <div key={index}>
<h1>{item.name}</h1>
<h1>{item.message}</h1>
            </div>
            </>
          )
        })}
			</div>
    </div>
  );
}

export default App;
