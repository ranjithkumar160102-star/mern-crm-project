import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
const navigate = useNavigate();

const [formData, setFormData] = useState({
email: "",
password: "",
});

const handleChange = (e) => {
setFormData({
...formData,
[e.target.name]: e.target.value,
});
};

const handleSubmit = async (e) => {
e.preventDefault();

try {
  const res = await axios.post(
    "http://localhost:5000/api/auth/login",
    formData
  );

  localStorage.setItem("token", res.data.token);

  alert("Login Successful");

  navigate("/dashboard");
} catch (error) {
  alert(
    error.response?.data?.message || "Login Failed"
  );
}

};

return ( <div className="flex justify-center items-center h-screen bg-gray-100"> <form
     onSubmit={handleSubmit}
     className="bg-white p-6 rounded-lg shadow-md w-96"
   > <h1 className="text-3xl font-bold mb-4 text-center">
Login </h1>

    <input
      type="email"
      name="email"
      placeholder="Enter Email"
      className="w-full border p-2 mb-3 rounded"
      value={formData.email}
      onChange={handleChange}
    />

    <input
      type="password"
      name="password"
      placeholder="Enter Password"
      className="w-full border p-2 mb-3 rounded"
      value={formData.password}
      onChange={handleChange}
    />

    <button
      type="submit"
      className="w-full bg-green-500 text-white p-2 rounded"
    >
      Login
    </button>
  </form>
</div>
);
}

export default Login;
