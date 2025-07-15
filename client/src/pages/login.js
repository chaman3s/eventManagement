import { useState } from "react";
import { BottomWarning } from "../components/BottomWarning";
import  Button from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import { useNavigate } from "react-router-dom";
import axios from "axios";// Import the action to set the username

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const backendHost = process.env.REACT_APP_BACKENDHOST;

    async function handleClick() {
        const url = `${backendHost}api/v1/auth/signin`
        console.log("kll:",url);
        try {
            const response = await axios.post(url, {
                email,
                password
            });

            if (response.status === 200) {
                console.log(response.data.token);

                localStorage.setItem("token", response.data.token);
                navigate("/dashboard");
            }
        } catch (error) {
            console.error("Login failed:", error);
        }
    }

    return (
        <div className="bg-slate-300 h-screen flex justify-center h-[91vh]">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                    <Heading label={"Sign in"} />
                    <SubHeading label={"Enter your credentials to access your account"} />
                    <InputBox
                        placeholder="email"
                        label={"email"}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <InputBox
                        placeholder="123456"
                        label={"Password"}
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className="pt-4">
                        <Button label={"Sign in"} clk={()=>handleClick()} />
                    </div>
                    <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/auth/signup"} />
                </div>
            </div>
        </div>
    );
}
