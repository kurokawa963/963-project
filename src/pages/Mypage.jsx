import { useState, useEffect } from "react"
import { onAuthStateChanged, signOut } from "firebase/auth"
import { auth } from "../firebase"
import { useNavigate, Navigate, Link } from "react-router-dom";
// import { Choice } from "./pages/Choice";
// import { Making } from "./pages/Making";



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
                            <p>こんにちは{user?.displayName}</p>
                            <Link to={`/choice/`}>スタンプラリーで遊ぶ</Link>
                            <Link to={`/making/`}>スタンプラリー作成</Link>
                            <button onClick={logout}>ログアウト</button>

                        </>)}
                </>}
        </>)
}