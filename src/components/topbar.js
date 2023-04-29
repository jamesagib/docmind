import { MdDarkMode, MdOutlineDarkMode } from "react-icons/md";

function TopBar({ darkMode, changeTheme }) {

    return (
        <div style={{ backgroundColor: darkMode ? '#272727' : 'white', height: '40%', width: '100%', boxShadow: '5px 0 30px rgba(1,41,112,0.08)', position: 'sticky', top: 0}}>
            {darkMode ? <button style={{ float: 'right', padding: 10}}><MdDarkMode style={{ display: 'flex'}} color="white" size={30} onClick={changeTheme} /></button> : <button style={{ float: 'right', padding: 10 }}><MdOutlineDarkMode size={30} color="black" onClick={changeTheme} /></button> }
        </div>
    )
}

export default TopBar

