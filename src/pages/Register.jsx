import React, { useState, useEffect } from "react";
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    getAuth,
    updateProfile,
} from "firebase/auth";
import { auth } from "../firebase";
/* 「Link」をimport↓ */
import { Navigate, Link } from "react-router-dom";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase"


export const Register = () => {
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [registerName, setRegisterName] = useState("");


    const handleSubmit = async (e) => {
        e.preventDefault();

        const registerName = e.target[0].value;
        const registerEmail = e.target[1].value;
        const registerPassword = e.target[2].value;

        try {
            const res = await createUserWithEmailAndPassword(
                auth,
                registerEmail,
                registerPassword,
            );
            updateProfile(auth.currentUser, {
                displayName: registerName,
            });
            const docRef = doc(db, "users", res.user.uid);
            const docSnap = await getDoc(docRef);
            console.log(res)

                if (!docSnap.exists()) {
                    await setDoc(doc(db, "users", res.user.uid), {
                        name: res.user.displayName,
                        email: res.user.email,
                        uid:res.user.uid
                    });

                    await setDoc(doc(db,"user"))
                }
        } catch (error) {

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

    return (
        <>
            {user ? (
                <Navigate to={`/Mypage`} />
            ) : (
                <>
                    <h1>新規登録</h1>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="">ニックネーム</label>
                                <input className="rounded border border-gray-300 hover:border-indigo-500"
                                    type="displayName"
                                    name="displayName"
                                    value={registerName}
                                    onChange={(e) => setRegisterName(e.target.value)}/>
                        </div>
                        <div>
                            <label>メールアドレス</label>
                            <input className="rounded border border-gray-300 hover:border-indigo-500"
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
                        {/* ↓リンクを追加 */}
                        <p>ログインは<Link to={`/login/`}>こちら</Link></p>
                    </form>
                </>
            )}
        </>
    );
};

