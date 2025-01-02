import React, { useRef, useState } from "react";

const SignUp = () => {
  const fullname = useRef();
  const email = useRef();
  const password = useRef();
  const image = useRef();
  const [loading, setLoading] = useState(false);
  const signUphandle = (event) => {
    event.preventDefault();
    console.log(fullname.current.value);
    console.log(email.current.value);
    console.log(password.current.value);
    console.log(image.current.value);
    const data = fetch('')
  };
  return (
    <>
      <div className="flex justify-center items-center h-[100vh] px-7">
        <form
          onSubmit={signUphandle}
          action=""
          className="flex flex-col flex-wrap justify-center items-center gap-4 bg-[#f6f7f9] rounded-lg shadow-lg p-10"
        >
          <h1 className="text-2xl font-bold text-[#ff6600]"> Sign Up</h1>
          <input
            type="text"
            placeholder="Enter FullName"
            required
            className="input input-bordered w-full max-w-xs"
            ref={fullname}
          />
          <input
            type="email"
            placeholder="Enter Email"
            required
            className="input input-bordered w-full max-w-xs"
            ref={email}
          />
          <input
            type="password"
            placeholder="Enter password"
            required
            className="input input-bordered w-full max-w-xs"
            ref={password}
          />
          <input
            type="file"
            className="file-input file-input-bordered w-full max-w-xs"
            required
            ref={image}
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
