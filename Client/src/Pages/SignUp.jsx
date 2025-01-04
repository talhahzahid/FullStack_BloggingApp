import React, { useRef, useState } from "react";

const SignUp = () => {
  const fullname = useRef();
  const email = useRef();
  const password = useRef();
  const imageUrl = useRef();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const signUphandle = async (event) => {
    event.preventDefault();
    const fullNameValue = fullname.current.value;
    const emailValue = email.current.value;
    const passwordValue = password.current.value;
    const file = imageUrl.current.files[0];
    setLoading(true);
    // Create a FormData object and append the data
    const formData = new FormData();
    formData.append("fullname", fullNameValue);
    formData.append("email", emailValue);
    formData.append("password", passwordValue);
    formData.append("imageUrl", file);

    try {
      const response = await fetch("http://localhost:9000/user/signup", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      // const data = await response.text(); // Use .text() to log the raw response text
      if (response.ok) {
        console.log("User registered successfully:", data);
      } else {
        console.error("Error:", response.error.data.message, data);
      }
    } catch (error) {
      setError(response.error.data.message);
      console.error("Error during signup:", error.message);
      // Handle network error or unexpected error
    } finally {
      setLoading(false); // Stop loading
    }

    fullname.current.value = "";
    email.current.value = "";
    password.current.value = "";
    imageUrl.current.value = "";
  };

  // {error && (
  //   <div className="text-red-500 text-sm mb-2">
  //     <p>{error}</p>
  //   </div>

  return (
    <>
      <div className="flex justify-center items-center h-[100vh] px-7">
        <form
          onSubmit={signUphandle}
          className="flex flex-col flex-wrap justify-center items-center gap-4 bg-[#f6f7f9] rounded-lg shadow-lg p-10"
        >
          <h1 className="text-2xl font-bold text-[#ff6600]"> Sign Up</h1>
          <input
            type="text"
            placeholder="Enter FullName"
            name="fullname"
            required
            className="input input-bordered w-full max-w-xs"
            ref={fullname}
          />
          <input
            type="email"
            placeholder="Enter Email"
            name="email"
            required
            className="input input-bordered w-full max-w-xs"
            ref={email}
          />
          <input
            type="password"
            placeholder="Enter password"
            name="password"
            required
            className="input input-bordered w-full max-w-xs"
            ref={password}
          />
          <input
            type="file"
            className="file-input file-input-bordered w-full max-w-xs"
            required
            ref={imageUrl}
          />
          <button className="btn bg-[#ff6600] text-white" type="submit">
            {loading ? (
              <span className="loading loading-infinity loading-lg"></span>
            ) : (
              <span>SignUp</span>
            )}
          </button>
        </form>
      </div>
    </>
  );
};

export default SignUp;
