import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient";

const RegisterForm = () => {
    const navigate = useNavigate();
    // 1. Set up state to capture input values
    const [formData, setFormData] = useState({
        //id: Date.now(),
        username: '',
        email: '',
        password: ''
    });

    // 2. Update state whenever an input changes
    const handleChange = (e) => {
        const { name, value } = e.target;  //descrtucting the object 
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        //const userId = "user" + Date.now();
        const { data , error } = await supabase
            .from("users")
            .insert([
                {
                    //id: userId,
                    username: formData.username,
                    email: formData.email,
                    password: formData.password
                }
            ])
            .select()  //return newly created user
            .single();  //give row directly not array


        if (error) {
            console.log(error);
            alert(error.message);
            return;
        }

        // Remember current user
        localStorage.setItem("loggedInUserId", data.id);
        alert("User registered successfully!");

        setFormData({
            username: "",
            email: "",
            password: ""
        });

        navigate("/todo");
    };

return (
        <div className="register-container">
            <form className="register-form" onSubmit={handleSubmit}>
                <h2>Create Account</h2>
                <div className="form-group">
                    <label>Name</label>
                    <input type="name"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="Enter your name" />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email" />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter your password" />
                </div>
                <button type="submit">Register</button>
                <p>
                    Do have an account? <a href="/login">Login</a>
                </p>
            </form>
        </div>
    );
}

export default RegisterForm;
