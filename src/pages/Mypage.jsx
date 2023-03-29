import { useState, useEffect } from "react"
import { onAuthStateChanged, signOut } from "firebase/auth"
import { auth } from "../firebase"
import { useNavigate, Navigate, Link } from "react-router-dom";
// import { Choice } from "./pages/Choice";
// import { Making } from "./pages/Making";

const button ="mb-2 p-1 border rounded-lg w-max hover:text-gray-600 hover:border-gray-500"


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
        navigate("/login");
    }

    return (
        <>
            {!loading && 
                <>
                    {!user ? (<Navigate to="/login" />)
                        : (<>
                            <h1>マイページ</h1>
                            <p className="pb-5">こんにちは、{user?.displayName}さん</p>
                        <div className={button}> <Link to={`/choice/`} >スタンプラリーで遊ぶ</Link></div>    
                       <div className={button}>       <Link to={`/making/`}>スタンプラリー作成</Link></div>
                     
                        <button className="p-1 border rounded-lg hover:border-gray-500" onClick={logout}>ログアウト</button>

                        </>)}
                </>}
        </>)
}