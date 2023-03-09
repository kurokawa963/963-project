import React, { useState, useEffect, ChangeEvent } from "react";
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    getAuth,
    updateProfile,
} from "firebase/auth";
import { auth } from "../firebase";
/* 「Link」をimport↓ */
import { Navigate, Link } from "react-router-dom";
import { doc, setDoc, getDoc, addDoc } from "firebase/firestore";
import { db } from "../firebase"
import axios from "axios";
import Select from "react-select";
import { useForm } from 'react-hook-form';



const genres = [
    { value: "nature", label: "自然" },
    { value: "history", label: "歴史" },
    { value: "art", label: "アート" },
    { value: "hotspring", label: "温泉" },
    { value: "activity", label: "アクティビティ" },
    { value: "shopping", label: "ショッピング" },
    { value: "food", label: "グルメ" },
    { value: "landscape", label: "景色" },
    { value: "night", label: "夜遊び" },
];


export const Register = () => {


    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [registerName, setRegisterName] = useState("");
    // const [genre, setGenre] = useState("");
    // const [email, setEmail] = useState("");

  const [selectGenre, setSelectGenre] = useState(genres[0]);

    const { register, handleSubmit, setValue } = useForm({
        shouldUnregister: false,
    });

    // const onSubmit2 = async (data) => {
    //     console.log(data);
    //     const result = await setDoc(doc(db, "users", res.user.uid), {
    //         genre: data.genre
    //     })
    // }

    const onSubmit = async (e) => {
        e.preventDefault();


        try {
            const res = await createUserWithEmailAndPassword(
                auth,
                registerEmail,
                registerPassword,
            );
            await updateProfile(auth.currentUser, {
                displayName: registerName,
            });
            
            const docRef = doc(db, "users", res.user.uid);
            const docSnap = await getDoc(docRef);
            console.log(res)

            // firebaseに値を入れる
            if (!docSnap.exists()) {
                await setDoc(doc(db, "users", res.user.uid), {
                    name: res.user.displayName,
                    email: res.user.email,
                    uid: res.user.uid,
                    genre:selectGenre
                });

                // await setDoc(doc(db, "user"))
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

    const [prefecture, setPrefecture] = useState("");
    const [city, setCity] = useState("");
    const [town, setTown] = useState("");

    const handleChange = async (e) => {
        const res = await axios.get('https://api.zipaddress.net/?zipcode=' + e.target.value);
        console.log(res);
        if (res.data.code === 200) {
            setPrefecture(res.data.data.pref);
            setCity(res.data.data.city);
            setTown(res.data.data.town);
        }
    }

  
    const [date, setDate] = useState("2000-01-01");
    const onChangeDate = (e) => {

        let input = e.target.value;
        let y = parseInt(input.split("-")[0]);
        let m = parseInt(input.split("-")[1]);

        // 生年月日を更新
        setDate(input);
    }



    return (
        <>
            {user ? (
                <Navigate to={`/Mypage`} />
            ) : (
                <>
                    <h1>新規登録</h1>
                    <form onSubmit={onSubmit}>
                        <div>
                            <label htmlFor="">ニックネーム</label>
                            <input className="rounded border border-gray-300 hover:border-indigo-500"
                                type="displayName"
                                name="displayName"
                                value={registerName}
                                onChange={(e) => setRegisterName(e.target.value)} />
                        </div>
                        <div>
                            <label htmlFor="">性別
                                <select name="" id="gender" className="rounded border border-gray-300 hover:border-indigo-500" >
                                    <option value="0"></option>
                                    <option value="1">男</option>
                                    <option value="2">女</option>
                                </select>
                            </label>
                        </div>
                        <div>
                            <label htmlFor="">住所</label>
                            <p>郵便番号を入力してください</p>
                            〒<input className="rounded border border-gray-300 hover:border-indigo-500"
                                type="text" onChange={handleChange} id="post" />
                        </div>
                        <div>
                            <label htmlFor="prefecture" className="form-label">都道府県</label>
                            <input type="text" className="form-control" value={prefecture} disabled={true} />
                        </div>
                        <div>
                            <label htmlFor="city" className="form-label">市町村</label>
                            <input type="text" className="form-control" value={city} disabled={true} />
                        </div>
                        <div>
                            <label htmlFor="town" className="form-label">町名</label>
                            <input type="text" className="form-control" value={town} disabled={true} />
                        </div>

                        <div>
                            <label htmlFor="">よく行くジャンル</label>
                                <Select
                                    options={genres}
                                    onChange={(value) => {
                                        value ? setSelectGenre([...value]) : null
                                    }} {...(e) => setSelectGenre(e.target.value) 
                                    }
                                isMulti

                                // trueに
                                id="genre"
                            />
                        </div>
                        <div>
                            <label htmlFor="">生年月日</label>
                            <input type="date" value={date} min="1900-01-01" max="2050-12-31" onChange={(e) => onChangeDate(e)}
                                id="birth"
                            />
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

