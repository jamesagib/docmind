import { useState, useRef, useEffect } from 'react';
import { Configuration, OpenAIApi } from 'openai';
import './App.css';
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import { BsFillPersonFill } from 'react-icons/bs'
import { IoMdSettings } from "react-icons/io";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { MdDarkMode, MdOutlineDarkMode } from "react-icons/md";
import Gradient from 'rgt'
import jwt_decode from "jwt-decode";

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

  const [darkMode, setDarkMode] = useState(JSON.parse(localStorage.getItem('darkMode')))

  const configuration = new Configuration({
    apiKey: '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'
  })

  const openai = new OpenAIApi(configuration)

  const specialties = [
    {
      "name": "⛑️ Medical Assistant",
      "role": "General medical care and first aid"
    },
    {
      "name": "📋 Symptom Checker",
      "role": "Asked symptoms and you will respond with a diagnosis"
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
    chatMessages.push(prompt)
    setPrompt('')
    setResponse('')
    if(specialty === '⛑️ Medical Assistant') { 
      const res = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{"role": "system", "content": "General medical care and first aid"}, {"role": "user", "content": `${prompt}`},],
      })

      chatMessages.push(res.data.choices[0].message.content)
      setResponse(res.data.choices[0].message.content)
      console.log(res.data.choices[0].message.content)
    }
    else {
      const res = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{"role": "user", "content": `${prompt}`},],
      })

      chatMessages.push(res.data.choices[0].message.content)
      setResponse(res.data.choices[0].message.content)
      console.log(res.data.choices[0].message.content)
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
      window.removeEventListener('resize',updateDimensions);
   }, [])

   useEffect(() => { 
    localStorage.setItem('darkMode', JSON.stringify(darkMode))
   }, [darkMode])

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


  return (
    <div className="App">
      <header className="App-header" style={{ backgroundColor: darkMode ? '#1e1e1e' : 'white' }}>
        <div style={{ backgroundColor: darkMode ? '#272727' : 'white', height: '40%', width: '100%', boxShadow: '5px 0 30px rgba(1,41,112,0.08)'}}>
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
        </div>
        <div className="bottom" style={{ width: isMobile ? '93%' : '40%' }}>
          {specialty ? <div style={{ marginTop: 'auto', display: 'flex', width: '100%'}}>
            <IoMdSettings size={20} color="black" style={{ width: 38, height: 38, backgroundColor: darkMode ? 'white' : '#EEEE', marginRight: 8, padding: 3, borderRadius: 4 }} />
            <p style={{ fontWeight: '600', width: '100%', textAlign: 'left', padding: 10, borderRadius: 10, color: 'black', fontSize: 12, backgroundColor: darkMode ? 'white' : '#EEEE', marginBottom: 20}}>System Instruction: {specialty}</p>
          </div>
          : null
          }
          {chatMessages.map((item, index) => (
            <>
            <div style={{ marginTop: 'auto', width: '100%', display: 'flex', flexDirection: 'row',  justifyContent: 'flex-start', marginBottom: 20}}>
              {index % 2 === 0 ? <BsFillPersonFill size={23} color="black" style={{ width: 38, height: 38, backgroundColor: darkMode ? 'white' : '#EEEE', marginRight: 8, padding: 3, borderRadius: 4 }} /> : <img src='./logo.jpeg' style={{ width: 38, height: 38, marginRight: 8, padding: 3, borderRadius: 7}}></img>}
              <p key={index} style={{ fontWeight: '600', width: '100%', textAlign: 'left', padding: 10, borderRadius: 10, color: index % 2 === 0 ? 'white' : 'black', fontSize: 12, backgroundColor: index % 2 === 0 ? '#147efb' : 'white',}}>{item}</p>
            </div>
            </>
          ))}
          <div style={{ marginTop: 'auto', position: 'relative', width: '100%', height: 35, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
            <input style={{ paddingLeft: 10, width: '100%', height: '100%', backgroundColor: 'transparent', borderRadius: 4, borderWidth: 2, borderColor: '#EEEE', padding: 6, color: darkMode ? 'white' : '#EEEE', fontSize: 12, boxSizing: 'border-box' }} onKeyDown={(event) => {event.code === 'Enter' && prompt != '' ? generateResponse() : console.log() }} placeholder="Ask a medical question..." value={prompt} onChange={(event) => setPrompt(event.target.value)} />
            <button onClick={() => setIsOpen((prev) => !prev)} style={{ color: 'white', fontWeight: '600', fontSize: 12, height: '1.96rem', width: isMobile ? '40%' : '31%', position: 'absolute', backgroundColor: '#1f7efb', right: 0.5, borderTopRightRadius: 4, borderBottomRightRadius: 4, alignItems: 'center', justifyContent: 'center', display: 'flex' }}>{specialty ? specialty : 'Normal' } {isOpen ? <AiFillCaretUp size={13} style={{ marginLeft: 4}} /> : <AiFillCaretDown size={13} style={{ marginLeft: 4}} />} </button>
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
      </header>
    </div> 
  );
}


export default App;

