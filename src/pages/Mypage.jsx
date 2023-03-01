import { useState, useEffect } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "../firebase"
import { useNavigate, Navigate } from "react-router-dom";

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
            {!loading && (
                <>
                    {!user ? (<Navigate to="/login" />)
                        : (<>
                            <h1>マイページ</h1>
                            <p>{user?.email}</p>
                            <button onClick={logout}>ログアウト</button>

                        </>)}
                </>)}
        </>)
}