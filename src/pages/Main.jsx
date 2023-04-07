import { useState, useEffect } from "react"
import { onAuthStateChanged, signOut } from "firebase/auth"
import { auth } from "../firebase"
import { useNavigate, Navigate, Link } from "react-router-dom";


export const Main = () => {

    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
    }, []);

    return (
        <>
            {!loading &&
            <>
            {user?( 
            <>
            <p className="rounded-lg bg-indigo-500 text-white ml-2 mt-3 mb-1 border-indigo-500 w-max p-1">皆さん、家事や学業、そしてお仕事、、<br />毎日本当にお疲れ様です。</p>
            <div className="rounded-lg bg-indigo-400 border-indigo-400 text-white mr-2 ml-auto mt-2 w-max p-1 flex-end ">
                <p>そんなあなたに必要なのは癒しですか？</p>
                <p>それとも、さらに刺激的な毎日ですか？</p>
            </div>
                <p className="mt-2 text-center">あなたの疲れも吹き飛ぶ体験を共有しよう！</p>
                </>
          )
            :(<>
            <p className="rounded-lg bg-indigo-500 text-white ml-2 mt-3 mb-1 border-indigo-500 w-max p-1">皆さん、家事や学業、そしてお仕事、、<br />毎日本当にお疲れ様です。</p>
            <div className="rounded-lg bg-indigo-400 border-indigo-400 text-white mr-2 ml-auto mt-2 w-max p-1 flex-end ">
                <p>そんなあなたに必要なのは癒しですか？</p>
                <p>それとも、さらに刺激的な毎日ですか？</p>
            </div>
            <p className="mt-2 text-center">あなたの疲れも吹き飛ぶ体験を共有しよう！</p>
          
                <p className="m-2 text-center">

                    <Link to="/Register" className="border-b-2 p-1 border-indigo-500 text-b shadow-lg font-semibold">まずは新規登録！</Link>
                </p>
           </>
)}
        </>
        }</>
    );
};