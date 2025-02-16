import { Avatar } from "./Avatar";

const Appbar = () => {
    return (
        <div className="flex h-14 shadow-sm justify-between px-4 items-center mb-4">
            <div>PayTM App</div>

            <div className="flex flex-row gap-4 items-center">
                <h1>Rajkrishna</h1>
                <Avatar text="R" />
            </div>
        </div>
    );
};

export default Appbar;
