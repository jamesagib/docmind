import { IoIosCheckmarkCircle } from "react-icons/io";

function Features({ darkMode }) {

    return (
        <>
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
        </>
    )
}

export default Features

