import Heading from "../components/Heading";
import Subheading from "../components/Subheading";
import InputBox from "../components/InputBox";
import Button from "../components/Button";
import RedirectText from "../components/RedirectText";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
    const navigate = useNavigate();

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async () => {
        const response = await axios.post(
            "http://localhost:3000/api/v1/user/signIn",
            { userName, password }
        );
        localStorage.setItem("token", response.data.token);
        navigate("/dashboard");
    };

    return (
        <div className="flex h-screen items-center justify-center bg-gray-400">
            <div className="px-4 py-6 rounded-2xl bg-white w-96 items-center">
                <Heading label="Sign In" />
                <Subheading subheading="Enter your information to login your account" />

                <div className="my-8">
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

                <Button title="Sign In" onClick={handleSubmit} />
                <RedirectText
                    text="Already have an account"
                    link="Sign un"
                    to="/signup"
                />
            </div>
        </div>
    );
};

export default SignIn;
