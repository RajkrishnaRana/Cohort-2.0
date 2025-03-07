interface User {
    id: string;
    age: string;
    name: string;
    email: string;
    password: string;
}

interface Config {
    readonly apiKey: string;
    key: string;
}

type UpdateProps = Pick<User, "name" | "age" | "email">;

type UpdatePropsOptional = Partial<UpdateProps>;

type ObjCleanerType = Record<string, User>;

const apiConfig: Readonly<Config> = {
    apiKey: "123",
    key: "123",
};

function sumOfAge(updateProps: UpdatePropsOptional) {}

sumOfAge({
    name: "홍길동",
    // age: "20"
});

const haha = new Map();

haha.set("123", "123");
haha.set("h", "hello");

console.log(haha.get("h"));

type EventType = "click" | "keydown" | "change";
type ExclueEvent = Exclude<EventType, "click">; // 'keydown' | 'change'
