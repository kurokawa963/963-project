import { Link } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth"
import { auth } from "../firebase"
import { useForm } from 'react-hook-form';

import { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, query, orderBy, onSnapshot, limit, getDoc, where, doc, runTransaction } from "firebase/firestore";
import { getExperimentalSetting } from "@firebase/util";



const input = "rounded border border-gray-300 hover:border-indigo-500"

const idDocRef = collection(db, "stamptitle")

export const Choice = () => {

    const { register, handleSubmit, setValue } = useForm({
        shouldUnregister: false,
    });

    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);
    const [stamptitle, setStamptitle] = useState([]);
    const [genre, setGenre] = useState([]);

    const onSubmit = async (data) => {

        const result = data.place
        console.log(result)
        const result2 = data.wayto


        // const genrearray = collection(db, "users", user.uid)

        //     console.log(genrearray)


        const q = query(collection(db, "stamptitle")

            , where("region", "==", result), where("wayto", "==", result2)
        );

     

        onSnapshot(q, (documentSnapshot) => {
            console.log(documentSnapshot.docs);

            setStamptitle(documentSnapshot.docs.map((x) => ({ ...x.data(), id: x.id })));
    
        });

        // ここまででスタンプタイトルのデータを取得する

  for (let i = 0; i < stamptitle.length; i++) {
            const titleconnect = stamptitle[i].id
// スタンプタイトルのidを取得する
      
            console.log(titleconnect)
            const q2 = query(collection(db, "genreconnect"), where("id", "==", titleconnect))
// スタンプタイトルコレクションのidとジャンルコネクトのdocの中のidが同じとき出現させる
            onSnapshot(q2, (documentSnapshot2) => {
                console.log(documentSnapshot2.docs);

                setGenre(documentSnapshot2.docs.map((x) => ({ ...x.data(), id: x.id })))


            }
            )



        }
  


    }
    const list2 = genre.map((x, i) => (
        <tr key={i}>
            <td>{x.genre}</td>
        </tr>
    ))
    const list = stamptitle.map((x, i) => (
        <tr key={i}>
            <td>
                {x.title}
            </td>
            <td>{list2}</td>
            <td>{x.region}</td>
        </tr>

    ))





    // setLoading(false);



    // const list = 






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
            <p>スタンプラリーを探す</p>
            <form action="" onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="">都道府県</label>
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
                <label htmlFor="">移動手段</label>
                <select name="" id="wayto" className={input}  {...register("wayto", { required: true })}>
                    <option value=""></option>
                    <option value="徒歩">徒歩</option>
                    <option value="車">車</option>
                    <option value="電車">電車orバス</option>
                    <option value="自転車">自転車</option>

                </select>
                <div><button className={input}>検索</button></div>
            </form>
            <table>
                <tbody>
                    {list}

                </tbody>
            </table>
        </>
    )
} 