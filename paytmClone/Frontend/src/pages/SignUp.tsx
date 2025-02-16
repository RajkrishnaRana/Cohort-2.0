import { useState } from "react";
import Button from "../components/Button";
import Heading from "../components/Heading";
import InputBox from "../components/InputBox";
import RedirectText from "../components/RedirectText";
import Subheading from "../components/Subheading";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async () => {
        console.log(firstName, lastName, userName, password);
        const response = await axios.post(
            "http://localhost:3000/api/v1/user/signUp",
            {
                firstName,
                lastName,
                userName,
                password,
            }
        );

        localStorage.setItem("token", response.data.token);
        navigate("/dashboard");
    };

    return (
        <div className="flex h-screen items-center justify-center bg-gray-400">
            <div className="px-4 py-6 rounded-2xl bg-white w-96 items-center">
                <Heading label="Sign Up" />
                <Subheading subheading="Enter your information to create an account" />

                <div className="my-8">
                    <InputBox
                        label="First Name"
                        placeholder="Enter your fist name"
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                    <InputBox
                        label="Last Name"
                        placeholder="Enter your last name"
                        onChange={(e) => setLastName(e.target.value)}
                    />
                    <InputBox
                        label="User Name"
                        placeholder="Enter your user name"
                        onChange={(e) => setUserName(e.target.value)}
                    />
                    <InputBox
                        label="Password"
                        placeholder="Enter your password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <Button title="Sign Up" onClick={handleSubmit} />
                <RedirectText
                    text="Already have an account"
                    link="Sign in"
                    to="/signin"
                />
            </div>
        </div>
    );
};

export default SignUp;
