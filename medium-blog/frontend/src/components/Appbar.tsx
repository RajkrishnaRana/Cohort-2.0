import { Link, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";

const Appbar = () => {
    const navigate = useNavigate();

    return (
        <nav className="flex justify-between w-screen items-center py-2.5 px-20 shadow-sm bg-white fixed top-0 z-10">
            <Link to="/blogs">
                <h3 className="text-lg text-black font-semibold">Medium</h3>
            </Link>

            <div className="flex items-center">
                <Button className="bg-green-800 mr-4 rounded-full" onClick={() => navigate("/publish")}>
                    Pulish
                </Button>
                <Avatar className="w-7 h-7">
                    <AvatarFallback className="bg-slate-600 text-white text-sm">R</AvatarFallback>
                </Avatar>
            </div>
        </nav>
    );
};

export default Appbar;
