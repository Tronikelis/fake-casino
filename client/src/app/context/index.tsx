import { createContext, Dispatch, FC, SetStateAction, useState } from "react";

// context type
interface ContextParams {
    context: {
        money: number;
    },
    setContext: Dispatch<SetStateAction<ContextParams["context"]>>
};

// create context
const Context = createContext<ContextParams>({
    context: {
        money: 1500
    },
    setContext: () => {},
});
export default Context;

// provide provider for context
const Provider: FC = ({ children }) => {

    const [value, setValue] = useState<ContextParams["context"]>({
        money: 1500,
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