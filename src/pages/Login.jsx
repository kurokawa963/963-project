import { useState, useEffect } from "react"
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { Navigate } from "react-router-dom";


export const Login = () => {
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await signInWithEmailAndPassword(
                auth,
                loginEmail,
                loginPassword
            );
        } catch (error) {
            alert("メールアドレスまたはパスワードが間違っています");
        }
    };

    const [user, setUser] = useState();

    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
    });

    return (
        <>
            {user ? (
                <Navigate to="/mypage" />
            ) : (
                <>
                    <div className="p-2 m-2 border-2 rounded border-indigo-500">
                        {/* <h1 className="text-indigo-500">ログイン</h1> */}
                        <form onSubmit={handleSubmit}>
                            <div className="m-1">
                                <label>メールアドレス</label>
                                <div>
                                    <input className="rounded border border-gray-300 hover:border-indigo-500"
                                        name="email"
                                        type="email"
                                        value={loginEmail}
                                        onChange={(e) => setLoginEmail(e.target.value)}

                                    /></div>

                            </div>
                            <div className="m-1">
                                <label>パスワード</label>
                                <div> <input className="rounded border border-gray-300 hover:border-indigo-500"
                                    name="password"
                                    type="password"
                                    value={loginPassword}
                                    onChange={(e) => setLoginPassword(e.target.value)}
                                /></div>

                            </div>
                            <button className="border border-indigo-500 rounded p-1 m-1 bg-indigo-500 text-white">ログイン</button>
                        </form>
                    </div>

                </>)}
        </>
    );
};

