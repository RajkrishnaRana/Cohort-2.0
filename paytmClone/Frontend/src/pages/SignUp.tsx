import Button from "../components/Button";
import Heading from "../components/Heading";
import InputBox from "../components/InputBox";
import RedirectText from "../components/RedirectText";
import Subheading from "../components/Subheading";

const SignUp = () => {
    return (
        <div className="flex h-screen items-center justify-center bg-gray-400">
            <div className="px-4 py-6 rounded-2xl bg-white w-96 items-center">
                <Heading label="Sign Up" />
                <Subheading subheading="Enter your information to create an account" />

                <div className="my-8">
                    <InputBox
                        label="First Name"
                        placeholder="Enter your fist name"
                    />
                    <InputBox
                        label="Last Name"
                        placeholder="Enter your last name"
                    />
                    <InputBox
                        label="User Name"
                        placeholder="Enter your user name"
                    />
                    <InputBox
                        label="Password"
                        placeholder="Enter your password"
                    />
                </div>

                <Button title="Sign Up" />
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
