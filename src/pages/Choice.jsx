import { Link, Navigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth"
import { auth } from "../firebase"
import { useForm } from 'react-hook-form';

import { useState, useEffect } from "react";
import { db } from "../firebase";
import { getDoc, collection, query, orderBy, onSnapshot, limit, getDocs, where, doc, runTransaction, documentId } from "firebase/firestore";
import { getExperimentalSetting } from "@firebase/util";



const input = "rounded border border-indigo-500"

// const idDocRef = collection(db, "stamptitle")

export const Choice = () => {

    const { register, handleSubmit, setValue } = useForm({
        shouldUnregister: false,
    });

    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);
    const [stamptitle, setStamptitle] = useState([]);
    const [genre, setGenre] = useState([""]);
    const [userinfo, setUserinfo] = useState([])
    const [info, setInfo] = useState(true)
    const [stampid, setStampid] = useState([])

    const onSubmit = async (data) => {

        const result = data.place
        console.log(result)
        const result2 = data.wayto
        // 都道府県と移動手段の検索結果を取得します
        // const docRef = collection(db, "archive")
        const qqlists = userinfo.map(obj => obj.stamprally.id)

        console.log(qqlists)


        // const docSnap = await getDoc(docRef)

        // console.log(docSnap.data())

        const q = query(collection(db, "stamptitle"),
            orderBy("timestamp", "desc"),
            where("region", "==", result), where("wayto", "==", result2),
        );


        onSnapshot(q, (documentSnapshot) => {
            console.log(documentSnapshot.docs);

            setStamptitle(documentSnapshot.docs.map((x) => ({ ...x.data(), id: x.id })));
            const stampid = stamptitle.map(obj => obj.id)
            setStampid(stampid)

        })
        console.log(stamptitle)
    }


    useEffect(() => {
        // console.log(user)
        const get = async () => {
            const qq = query(collection(db, "archives"), where("id", "==", user.uid))
            onSnapshot(qq, (documentSnapshot) => {
                setUserinfo(documentSnapshot.docs.map
                    ((x) => ({ ...x.data(), id: x.id })));

            });

            //     const qqlists = userinfo.map(obj => obj.id)
            // console.log(qqlists)
        }
        get(userinfo)
        // console.log(userinfo)


    }, [user])

    useEffect(() => {

        if (stamptitle.length === 0) {
            setGenre([""])
        } else {

            const get = async () => {


                const lists = stamptitle.map(obj => obj.id);

                const q2 = query(collection(db, "genreconnect"),
                    where("id", "in", lists),)


                onSnapshot(q2, (documentSnapshot2) => {
                    console.log(documentSnapshot2.docs);

                    setGenre(documentSnapshot2.docs.map((x) => ({ ...x.data(), id: x.id })))
                    console.log(genre)
                }
                )



            }

            get(genre)
        }

    }, [stamptitle]);

    useEffect(() => {
        console.log(genre);


    }, [genre]);
    // ここまででスタンプタイトルのデータを取得する





    const list2 = genre.map((x, i) => (

        <ul>
            <li key={i} className="border-b-2 border-dotted mx-2">{x.genre}</li>

        </ul>

    ))

    const list = stamptitle.map((x, i) => (

        <ul className="flex border-b-2 border-dotted" key={i}>
            <li className="text-indigo-700 mx-2">
                <Link to={`/playing/${x.id}`}>{x.title}</Link>
            </li>
            <li>{x.region}</li>

        </ul>

    ))



    // const isLogin = () => {
    //     onAuthStateChanged(auth,(currentUser) => {
    //         if (currentUser) {
    //             setUser(currentUser);
    //         } else {
    //             setUser("");
    //         }
    //     });
    // };
    // console.log(user)
    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);

        });

        // isLogin();
    }, []);

    // setLoading(false);
    //  useEffect(() => {

    //     }, [])

    // const list2 = genre.map((x, i) => (
    //     <tr key={i}>
    //         <td>{x.genre}</td>
    //     </tr>
    // ))

    // if (loading) {
    //     return <p>loading now...</p>;
    // }


    return (
        <>
            {!loading &&

                <>
                    {!user ? (<Navigate to="/login" />)
                        : (<>
                            <p className="m-2 bg-indigo-700 text-white border rounded-lg border-indigo-700 p-1 text-xl text-center">スタンプラリーを探す</p>
                        <div className="p-2 m-2 border-2 rounded border-indigo-500">
                            
                                <div>
                                  都道府県
                                   と
                                    移動手段
                                   を選んでください
                                </div>

                                <form action="" onSubmit={handleSubmit(onSubmit)} className="p-1">
                                    <div className="mb-2">
                                        <label htmlFor="" className="px-1">都道府県</label>
                                        <select className={input}  {...register("place", { required: true })}>
                                            <option value="" selected>都道府県</option>
                                            <option value="北海道">北海道</option>
                                            <option value="青森県">青森県</option>
                                            <option value="岩手県">岩手県</option>
                                            <option value="宮城県">宮城県</option>
                                            <option value="秋田県">秋田県</option>
                                            <option value="山形県">山形県</option>
                                            <option value="福島県">福島県</option>
                                            <option value="茨城県">茨城県</option>
                                            <option value="栃木県">栃木県</option>
                                            <option value="群馬県">群馬県</option>
                                            <option value="埼玉県">埼玉県</option>
                                            <option value="千葉県">千葉県</option>
                                            <option value="東京都">東京都</option>
                                            <option value="神奈川県">神奈川県</option>
                                            <option value="新潟県">新潟県</option>
                                            <option value="富山県">富山県</option>
                                            <option value="石川県">石川県</option>
                                            <option value="福井県">福井県</option>
                                            <option value="山梨県">山梨県</option>
                                            <option value="長野県">長野県</option>
                                            <option value="岐阜県">岐阜県</option>
                                            <option value="静岡県">静岡県</option>
                                            <option value="愛知県">愛知県</option>
                                            <option value="三重県">三重県</option>
                                            <option value="滋賀県">滋賀県</option>
                                            <option value="京都府">京都府</option>
                                            <option value="大阪府">大阪府</option>
                                            <option value="兵庫県">兵庫県</option>
                                            <option value="奈良県">奈良県</option>
                                            <option value="和歌山県">和歌山県</option>
                                            <option value="鳥取県">鳥取県</option>
                                            <option value="島根県">島根県</option>
                                            <option value="岡山県">岡山県</option>
                                            <option value="広島県">広島県</option>
                                            <option value="山口県">山口県</option>
                                            <option value="徳島県">徳島県</option>
                                            <option value="香川県">香川県</option>
                                            <option value="愛媛県">愛媛県</option>
                                            <option value="高知県">高知県</option>
                                            <option value="福岡県">福岡県</option>
                                            <option value="佐賀県">佐賀県</option>
                                            <option value="長崎県">長崎県</option>
                                            <option value="熊本県">熊本県</option>
                                            <option value="大分県">大分県</option>
                                            <option value="宮崎県">宮崎県</option>
                                            <option value="鹿児島県">鹿児島県</option>
                                            <option value="沖縄県">沖縄県</option>
                                        </select>
                                    </div>
                                    <div className="mb-2">
                                        <label htmlFor="" className="px-1">移動手段</label>
                                        <select name="" id="wayto" className={input}  {...register("wayto", { required: true })}>
                                            <option value="徒歩">徒歩</option>
                                            <option value="車">車</option>
                                            <option value="電車">電車orバス</option>
                                            <option value="自転車">自転車</option>

                                        </select>
                                    </div>
                                <div className="border-b-2 pb-2 border-indigo-300 border-dashed"><button className="rounded border border-indigo-500 bg-indigo-500 text-white p-1" >検索</button></div>
                                </form>
                                <div className="flex">
                                    <ul className="m-1 m-auto">行き先</ul>
                                    <ul className="m-1 m-auto">ジャンル</ul>
                                </div>
                                <div className="flex">
                                    <div className="mb-auto">
                                        {list}
                                    </div>
                                    <div className="mx-auto">
                                        {list2}
                                    </div>
                                </div>
                            </div>
                        </>)}
                </>}
        </>)
} 