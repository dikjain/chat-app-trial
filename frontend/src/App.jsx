import { useEffect, useMemo, useState } from 'react';
import {io} from 'socket.io-client'

function App({username}) {
  const [msgs,setmsgs] = useState([])
  const socket  = useMemo(()=>io("https://chat-app-trial.onrender.com/"),[]);
  const [text,settext] = useState("")
  const[onlineuser,setonlineuser] = useState([])
  const [id ,setid] = useState("")
  socket.on('senddet', (data) => {
    setid(data)
  });

  // sending a message
  const handlesubmit = (e)=>{
    e.preventDefault();
    if (text.length >0 && text != "" && text !=" ") {
      socket.emit('message', {name: username ,message : text,id :id ,type: 'message'});
      settext("");
      setmsgs((prevMsgs) => [...prevMsgs, {name: username ,message : text , id :id ,type: 'message'}]);
    }
  }
  

  //effects because of sockets
  useEffect(()=>{
    socket.on('recived-message', (msg) => {
      setmsgs((prevMsgs) => [...prevMsgs, msg]); 
    });
    socket.emit('join',{name: username ,message : "Joined",id:id,type:"notification"})
    
    socket.on('curr-user', (msg) => {
      setonlineuser(msg);
    });



    return () => socket.disconnect();
    

  },[])
  

  return (
    <div id="main" className='w-screen h-screen bg-[rgba(0,0,0,0.8)] relative flex items-center justify-center'>
        <div id="msgfield" className='absolute bottom-[5%] z-30 w-[40%] h-[7%] my-4 flex items-center justify-evenly'>
          <input type="text" value={text} onChange={(e)=>settext(e.target.value) & e.preventDefault()} id="msg" className='w-[80%] h-[80%] px-3 rounded-xl border-0 outline-none' placeholder='Enter your message...'/>
          <button onClick={handlesubmit} className='btn w-[10%] h-[80%] rounded-xl bg-green-500 text-white text-xl'>Send</button>
        </div>
       <div id="onlineuser" className='w-[15%] h-fit bg-blue-400 p-3 text-[2.5vw] absolute left-[10%] top-[15%] rounded-xl'>
         <h2 className='onu text-white  w-full h-fit bg-green-500 rounded-xl p-1'>Online Users</h2>
         {onlineuser.map((q,i)=>(<div key={i} className='py-2 px-3 w-full text-white '>{q.id == id ? `you ( ${q.name} )` : `${q.name}`}</div>))}

        </div> 
      <div id="container" className='w-[40%] overflow-y-scroll h-[70%]   py-5  rounded-xl flex flex-col items-center justify-start  bg-blue-300'>
        {msgs.map((q,i)=>q.type == "message" ? (<div id="messagebox" key={i} className={`{min-w-[20%] w-fit my-4 min-h-fit h-fit break-words mx-[10px] px-[10px] py-[5px] ${q.id == id ? "bg-green-500 self-start" : "bg-blue-500 self-end"} rounded-xl text-center max-w-[50%] text-white}`}><span className='font-extrabold my-4 font-mono text-white'>{q.name} :</span> {q.message}</div>) : (<div id="messagebox" key={i} className={`{min-w-[20%] min-h-[6%] bg-gray-300  mx-[10px] px-[10px] py-[5px] rounded-xl my-3 text-center max-w-[50%] text-white}`}>{q.name == username ? "you" : q.name} {q.message} The Chat</div>))}
      </div>
    </div>
  )
}

export default App
