import Auth from "@/components/Auth";
import Quote from "@/components/Quote";

const Signin = () => {
    return (
        <main className="grid lg:grid-cols-2">
            <Auth type="signin" />
            <Quote />
        </main>
    );
};

export default Signin;
