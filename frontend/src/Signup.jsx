import React, { useEffect, useRef, useState } from 'react'

function Signup({username,setusername}) {
    const naamvalue = useRef()



  return (
    <div className='Signup w-screen h-screen colorbg relative flex items-center justify-center'>
      <div id="maintext" className='text-[20vw] text-white absolute z-50 top-[50%] translate-y-[-60%] mix-blend-difference'>VeilVoice</div>
     <div id="container" className='w-[40%] overflow-y-scroll h-[70%]  relative p-10  rounded-xl flex flex-col items-center justify-center bg-blue-300'>
        <div className='w-[80%] px-3 h-[6%]  text-white relative z-[100] flex items-end rounded-xl text-xl my-1'>Username :</div>
        <input ref={naamvalue}  placeholder='Enter Your Username' className=' relative z-[100] w-[80%] h-[6%] py-2 px-5 bg-white rounded-xl' type="text"  />
        <button onClick={()=>{setusername(naamvalue.current.value)}} className='relative z-[100] w-[80%] h-[6%] min-h-[40px] py-2 px-5 rounded-xl my-[20px] bg-green-500 text-white'>Submit</button>
     </div>
    </div>
  )
}

export default Signup