import { useState, useRef, useEffect } from 'react';
import { Configuration, OpenAIApi } from 'openai';
import './App.css';
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import { BsFillPersonFill } from 'react-icons/bs'
import { BiHealth } from "react-icons/bi";
import { IoMdSettings } from "react-icons/io";

function App(props) {
  
  const [prompt, setPrompt] = useState("")
  const [response, setResponse] = useState("")
  const [chatMessages, setChatMessages] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [specialty, setSpecialty] = useState("⛑️ Medical Assistant")

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
    const res = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{"role": "system", "content": "You are a orthopedic, you help with questions about bone and joint health and treatment"},{role: "user", content: `${prompt}`},],
    })
    chatMessages.push(res.data.choices[0].message.content)
    setResponse(res.data.choices[0].message.content)
    console.log(res.data.choices[0].message.content)
  }

  const showSpecialty = async (value) => {
    setSpecialty(value.target.innerText)
    setIsOpen(false)

    openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{"role": "system", "content": `${specialty}`}],
    })
  }

  const mouseEnter = (e) => {
    e.target.style.backgroundColor = '#EEEE'
  }

  const mouseLeave = (e) => {
    e.target.style.backgroundColor = 'white'
  }
  
  
  return (
    <div className="App">
      <header className="App-header">
        {specialty ? <div style={{ display: 'flex', width: '30rem'}}>
          <IoMdSettings size={23} color="black" style={{ width: '2rem', height: '2rem', backgroundColor: '#EEEE', marginRight: 8, padding: 3, borderRadius: 4 }} />
          <p style={{ fontWeight: '600', width: '30rem', textAlign: 'left', padding: 10, borderRadius: 10, color: 'black', fontSize: 12, backgroundColor: '#EEEE', marginBottom: 20}}>System Instruction: {specialty}</p>
        </div>
        : null
        }
        {chatMessages.map((item, index) => (
          <>
          <div style={{ width: '30rem', display: 'flex', flexDirection: 'row',  justifyContent: 'flex-start', marginBottom: 20}}>
            {index % 2 === 0 ? <BsFillPersonFill size={23} color="black" style={{ width: '2rem', height: '2rem', backgroundColor: '#EEEE', marginRight: 8, padding: 3, borderRadius: 4 }} /> : <BiHealth size={23} color="black" style={{ width: '2rem', height: '2rem', backgroundColor: '#EEEE', marginRight: 8, padding: 3, borderRadius: 4 }} />}
            <p key={index} style={{ fontWeight: '600', width: '100%', textAlign: 'left', padding: 10, borderRadius: 10, color: index % 2 === 0 ? 'white' : 'black', fontSize: 12, backgroundColor: index % 2 === 0 ? '#147efb' : '#EEEE',}}>{item}</p>
          </div>
          </>
        ))}
        <div style={{ position: 'relative', width: '30rem', height: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
          <input style={{ width: '100%', height: '100%', backgroundColor: 'transparent', borderRadius: 4, borderWidth: 2, borderColor: '#EEEE', padding: 6, color: 'black', fontSize: 12, boxSizing: 'border-box' }} onKeyDown={(event) => {event.code === 'Enter' && prompt != '' ? generateResponse() : console.log() }} placeholder="Ask a medical question..." value={prompt} onChange={(event) => setPrompt(event.target.value)} />
          <button onClick={() => setIsOpen((prev) => !prev)} style={{ fontWeight: '600', fontSize: 12, height: '1.96rem', width: specialty ? '10rem' : '6rem', position: 'absolute', backgroundColor: '#1f7efb', right: 0.5, borderTopRightRadius: 4, borderBottomRightRadius: 4, alignItems: 'center', justifyContent: 'center', display: 'flex' }}>{specialty ? specialty : 'Normal' } {isOpen ? <AiFillCaretUp size={13} style={{ marginLeft: 4}} /> : <AiFillCaretDown size={13} style={{ marginLeft: 4}} />} </button>
          {isOpen ? 
            <div ref={ref} style={{ backgroundColor: 'white', display: 'block', width: '8rem', height: '25rem', borderWidth: 1, borderColor: '#EEEE', borderRadius: 4, marginTop: '28rem', position: 'absolute', right: 0.5}}>
                {specialties.map((item, index) => (
                  <button key={index} style={{ color: 'black', fontSize: 12, marginBottom: 2, padding: 5, width: '100%', height: '3rem'}} onMouseEnter={mouseEnter} onMouseLeave={mouseLeave} onClick={(value) => showSpecialty(value)}>{item.name}</button>
                ))}
            </div> 
            : null
          }
        </div>
        <p style={{ marginBottom: 20, color: '#BDBDBD', fontSize: 10, marginTop: 3, width: '28rem' }}>This tool does not provide medical advice, it is intended for informational purposes only. If you think you may have a medical emergency, immediately call your doctor or dial 911.</p>
      </header>
    </div>
  );
}

export default App;

