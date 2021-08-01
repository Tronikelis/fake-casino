import { createContext, Dispatch, FC, SetStateAction, useState } from "react";

// context type
interface ContextParams {
    context: {
        money: number;
        previous: "🟢" | "🔴" | "⚫";
    },
    setContext: Dispatch<SetStateAction<ContextParams["context"]>>
};

// create context
const Context = createContext<ContextParams>({
    context: {
        money: 1500,
        previous: "⚫",
    },
    setContext: () => {},
});
export default Context;

// provide provider for context
const Provider: FC = ({ children }) => {

    const [value, setValue] = useState<ContextParams["context"]>({
        money: 1500,
        previous: "⚫",
    });

    const state: ContextParams = {
        context: value,
        setContext: setValue,
    };

    return (
        <Context.Provider value={state}>
            {children}
        </Context.Provider>
    );
};

export { Provider };