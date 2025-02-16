import Heading from "../components/Heading";
import Subheading from "../components/Subheading";
import InputBox from "../components/InputBox";
import Button from "../components/Button";
import RedirectText from "../components/RedirectText";

const SignIn = () => {
    return (
        <div className="flex h-screen items-center justify-center bg-gray-400">
            <div className="px-4 py-6 rounded-2xl bg-white w-96 items-center">
                <Heading label="Sign In" />
                <Subheading subheading="Enter your information to login your account" />

                <div className="my-8">
                    <InputBox
                        label="User Name"
                        placeholder="Enter your user name"
                    />
                    <InputBox
                        label="Password"
                        placeholder="Enter your password"
                    />
                </div>

                <Button title="Sign In" />
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
