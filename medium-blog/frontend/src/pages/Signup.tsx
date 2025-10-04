import Auth from "../components/Auth";
import Quote from "../components/Quote";

const Signup = () => {
    return (
        <main className="grid lg:grid-cols-2">
            <Auth type="signup" />
            <Quote />
        </main>
    );
};

export default Signup;
