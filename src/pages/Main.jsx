import { useState, useEffect } from "react"
import { onAuthStateChanged, signOut } from "firebase/auth"
import { auth } from "../firebase"
import { useNavigate, Navigate, Link } from "react-router-dom";


export const Main = () => {

    

    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
    }, []);

    return (
        <>
            {/* <h1 className="text-center text-2xl ">過労☆メイトへようこそ</h1> */}
            <p className="ml-2 mt-1 mb-1 border w-max p-1">皆さん、家事や学業、そしてお仕事、、<br/>本当に毎日お疲れ様です。</p>
            <div className="border mr-2 ml-auto w-max p-1 flex-end">
                <p>そんなあなたに必要なのは癒しですか？</p>
            <p>それとも、さらに刺激的な毎日ですか？</p>
            </div>
            <p className="mt-2 text-center">あなたの疲れも吹き飛ぶ体験を共有しよう！</p>
            <p className="mt-2 text-center">
                <Link to="/login">まずは新規登録！</Link>
                </p>
        
        </>
    );
};