import axios, { all } from "axios";
import { useEffect, useRef, useState, useContext } from "react";
import "./profile.css";
import { baseUrl } from "../../core";
import { GlobalContext } from "../../context/context";
import { useParams } from 'react-router-dom';

// import WeatherCard from "../weatherWidget/weatherWidget";
// const baseUrl = "http://localhost:5001";

const Profile = () => {
  const { state, dispatch } = useContext(GlobalContext);

  const [alert, setAlert] = useState([]);
  const [editAlert, setEditAlert] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const postTitleInputRef = useRef(null);
  const postBodyInputRef = useRef(null);
  const searchInputRef   = useRef(null);
  const [allPosts, setAllPosts] = useState([])
  const [toggleRefresh, setToggleRefresh] = useState(false)
  const {userId} = useParams();
  const [profile, setProfile] = useState(null)
  const [checkInTime, setCheckInTime] = useState('')
  const [checkInHistory, setCheckInHistory] = useState([])
  const [checkOutHistory, setCheckOutHistory] = useState([])
  const [checkOutTime, setCheckOutTime] = useState('')
  const [isCheckInDisabled, setIsCheckInDisabled] = useState(false);
  const [isCheckOutVisible, setIsCheckOutVisible] = useState(false);

  const getAllPosts = async () => {

      try {
        setIsLoading(true)
          // let apiKey = "1eb2b0718446fe54a6718bc2ed5f4a03"
          const response = await axios.get(`${baseUrl}/api/v1/mongoDB/posts?_id=${userId || ""}`,
          {withCredentials: true});

        console.log(response.data);
        // setWeatherData([response.data, ...weatherData]);
        setIsLoading(false)
        setAllPosts([...response.data])
      } catch (error) {
        console.log(error);
        setIsLoading(false)
      }
    }

  const getProfile = async () => {
    try {
      setIsLoading(true)
      const response = await axios.get(`${baseUrl}/api/v1/mongoDB/profile/${userId || ""}`,
      {withCredentials: true});

      console.log(response.data);
      setIsLoading(false)
      setProfile(response.data)
    } catch (error) {
      console.log(error.data);
      setIsLoading(false)
    }
  }

    useEffect(() => {
    // setIsLoading(true)
    // const controller = new AbortController();
    // if (navigator.geolocation) {
    //   navigator.geolocation.getCurrentPosition(async(location) => {
    //     console.log("location", location)
    getAllPosts()
    getProfile()

    return () => {
      //cleanup function
      // controller.abort()
    }

  }, [toggleRefresh]);

  const submitHandler = async (e) => {
    e.preventDefault();
    // not recommended below method for get input value
    // let cityName = document.querySelector('#cityName').value
    // console.log("cityName: ", cityNameRef.current.value);
    try {
        setIsLoading(true)
        const response = await axios.post(`${baseUrl}/api/v1/mongoDB/post`,{
          title: postTitleInputRef.current.value,
          text: postBodyInputRef.current.value,
        });

      // console.log(response.data);
      // setWeatherData([response.data, ...weatherData]);
      setIsLoading(false)
      console.log(response.data);
      setAlert(response.data.message)
      setToggleRefresh(!toggleRefresh)
      postTitleInputRef.current.value = "";
      postBodyInputRef.current.value = "";

    } catch (error) {
      console.log(error.data);
      setIsLoading(false)
    }
  };

  const delPostHandler = async (_id) => {
    try {
      setIsLoading(true)
      const response = await axios.delete(`${baseUrl}/api/v1/mongoDB/post/${_id}`,{
        title: postTitleInputRef.current.value,
        text: postBodyInputRef.current.value,
        });

    // console.log(response.data);
    // setWeatherData([response.data, ...weatherData]);
    setIsLoading(false)
    console.log(response.data);
    setAlert(response.data.message)
    setToggleRefresh(!toggleRefresh)

  } catch (error) {
    console.log(error.data);
    setIsLoading(false)
  }
  }

  const editSaveSubmitHandler = async (e) => {
    e.preventDefault()

    const _id = e.target[0].value
    const title = e.target[1].value
    const text = e.target[2].value

    try {
      setIsLoading(true)
      const response = await axios.put(`${baseUrl}/api/v1/mongoDB/post/${_id}`,{
        title: title,
        text: text,
      });

    // console.log(response.data);
    // setWeatherData([response.data, ...weatherData]);
    setIsLoading(false)
    console.log(response.data);
    setAlert(response.data.message)
    setToggleRefresh(!toggleRefresh)

  } catch (error) {
    console.log(error.data);
    setIsLoading(false)
  }
  }

  const searchHandler = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await axios.get(`${baseUrl}/api/v1/mongoDB/search?q=${searchInputRef.current.value}`);
      console.log(response.data);

      setIsLoading(false);
      setAllPosts([...response.data]);
    } catch (error) {
      console.log(error.data);
      setIsLoading(false);
    }
  };

  const CheckInHandler = async (e) => {
    e.preventDefault();
    try {
      // const response = await axios.post(`${baseUrl}/api/v1/mongoDB/profile/:userId/checkIn`,{
      //   checkInTime: checkInTime,
      //   checkOutTime: checkOutTime,
      // })
      setIsCheckInDisabled(true);

      // Set a timer to enable the check-in button after 5 minutes
      setTimeout(() => {
        setIsCheckInDisabled(false);
        setIsCheckOutVisible(true);
      }, 24*60*60*1000); // 5 minutes in milliseconds

      const currentDateAndTime = new Date();
      setCheckInTime (currentDateAndTime.toLocaleString())
      console.log(checkInTime)

      setIsCheckOutVisible(true);
      // Update check-in history state
      setCheckInHistory((prevHistory) => [...prevHistory, checkInTime]);
      console.log(checkInHistory)

    } catch (error) {
      console.log(error.data);
    }
  }

  const CheckOutHandler = async (e) => {
    e.preventDefault();
    try {
      // Disable the check-out button
      setIsCheckOutVisible(false);

      // Update check-out time status
      const currentDateAndTime = new Date();
      setCheckOutTime(currentDateAndTime.toLocaleString());
      console.log(checkOutTime);

            // Update check-Out history state
            setCheckOutHistory((prevHistory) => [...prevHistory, checkOutTime]);
            console.log(checkOutHistory)
      

    } catch (error) {
      console.log(error.data);
      // Handle errors if needed
    }
  };

  return (
    <div>
      <div className="banner">
        <img className="bannerImg" src="" alt="" />
        <img className="profileImg" src="" alt="" />
        <div className="profileName">
          <h2>
            Hello {profile?.data?.firstName} {profile?.data?.lastName}
          </h2>
          <p>Course:</p>
          <h3>{profile?.data?.course}</h3>
          <p>Check In Time:</p>
          <h3>{checkInTime}</h3>
          <p>Check Out Time:</p>
          <h3>{checkOutTime}</h3>
        </div>
      </div>
      {/* {state.user._id === userId && (<form onSubmit={submitHandler}>
        <label htmlFor="postTitleInput">Post Title: </label>
        <input
          type="text"
          name=""
          id="postTitleInput"
          required
          minLength={2}
          maxLength={20}
          ref={postTitleInputRef}
        ></input>
        <br />
        <label htmlFor="postBodyInput">Post Body: </label>
        <textarea 
        name="" 
        id="postBodyInput" 
        required
        minLength={2}
        maxLength={9999}
        ref={postBodyInputRef}>
        </textarea>
        <br />
        <button type="submit">Publish Post</button>
        <span>
          {alert && alert}
          {isLoading && "Loading..."}
      </span>
      <br />
      </form>)} */}
      <br />

      <div>
        <button onClick={CheckInHandler} disabled={isCheckInDisabled}>Check In</button>
        {isCheckOutVisible && (
          <button onClick={CheckOutHandler}>
            Check Out
          </button>
        )}
      </div>

      <form onSubmit={searchHandler} style={{ textAlign: "right" }}>
        <input type="search" placeholder="Search..." ref={searchInputRef} />
        <button type="submit" hidden></button>
      </form>

      <hr />

      <div>
        {allPosts.map((post , index) => {
          return(
           <div key={post._id} className="post">

            {post.isEdit ?
            (<form onSubmit={editSaveSubmitHandler}>
              <input type="text" disabled defaultValue={post._id} hidden />
              <br />
              <input defaultValue={post.title} type="text" placeholder="title"/>
              <br />
              <textarea defaultValue={post.text} placeholder="write something.."></textarea>
              <br />
              <button type="submit">Save</button>
              <button type="button" onClick={()=>{
                post.isEdit = false
                setAllPosts([...allPosts])
              }}>
                Cancel</button>
              <span>
                {editAlert && editAlert}
                {isLoading && "Loading..."}
                </span>
          </form>) : (<div>
            <h2>{post.title}</h2>
            <p>{post.text}</p>
            <button onClick={()=>{
              allPosts[index].isEdit = true
                setAllPosts([...allPosts])
            }}>Edit</button>
            <button onClick={()=>{delPostHandler(post._id)}}>Delete</button>
            </div>)}

           </div>)
           
        })}

        {allPosts.length === 0 && "No Posts Yet"}
      </div>
    </div>
  );
};

export default Profile;
