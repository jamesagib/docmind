import { useState, useRef, useEffect } from 'react';
import { Configuration, OpenAIApi } from 'openai';
import './App.css';
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import { BsFillPersonFill } from 'react-icons/bs'
import { IoMdSettings } from "react-icons/io";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { MdDarkMode, MdOutlineDarkMode } from "react-icons/md";
import Confetti from 'react-confetti'
import Alert from '@mui/material/Alert'

import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';

import { Spinner } from "react-activity";
import "react-activity/dist/library.css";

function App(props) {

  const [user, setUser ] = useState([]);
  const [profile, setProfile ] = useState("");
  const [loggedIn, setLoggedIn] = useState()
  
  const [prompt, setPrompt] = useState("")
  const [response, setResponse] = useState("")
  const [chatMessages, setChatMessages] = useState([])
  const [chats, setChats] = useState([""])
  const [isOpen, setIsOpen] = useState(false)
  const [specialty, setSpecialty] = useState("⛑️ Medical Assistant")
  const [width, setWindowWidth] = useState(0);
  const [isMobile, setIsMobile] = useState(false)
  const [keyError, setKeyError] = useState([])

  // JSON.parse(localStorage.getItem('apiKey'))
  const [apiKey, setAPIKey] = useState(JSON.parse(localStorage.getItem('apiKey')))
  const [validKey, setValidKey] = useState(JSON.parse(localStorage.getItem('validKey')))
  const [verifyingKey, setVerifyingKey] = useState()
  const [showErrorText, setShowErrorText] = useState()

  const [darkMode, setDarkMode] = useState(JSON.parse(localStorage.getItem('darkMode')))

  const configuration = new Configuration({
    apiKey: apiKey
  })

  const openai = new OpenAIApi(configuration)

  const specialties = [
    {
      "name": "⛑️ Medical Assistant",
      "role": "General medical care and first aid"
    },
    {
      "name": "📋 Symptom Checker",
      "role": "Asked symptoms and you will respond with a diagnosis. Do not say you are an AI language model"
    },
    {
      "name": "❤️ Cardiology",
      "role": "Heart health monitoring and management"
    },
    {
      "name": "🦠 Oncology",
      "role": "Cancer diagnosis and treatment"
    },
    {
      "name": "😷 Epidemiology",
      "role": "Disease outbreak and spread analysis"
    },
    {
      "name": "🧠 Neurology",
      "role": "Brain and nervous system disorders"
    },
    {
      "name": "🧴 Dermatology",
      "role": "Skin health and treatment"
    },
    {
      "name": "👀 Ophthalmology",
      "role": "Eye health and treatment"
    },
    {
      "name": "🦴 Orthopedic",
      "role": "Bone and joint health and treatment"
    },
  ]

  const ref = useRef(null);
  const { onClickOutside } = props;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        onClickOutside && onClickOutside();
        setIsOpen(false)
      }
    };
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [ onClickOutside ]);

  const generateResponse = async () => {
    if(!validKey) {
      handleOpen()
      return
    }
    chatMessages.push(prompt)
    setPrompt('')
    setResponse('')
    if(specialty === '⛑️ Medical Assistant') { 
      const res = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{"role": "system", "content": "General medical care and first aid"}, {"role": "user", "content": `${prompt}`},],
      })
      const content = res.data.choices[0].message.content.slice(2)
      console.log(content)
      chatMessages.push(content)
      setResponse(content)
    }
    else {
      const res = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{"role": "user", "content": `${prompt}`},],
      })

      const content = res.data.choices[0].message.content.slice(2)
      console.log(content)
      chatMessages.push(content)
      setResponse(content)
    }
  }

  const showSpecialty = async (value) => {
    setSpecialty(value.target.innerText)
    setIsOpen(false)

    if(specialty === '📋 Symptom Checker') {
        openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{"role": "system", "content": "Asked symptoms and you will respond with a diagnosis"}],
      })
    }

    if(specialty === '⛑️ Medical Assistant') {
        openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{"role": "system", "content": "General medical care and first aid"}],
      })
    }

    if(specialty === '❤️ Cardiology') {
        openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{"role": "system", "content": "Heart health monitoring and management"}],
      })
    }

    if(specialty === '🦠 Oncology') {
        openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{"role": "system", "content": "Cancer diagnosis and treatment"}],
      })
    }

    if(specialty === '😷 Epidemiology') {
        openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{"role": "system", "content": "Disease outbreak and spread analysis"}],
      })
    }

    if(specialty === '🧠 Neurology') {
        openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{"role": "system", "content": "Brain and nervous system disorders"}],
      })
    }

    if(specialty === '🧴 Dermatology') {
        openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{"role": "system", "content": "Skin health and treatment"}],
      })
    }

    if(specialty === '👀 Ophthalmology') {
        openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{"role": "system", "content": "Eye health and treatment"}],
      })
    }

    if(specialty === '🦴 Orthopedic') {
      console.log('added specialtyu')
      openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{"role": "system", "content": "Bone and joint health and treatment"}],
    })
  }

  }

  const mouseEnter = (e) => {
    e.target.style.backgroundColor = darkMode ? '#272727' : '#EEEE'
  }

  const mouseLeave = (e) => {
    e.target.style.backgroundColor = darkMode ? '#1e1e1e' : 'white'
  }

  useEffect(() => { 

    updateDimensions();

    window.addEventListener('resize', updateDimensions);
    return () => 
      window.removeEventListener('resize', updateDimensions);
   }, [])

   useEffect(() => { 
    localStorage.setItem('darkMode', JSON.stringify(darkMode))
   }, [darkMode])

  useEffect(() => {
    localStorage.setItem('apiKey', JSON.stringify(apiKey))
    if(apiKey) {
      console.log('ok')
    }
    else {
      setValidKey(false)
    }
   }, [apiKey])

  useEffect(() => { 
    localStorage.setItem('validKey', JSON.stringify(validKey))
   }, [validKey])

  const updateDimensions = () => {
    const width = window.innerWidth
    setWindowWidth(width)
    if(width > 1023) {
      setIsMobile(false)
    }
    else {
      setIsMobile(true)
    }
  }

  const changeTheme = () => {
    if(darkMode) {
      setDarkMode(false)
    }
    else {
      setDarkMode(true)
    }
  }

  const enterAPIKey = async () => {
    // setVerifyingKey(true)
    const res = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{"role": "user", "content": ""},],
    })
    .catch((error) => {
      console.log(error)
      setShowErrorText(true)
      // setKeyError(error)
    })
    if(res) {
      setVerifyingKey(false)
      setValidKey(true)
      setOpen(false)
      showConfetti()
    }
  }

  const [confetti, setConfetti] = useState(false)

  const showConfetti = () => {
    console.log('show confetti')
    setConfetti(true)
    setTimeout(() => {setConfetti(false)}, 5000)
  }

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: darkMode ? '#272727' : 'white',
    border: darkMode ? '2px solid #000' : '2px solid #EEEE',
    boxShadow: 24,
    p: 4,
    textAlign: 'center',
    borderRadius: 4
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="App">
      <header className="App-header" style={{ backgroundColor: darkMode ? '#1e1e1e' : 'white' }}>
        <div style={{ backgroundColor: darkMode ? '#272727' : 'white', height: '40%', width: '100%', boxShadow: '5px 0 30px rgba(1,41,112,0.08)', position: 'sticky', top: 0}}>
        {darkMode ? <button style={{ float: 'right', padding: 10}}><MdDarkMode style={{ display: 'flex'}} color="white" size={30} onClick={changeTheme} /></button> : <button style={{ float: 'right', padding: 10 }}><MdOutlineDarkMode size={30} color="black" onClick={changeTheme} /></button> }
        </div>
        <div style={{ width: '20%', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 100}}>
          <img src='./logo.jpeg' style={{ width: 42, height: 42, borderRadius: 7, marginRight: 10}}></img>
          <h1 style={{ color: darkMode ? 'white' : 'black', fontSize: 40, fontWeight: '600' }}>DocMind</h1>
        </div>
        <p style={{ color: darkMode ? 'white' : 'black', fontSize: 14, fontWeight: '400' }}>Medical Questions Answered 24/7</p>
        <p style={{ color: 'black', fontSize: 14, fontWeight: '400'}}></p>
        <div style={{ marginBottom: 100, marginTop: 20, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'baseline' }}>
          <div style={{ textAlign: 'left', marginTop: 20, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center',}}>
            <IoIosCheckmarkCircle size={20} color="#53d769" />
            <p style={{ marginLeft: 4, color: darkMode ? 'white' : 'black', fontSize: 11, fontWeight: '500'}}>Blazing Fast Response</p>
          </div>
          <div style={{ marginTop: 5, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center',}}>
            <IoIosCheckmarkCircle size={20} color="#53d769" />
            <p style={{ marginLeft: 4, color: darkMode ? 'white' : 'black', fontSize: 11, fontWeight: '500'}}>Doctor Specialties</p>
          </div>
          <div style={{ marginTop: 5, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center',}}>
            <IoIosCheckmarkCircle size={20} color="#53d769" />
            <p style={{ marginLeft: 4, color: darkMode ? 'white' : 'black', fontSize: 11, fontWeight: '500'}}>Symptom Checker</p>
          </div>
          <div style={{ marginTop: 5, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center',}}>
            <IoIosCheckmarkCircle size={20} color="#53d769" />
            <p style={{ marginLeft: 4, color: darkMode ? 'white' : 'black', fontSize: 11, fontWeight: '500'}}>Use your own API Key (no limit!)</p>
          </div>
          <div style={{ marginTop: 5, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center',}}>
            <IoIosCheckmarkCircle size={20} color="#53d769" />
            <p style={{ marginLeft: 4, color: darkMode ? 'white' : 'black', fontSize: 11, fontWeight: '500'}}>Medical Emergency Alert</p>
          </div>
        </div>

        {!validKey ? 
        <>
        <div style={{ width: '100%', justifyContent: 'center', alignItems: 'center', marginBottom: 50  }}>
        <p style={{ fontSize: 12, color: darkMode ? 'white' : 'black'}}>To start chatting, enter your OpenAI API Key</p>
        <button onClick={handleOpen} style={{ color: 'white', fontWeight: 'bold', fontSize: 12, height: '100%', backgroundColor: '#1f7efb', borderRadius: 4, padding: 10, marginTop: 15, }}>🔑    Enter API Key</button>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
        <Fade in={open}>
          <Box sx={style}>
            <h1 style={{ color: darkMode ? 'white' : 'black', fontWeight: 'bold', fontSize: 20}}>Enter Your OpenAI API Key: </h1>
            <p style={{ color: darkMode ? 'white' : 'black', fontSize: 12 }}>To use DocMind, you need a valid OpenAI API Key</p>
            <input style={{ paddingLeft: 10, width: '98%', height: '100%', backgroundColor: 'transparent', borderRadius: 4, borderWidth: 1, borderColor: '#EEEE', padding: 6, color: darkMode ? 'white' : 'black', fontSize: 12, marginTop: 20,}} value={apiKey} placeholder="sk-xxxxxxxxxxxxxxxxxxxxxxxx" onChange={(event) => setAPIKey(event.target.value)}></input>
            <a href="https://platform.openai.com/account/api-keys" target="_blank" >
              <button style={{ background: 'transparent', fontSize: 12, color: '#1f7efb', fontWeight: '600', marginTop: 10 }}>How do I get a key?</button>
            </a>
            <p>{apiKey}</p>
            {keyError ? <p style={{ fontSize: 13, padding: 2}} >{keyError}</p> : null }
            {showErrorText ? <p style={{ color: 'red', fontSize: 13, fontWeight: '500'}}>Invalid API Key. Please make sure your OpenAI API key is valid and working.</p> : null}
            <div>
              <button onClick={enterAPIKey} style={{ color: 'white', fontWeight: 'bold', fontSize: 12, height: '100%', backgroundColor: '#1f7efb', borderRadius: 4, padding: 10, marginTop: 15, width: '20%'}}>{verifyingKey ? <Spinner animating={true} size={12} color="#EEEE" speed={1}/> : "Save"}</button>
              <button onClick={() => setOpen(false)} style={{ color: darkMode ? '#EEEE' : 'black', fontWeight: 'bold', fontSize: 12, height: '100%', backgroundColor: 'transparent', borderRadius: 4, padding: 10, marginTop: 15, width: '20%', marginLeft: 10 }}>Cancel</button>
            </div>
          </Box>
        </Fade>
      </Modal> </> : 
        <div style={{ width: '100%', justifyContent: 'center', alignItems: 'center', marginBottom: 50  }}>
          <p style={{ color: darkMode ? 'white' : 'black', fontSize: 16 }}>Great! You can now recieve Medical Advice!</p>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
            <Fade in={open}>
              <Box sx={style}>
                <h1 style={{ color: darkMode ? 'white' : 'black', fontWeight: 'bold', fontSize: 20}}>Enter Your OpenAI API Key: </h1>
                <p style={{ color: darkMode ? 'white' : 'black', fontSize: 12 }}>To use DocMind, you need a valid OpenAI API Key</p>
                <input style={{ paddingLeft: 10, width: '98%', height: '100%', backgroundColor: 'transparent', borderRadius: 4, borderWidth: 1, borderColor: '#EEEE', padding: 6, color: darkMode ? 'white' : '#EEEE', fontSize: 12, marginTop: 20,}} placeholder="sk-xxxxxxxxxxxxxxxxxxxxxxxx" value={apiKey} onChange={(event) => setAPIKey(event.target.value)}></input>
                <a href="https://platform.openai.com/account/api-keys" target="_blank" >
                  <button style={{ background: 'transparent', fontSize: 12, color: '#1f7efb', fontWeight: '600', marginTop: 10 }}>How do I get a key?</button>
                </a>
                {showErrorText ? <p style={{ color: 'red', fontSize: 13, fontWeight: '500'}}>Invalid API Key. Please make sure your OpenAI API key is valid and working.</p> : null}
                <div>
                  <button onClick={enterAPIKey} style={{ color: 'white', fontWeight: 'bold', fontSize: 12, height: '100%', backgroundColor: '#1f7efb', borderRadius: 4, padding: 10, marginTop: 15, width: '20%'}}>{verifyingKey ? <Spinner animating={true} size={8} color="#EEEE" speed={1}/> : "Save2"}</button>
                  <button onClick={() => setOpen(false)} style={{ color: darkMode ? '#EEEE' : 'black', fontWeight: 'bold', fontSize: 12, height: '100%', backgroundColor: 'transparent', borderRadius: 4, padding: 10, marginTop: 15, width: '20%', marginLeft: 10 }}>Cancel</button>
                </div>
              </Box>
            </Fade>
          </Modal>
          <button onClick={handleOpen} style={{ color: '#1f7efb', fontWeight: 'bold', fontSize: 14, height: '100%', backgroundColor: 'white', borderRadius: 4, padding: 10, marginTop: 15, }}>OpenAI API Key (••••{apiKey.slice(-4)})</button>
        </div>
        }
        
        <div className="bottom" style={{ width: isMobile ? '93%' : '40%' }}>
          {specialty ? <div style={{ marginTop: 'auto', display: 'flex', width: '100%'}}>
            <IoMdSettings size={20} color="black" style={{ width: 38, height: 38, backgroundColor: darkMode ? 'white' : '#EEEE', marginRight: 8, padding: 3, borderRadius: 4 }} />
            <p style={{ fontWeight: '600', width: '100%', textAlign: 'left', padding: 10, borderRadius: 10, color: 'black', fontSize: 12, backgroundColor: darkMode ? 'white' : '#EEEE', marginBottom: 20}}>Doctor Specialty: {specialty.slice(2)}</p>
          </div>
          : null
          }
          {chatMessages.map((item, index) => (
            <>
            <div style={{ marginTop: 'auto', width: '100%', display: 'flex', flexDirection: 'row',  justifyContent: 'flex-start', marginBottom: 20}}>
              {index % 2 === 0 ? <BsFillPersonFill size={23} color="black" style={{ width: 38, height: 38, backgroundColor: darkMode ? 'white' : '#EEEE', marginRight: 8, padding: 3, borderRadius: 4 }} /> : <img src='./logo.jpeg' style={{ width: 38, height: 38, marginRight: 8, padding: 3, borderRadius: 7}}></img>}
              <p key={index} style={{ fontWeight: '600', width: '100%', textAlign: 'left', padding: 10, borderRadius: 10, color: index % 2 === 0 ? 'white' : 'black', fontSize: 12, backgroundColor: index % 2 === 0 ? '#147efb' : "white", whiteSpace: 'pre-wrap'}}>{item.includes("medical emergency") || item.includes("emergency medical services") || item.includes("emergency services") || item.includes("911") ? <Alert variant="filled" severity='error' style={{ width: '99%', height: isMobile ? 75 : 70, marginBottom: 10, fontWeight: 'bold' }}>Looks like you're having a medical emergency. If you think you are, immediately call your doctor or dial 911.</Alert> : null} {item}</p>
            </div>
            </>
          ))}
          <div style={{ marginTop: 'auto', width: '100%', height: 35, display: 'flex', flexDirection: 'row', alignItems: 'center', position: 'relative', }}>
            <input style={{ paddingLeft: 10, width: '60%', height: '100%', backgroundColor: 'transparent', borderRadius: 4, borderWidth: 2, borderColor: '#EEEE', padding: 6, color: darkMode ? 'white' : '#EEEE', fontSize: 12, boxSizing: 'border-box', }} onKeyDown={(event) => {event.code === 'Enter' && prompt != '' ? generateResponse() : console.log() }} placeholder="Ask a medical question..." value={prompt} onChange={(event) => setPrompt(event.target.value)} />
            <button onClick={() => setIsOpen((prev) => !prev)} style={{ color: 'white', fontWeight: '600', fontSize: 12, height: '100%', width: isMobile ? '39%' : '39%', position: 'absolute', backgroundColor: '#1f7efb', right: 0.5, borderRadius: 4, alignItems: 'center', justifyContent: 'center', display: 'flex' }}>{specialty ? specialty : 'Normal' } {isOpen ? <AiFillCaretUp size={13} style={{ marginLeft: 4}} /> : <AiFillCaretDown size={13} style={{ marginLeft: 4}} />} </button>
            {isOpen ? 
              <div ref={ref} style={{ backgroundColor: darkMode ? "#1e1e1e" : 'white', display: 'block', width: '31%', height: isMobile ? '1270%' : '1600%', borderWidth: 1, borderColor: '#EEEE', borderRadius: 4, marginTop: isMobile ? -450 : -550, position: 'absolute', right: 0.5}}>
                  {specialties.map((item, index) => (
                    <button key={index} style={{ color: darkMode ? 'white' : 'black', fontSize: 12, marginBottom: 2, padding: 5, width: '100%', height: '10%'}} onMouseEnter={mouseEnter} onMouseLeave={mouseLeave} onClick={(value) => showSpecialty(value)}>{item.name}</button>
                  ))}
              </div> 
              : null
            }
          </div>
          <p style={{ marginBottom: 60, color: darkMode ? 'white' : 'grey', fontSize: 10, marginTop: 3, width: '100%' }}>This tool does not provide medical advice, it is intended for informational purposes only. If you think you may have a medical emergency, immediately call your doctor or dial 911.</p>
        </div>
        {confetti ? <Confetti height={1000} width={width} /> : null}
      </header>
    </div> 
  );
}


export default App;

