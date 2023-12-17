import './about.css'
import { useEffect, useRef, useState, useContext } from 'react'
import { GlobalContext } from '../../context/context';


const About = () => {
  let { state, dispatch } = useContext(GlobalContext);

    return (
        <div>
            <h1>About</h1>
            <div>{JSON.stringify(state)}</div>
        </div>
    )
}

export default About