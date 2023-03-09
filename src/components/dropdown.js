import { useState} from 'react'
import { AiFillCaretDown } from "react-icons/ai";

function Dropdown(options) {

    const [open, setOpen] = useState(false)

    return (
        <div style={{ marginTop: 20, width: '100%' }}>
            <div role="button" style={{ borderTopRightRadius: 10, borderBottomRightRadius: 10, backgroundColor: "#147efb", display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }} onClick={() => setOpen(!open)}>
                <h4 style={{ padding: 10, color: 'white', fontWeight: 'bold', fontSize: 18 }}>Specialties</h4>
                <AiFillCaretDown size={17} style={{ marginRight: 10}} />
            </div>
            {open ? 
            <div style={{ backgroundColor: 'white', display: 'block', width: '100%', height: 200, borderWidth: 1, borderColor: '#EEEE', borderRadius: 10, marginTop: 10}}>
                <h1 style={{ color: 'black'}}>hi</h1>
            </div> 
            : null
            }
        </div>
    )
}

export default Dropdown

