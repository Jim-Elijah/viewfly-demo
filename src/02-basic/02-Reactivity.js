import { useSignal } from "@viewfly/core";

const infos = [
    `Viewfly 采用依赖收集的方式实现组件更新(类似Vue3的Proxy)`,
    `Viewfly 会在调用渲染函数时记录渲染内容使用到的 Siganl, 当这些 Signal 数据产生变化时，则会触发组件重新渲染`,
    `需要注意的是，组件的渲染是异步的，所以当你改变了某一个 Signal 的值时，并不能立即获取到最新的渲染结果。`
]

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
            age: ++tmp.age,
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
            <>
                <ul style="padding-left: 0.2rem;">
                    {
                        infos.map(item => <li>{item}</li>)
                    }
                </ul>
                <div style="display: flex; align-items: center;">
                    <div>date: {formatDate(date())}</div>
                    <button style="margin: 6px;" onClick={() => update("date")}>age++</button>
                </div>
                <div style="display: flex; align-items: center;">
                    <div>name: {user().name} age: {user().age}</div>
                    <button style="margin: 6px;" onClick={() => update("user")}>age++</button>
                </div>
            </>
        );
    };
}
