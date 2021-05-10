import React, { useState } from "react";
import "react-dom";
import { NavLink, useHistory } from "react-router-dom";
import "react-router";

function Login() {
  const history = useHistory();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  let name, value;
  const handleInputs = (e) => {
    console.log(e);
    name = e.target.name;
    value = e.target.value;
    console.log(value);
    console.log(name);

    setUser({ ...user, [name]: value }); //// will take the name from line 15
  };
  // console.log(user);
  const PostData = async (e) => {
    e.preventDefault();

    const { email, password } = user;
    console.log(email);
    console.log(password);

    const res = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    console.log("res", res);
    const data = await res.json();
    console.log("data", data);
    if (res.status === 422 || !data) {
      window.alert("Invalid Login");
      console.log("Invalid Login");
    } else {
      window.alert("Login Successful");
      console.log("Login Successful");

      history.push("/about");
    }
  };

  return (
    <>
      <div class="container">
        <div class="row row-cols-lg-8 row-cols-sm-2 row-cols-md-10  justify-content-center">
          <div class="dropdown">
            <form
              // class="px-4 py-3"
              method="POST"
              className="signup-form"
              id="signup-form"
            >
              <div class="form-group">
                <label for="exampleDropdownFormEmail1">Email address</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  class="form-control"
                  placeholder="email@example.com"
                  onChange={handleInputs}
                  placeholder="email@example.com"
                />
              </div>

              <div class="form-group">
                <label for="exampleDropdownFormPassword1">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  class="form-control"
                  placeholder="Password"
                  value={user.password}
                  onChange={handleInputs}
                />
              </div>

              <button
                type="submit"
                class="btn btn-primary"
                name="Login"
                onClick={PostData}
              >
                Login
              </button>
            </form>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="/signup">
              New around here? Sign Up
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
