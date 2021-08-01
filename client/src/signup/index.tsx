import { FC, Dispatch, SetStateAction } from "react";

interface SignupProps {
    state: {
        signedIn: boolean;
        setSignedIn: Dispatch<SetStateAction<boolean>>;
    };
};

const Signup: FC<SignupProps> = ({ state }) => {
    return (
        <div>Sign up pls</div>
    );
};
export default Signup;