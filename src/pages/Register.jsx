import { useState, useEffect } from "react"
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { Navigate } from "react-router-dom";

export const Register = () => {

    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await createUserWithEmailAndPassword(
                auth,
                registerEmail,
                registerPassword
            );
        } catch (error) {
            console.log(auth)
            console.log(registerEmail)
            console.log(registerPassword)
            alert("正しく入力してください");
        }
    };

    const [user, setUser] = useState("");

    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
    }, []);
    // ユーザー判定は一回だけでいいのでuseEffect


    return (
        <>
            {/* userに値が入っていればMypageへ */}
            {user ? (<Navigate to="/mypage" />) :
                (
                    <>
                        {/* userに値が入っていなければユーザー登録へ */}
                        <h1>新規登録</h1>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label>メールアドレス</label>
                                <input className=" rounded border border-gray-300 hover:border-indigo-500"
                                    name="email"
                                    type="email"
                                    value={registerEmail}
                                    onChange={(e) => setRegisterEmail(e.target.value)}
                                />
                            </div>
                            <div>
                                <label>パスワード</label>
                                <input className="rounded border border-gray-300 hover:border-indigo-500"
                                    name="password"
                                    type="password"
                                    value={registerPassword}
                                    onChange={(e) => setRegisterPassword(e.target.value)}
                                />
                            </div>
                            <button>登録する</button>
                        </form>
                    </>)
            }</>
    );
};

