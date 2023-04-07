import { useState, useEffect } from "react"
import { onAuthStateChanged, signOut } from "firebase/auth"
import { auth } from "../firebase"
import { useNavigate, Navigate, Link } from "react-router-dom";
// import { Choice } from "./pages/Choice";
// import { Making } from "./pages/Making";

const button = "mb-2 p-1 border border-indigo-500 rounded-lg w-max hover:text-gray-600 hover:border-gray-500"


export const Mypage = () => {
    const [user, setUser] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
    }, []);

    const navigate = useNavigate();

    const logout = async () => {
        await signOut(auth);
        navigate("/");
    }

    return (
        <>
            {!loading &&
                <>
                    {!user ? (<Navigate to="/login" />)
                        : (<>
                            <h1 className="m-2 bg-indigo-700 text-white border rounded-lg border-indigo-700 p-1 text-xl text-center">マイページ</h1>
                                                            <div className="p-2 m-2 border-2 rounded border-indigo-500">

                            <p className="pb-5">こんにちは、{user?.displayName}さん</p>
                                <div className={button}> <Link to={`/choice/`} >スタンプラリーで遊ぶ</Link></div>
                            <div className={button}>       <Link to={`/making/`}>スタンプラリー作成</Link></div>
                            <div className={button}><Link to={`/archives/${user.uid}`}>旅の記録</Link></div>
                            <div className="ml-auto mr-2 w-max flex-end">
                                    <button className="p-1 mt-3 border border-indigo-200 bg-indigo-200 text-white rounded-lg hover:border-gray-500 " onClick={logout}>ログアウト</button>
                                </div>
                            </div>
                        </>)}
                </>}
        </>)
}