// import { useState } from 'react'
import { useEffect, useRef, useState, useContext } from 'react'
import axios from 'axios'
import './signup.css'
import {GlobalContext} from '../../context/context'
import { baseUrl } from '../../core'

// const baseUrl = 'http://localhost:5001'

const AddStudent = () => {

    const {state, dispatch} = useContext(GlobalContext)

    const firstNameInputRef = useRef(null)
    const lastNameInputRef = useRef(null)
    const emailInputRef = useRef(null)
    const passwordInputRef = useRef(null)
    const repeatPasswordInputRef = useRef(null)
    const courseInputRef = useRef(null)
    const phoneInputRef = useRef(null)

    const [passwordErrorClass, setPasswordErrorClass] = useState("hidden")
    const [alertMessage , setAlertMessage] = useState('')
    const [errorMessage , setErrorMessage] = useState('')

    useEffect(()=>{
        setTimeout(() => {
            setAlertMessage('')
            setErrorMessage('')
        }, 5000);
    },[alertMessage,errorMessage])


    const signupSubmitHandler = async (e) =>{
        e.preventDefault()

        if(passwordInputRef.current.value !== repeatPasswordInputRef.current.value){
            setPasswordErrorClass('')
            return
        }else{
            setPasswordErrorClass('hidden')
        }

        try{
            const response = await axios.post(`${baseUrl}/api/v1/mongoDB/signup`, {
                firstName: firstNameInputRef.current.value,
                lastName: lastNameInputRef.current.value,
                email: emailInputRef.current.value,
                password: passwordInputRef.current.value,
                course: courseInputRef.current.value,
                phone: phoneInputRef.current.value,
            })
            console.log(response.data.message);
            setAlertMessage(response.data.message)
        }catch (error){
            console.log(error.response.data);
            setErrorMessage(error.response.data.message)
        }}




    // const signupSubmitHandler = async (e) =>{
    //     e.preventDefault()

    //     if(passwordInputRef.current.value !== repeatPasswordInputRef.current.value){
    //         setPasswordErrorClass('')
    //         return
    //     }else{
    //         setPasswordErrorClass('hidden')
    //     }

    //     try{
    //         const response = await axios.post(`${baseUrl}/api/v1/mongoDB/signup`, {
    //             firstName: firstNameInputRef.current.value,
    //             lastName: lastNameInputRef.current.value,
    //             email: emailInputRef.current.value,
    //             password: passwordInputRef.current.value,
    //             course: courseInputRef.current.value,
    //             phone: phoneInputRef.current.value,
    //         })
    //         console.log(response.data.message);
    //         setAlertMessage(response.data.message)
    //     }catch (error){
    //         console.log(error.response.data);
    //         setErrorMessage(error.response.data.message)
    //     }}



    return (
        <div>
        <h1>Add Student</h1>
        <h2>{state.name}</h2>
        <form id="signupForm" onSubmit={signupSubmitHandler}>
          <label htmlFor="firstNameInput">First Name:</label>
          <input ref={firstNameInputRef} type="text" autoComplete='given-name' name="firstNameInput" id="firstNameInput" required />
  
          <br />
          <label htmlFor="lastNameInput">Last Name:</label>
          <input ref={lastNameInputRef} type="text" autoComplete='family-name' name="lastNameInput" id="lastNameInput" required />
  
          <br />
          <label htmlFor="courseInput">Course:</label>
          <input ref={courseInputRef} type="text" autoComplete='family-name' name="courseInput" id="courseInput" required />

          <br />
          <label htmlFor="phoneInput">Phone: </label>
          <input ref={phoneInputRef} type="tel" name="phoneInput" id="PhoneInput" required />

          <br />
          <label htmlFor="emailInput">Email:</label>
          <input ref={emailInputRef} type="email" autoComplete='email' name="emailInput" id="emailInput" required />
  
          <br />

          <label htmlFor="passwordInput">Password:</label>
          <input ref={passwordInputRef} type="password" autoComplete='new-password' name="passwordInput" id="passwordInput" />
  
          <br />

          <label htmlFor="repeatPasswordInput">Repeat Password:</label>
          <input ref={repeatPasswordInputRef} type="password" autoComplete='new-password' name="repeatPasswordInput" id="repeatPasswordInput" />
          <p className={`errorMsg ${passwordErrorClass}` } id='passwordErrorMsg'>Password do not match.</p>
  
          <br />

  
          <button type="submit">Add Student</button>
          <div className='alertMsg'>{alertMessage}</div>
          <div className='errorMsg'>{errorMessage}</div>
        </form>
      </div>
    )
}

export default AddStudent