import "./App.css";
import Card from "./components/Card";
import Search from "./components/Search";

function App() {
  return (
    <div className="w-full p-4">
      <header className="py-4 flex justify-between items-center">
        <div className="flex items-center">
          <span className="pr-3 text-xl font-semibold">Payouts</span>
          <span className="flex gap-3 items-center">
            How it works
            {/* Question mark sign */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"
              />
            </svg>
          </span>
        </div>

        <Search />

        <div className="flex gap-3">
          <span className="rounded-full p-2 bg-slate-300">
            <img
              src="./assets/icons/megaphone.png"
              alt="megaphone"
              className="w-4 h-4"
            />
          </span>
          <span className="rounded-full p-2 bg-slate-300">
            <img
              src="./assets/icons/caret-down.png"
              alt="dropdown"
              className="w-4 h-4"
            />
          </span>
        </div>
      </header>

      <main>
        <h2 className="text-lg pb-4 px-2 font-semibold">Overview</h2>
        <section>
          <div className="flex flex-col lg:flex-row justify-between gap-3">
            <Card
              title="Amount Pending"
              amount="92,432,61.84"
              orders="13 Orders"
              bgColor={true}
            />
            <Card
              title="Amount Pending"
              amount="92,432,61.84"
              orders="13 Orders"
            />
            <Card
              title="Amount Pending"
              amount="92,432,61.84"
              orders="13 Orders"
              amountProcessed={true}
            />
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
