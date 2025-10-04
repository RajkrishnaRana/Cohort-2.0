import { useState } from "react";
import { Field, FieldGroup, FieldLabel, FieldSet } from "./ui/field";
import { Input } from "./ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import type { SigninInput, SignupInput } from "@rkrana001/medium-blog-types";
import axios from "axios";
import { BASE_URL } from "@/config";
import { toast } from "sonner";
import { Spinner } from "./ui/spinner";

interface AuthProps {
    type: "signup" | "signin";
}

const Auth: React.FC<AuthProps> = ({ type }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

    const handleSignInorUp = () => {
        navigate(type === "signup" ? "/signin" : "/signup");
    };

    const handleSignUp = async () => {
        const payload: SignupInput = {
            username,
            password,
            name,
        };

        console.log("payload", payload);
        try {
            const response = await axios.post(`${BASE_URL}/api/v1/users/signup`, payload);
            const jwt = response.data;
            localStorage.setItem("jwt", jwt);
        } catch (e: any) {
            console.error(e);
            toast.error(e.response.data || "Something went wrong");
        }
    };

    const handleSignIn = async () => {
        const payload: SigninInput = { username, password };

        try {
            setLoading(true);
            const response = await axios.post(`${BASE_URL}/api/v1/users/signin`, payload);
            const jwt = response.data;
            localStorage.setItem("jwt", jwt);
            navigate("/blog");
        } catch (e: any) {
            console.error(e);
            toast.error(e.response.data || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col justify-center items-center">
            <div className="mb-10">
                <h1 className="text-3xl/loose font-bold text-black text-center">{type === "signup" ? "Create an account" : "Welcome Back"}</h1>
                <section className="flex items-center justify-center">
                    <h3 className="text-sm/normal text-gray-500 text-center">
                        {type === "signup" ? "Already have an account?" : "Don't have an account?"}
                    </h3>
                    <Button variant="link" className="ml-3 size-5" onClick={handleSignInorUp}>
                        {type === "signup" ? "Sign In" : "Sign Up"}
                    </Button>
                </section>
            </div>

            <div className="w-full max-w-md py-5">
                <FieldSet>
                    <FieldGroup className="gap-5">
                        <Field>
                            <FieldLabel htmlFor="username" className="text-black font-bold">
                                Username
                            </FieldLabel>
                            <Input id="username" type="text" placeholder="Enter your username" onChange={(e) => setUsername(e.target.value)} />
                        </Field>
                        {type === "signup" && (
                            <Field>
                                <FieldLabel htmlFor="password" className="text-black font-bold">
                                    Name
                                </FieldLabel>
                                <Input id="name" type="text" placeholder="Enter your Name" onChange={(e) => setName(e.target.value)} />
                            </Field>
                        )}
                        <Field>
                            <FieldLabel htmlFor="password" className="text-black font-bold">
                                Password
                            </FieldLabel>
                            <Input id="password" type="password" placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)} />
                        </Field>
                        <Button variant="default" className="mt-5" onClick={type === "signup" ? handleSignUp : handleSignIn}>
                            {loading ? <Spinner /> : type === "signup" ? "Sign Up" : "Sign In"}
                        </Button>
                    </FieldGroup>
                </FieldSet>
            </div>
        </div>
    );
};

export default Auth;
