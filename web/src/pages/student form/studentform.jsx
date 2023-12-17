// import axios from "axios";
// import { useEffect, useRef, useState } from "react";
// import "./admin home.css";
// import { baseUrl } from "../../core";
// import { GlobalContext } from "../../context/context";

// const AddStudent = () => {
//   // const [student,setStudent] = useState(null)
//   let { state, dispatch } = useContext(GlobalContext);

//   const firstNameRef = useRef();
//   const lastNameRef = useRef();
//   const emailRef = useRef();
//   const passwordRef = useRef();
//   const phoneRef = useRef();
//   const genderRef = useRef();

//   const studentFormHandler = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(
//         `${baseUrl}/api/v1/mongoDB/addStudent`,
//         {
//           firstName: firstNameRef.current.value,
//           lastName: lastNameRef.current.value,
//           email: emailRef.current.value,
//           password: passwordRef.current.value,
//           phone: phoneRef.current.value,
//           gender: genderRef.current.value,
//           role: "student",
//         }
//       );
//       console.log(response);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div>
//       <form onSubmit={studentFormHandler}>
//         <img src="" alt="" />
//         <br />
//         <label htmlFor="firstName">First Name</label>
//         <input
//           type="text"
//           ref={firstNameRef}
//           required
//           placeholder="Enter Student First Name"
//         />
//         <br />
//         <label htmlFor="lastName">Last Name</label>
//         <input
//           type="text"
//           ref={lastNameRef}
//           required
//           placeholder="Enter Student Last Name"
//         />
//         <br />
//         <label htmlFor="email">Email</label>
//         <input
//           type="email"
//           ref={emailRef}
//           required
//           placeholder="Enter Student Email"
//         />
//         <br />
//         <label htmlFor="password">Password</label>
//         <input
//           type="password"
//           ref={passwordRef}
//           required
//           placeholder="Enter Student Password"
//         />
//         <br />
//         <label htmlFor="phone">Phone</label>
//         <input
//           type="number"
//           ref={phoneRef}
//           required
//           placeholder="Enter Student Phone"
//         />
//         <br />
//         <label htmlFor="gender">Gender</label>
//         <input
//           type="text"
//           ref={genderRef}
//           required
//           placeholder="Enter Student Gender"
//         />
//         <br />
//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// };

// export default AddStudent;
