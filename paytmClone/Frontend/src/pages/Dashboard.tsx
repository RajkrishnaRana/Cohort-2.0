import Appbar from "../components/Appbar";
import Balance from "../components/Balance";
import Users from "../components/Users";

const Dashboard = () => {
    return (
        <div>
            <Appbar />
            <div className="flex flex-col px-10">
                <Balance amount="100000" />
                <Users />
            </div>
        </div>
    );
};

export default Dashboard;
