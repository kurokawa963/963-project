import { useState } from "react"
// const [loginEmail, setLoginEmail] = useState("");
// const [loginPassword, setLoginPassword] = useState("");

export const Login = () => {

    return (
        <>
            <h1>ログインページ</h1>
            <form>
                <div>
                    <label>メールアドレス</label>
                    <input className="rounded border border-gray-300 hover:border-indigo-500"
                        name="email"
                        type="email"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}

                    />
                </div>
                <div>
                    <label>パスワード</label>
                    <input className="rounded border border-gray-300 hover:border-indigo-500"
                        name="password"
                        type="password"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                    />
                </div>
                <button>ログイン</button>
            </form>
        </>
    );
};

