import React, { useRef, useState } from "react";

const SignUp = () => {
  const fullname = useRef();
  const email = useRef();
  const password = useRef();
  const image = useRef();
  const [loading, setLoading] = useState(false);
  const SignUphandle = (event) => {
    event.preventDefault();
  };
  return (
    <>
      <div>
        <h1>Sign Up</h1>
        <form action="">
          <button></button>npm install -D tailwindcss postcss autoprefixer

        </form>
      </div>
    </>
  );
};

export default SignUp;
