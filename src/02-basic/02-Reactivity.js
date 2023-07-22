import { useSignal } from "@viewfly/core";

const title = `reactivity demo`;

const date = useSignal(new Date());
const user = useSignal({
    name: "jim",
    age: 20,
});

const formatDate = (date) => {
    console.log("formatDate", date);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return [year, month, day].join("/");
};

const update = (key) => {
    console.log("update", key);
    if (key === "user") {
        const tmp = user();
        user.set({
            ...tmp,
            // age: ++tmp.age,
        });
        return;
    }
    const nextDay = new Date(date().getTime() + 24 * 60 * 60 * 1000);
    date.set(nextDay);
};

export default function App() {
    return () => {
        console.log("Reactivity render", user());
        return (
            <div>
                <p>{title}</p>
                <div>date: {formatDate(date())} </div>
                <div>
                    name: {user().name} age: {user().age}
                </div>
                <button style="margin: 6px;" onClick={() => update("user")}>
                    age++
                </button>
                <button style="margin: 6px;" onClick={() => update("date")}>
                    day++
                </button>
            </div>
        );
    };
}
