import React, { useState, useEffect, ChangeEvent } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth"
import axios from "axios";
import { Navigate, Link } from "react-router-dom";
import { auth } from "../firebase";
import { db, storage } from "../firebase";
import { ref, getDownloadURL, uploadBytes, getStorage } from "firebase/storage";

import { collection, addDoc, serverTimestamp, setDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import Select from "react-select";
import genresJson from "../static/genres.json"
import GoogleMapReact from "google-map-react"

import { useForm } from 'react-hook-form';

const input = "rounded border border-gray-300 hover:border-indigo-500"



const genres = [
    { value: "1", label: "自然" },
    { value: "2", label: "歴史" },
    { value: "3", label: "アート" },
    { value: "3", label: "温泉" },
    { value: "4", label: "アクティビティ" },
    { value: "5", label: "ショッピング" },
    { value: "6", label: "グルメ" },
    { value: "7", label: "景色" },
    { value: "8", label: "夜遊び" },
];

export const Making = () => {

    const [user, setUser] = useState("");
    const [loading, setLoading] = useState(true);
    const [ok, setOk] = useState(false)
    const [geoLocation, setGeoLocation] = useState()
    const [geoLocation2, setGeoLocation2] = useState()
    const [selectGenre, setSelectGenre] = useState();
    const { register, handleSubmit } = useForm({
        shouldUnregister: false,
    });
    const [defaultLatLng, setDefaultLatLng] = useState()
    // const[success,setSuccess]=useState(false)



    const success = async (position) => {
        const { latitude, longitude } = position.coords;
        setGeoLocation({ latitude, longitude });
        setDefaultLatLng({
            lat: latitude,
            lng: longitude,
        });
        console.log(defaultLatLng)
    }

    const fail = (error) => console.log(error);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(success, fail);
        console.log("catch!")
    }, []);


    const [image, setImage] = useState();
    const handleChange = (e) => {
        setImage(e.target.files[0]);
    };


    // console.log(image);


    const onSubmit = async (data) => {


        //「国土地理院API」でキーワードから緯度・経度を含む住所情報を取得

        const url = `https://msearch.gsi.go.jp/address-search/AddressSearch?q=${data.address1}`
        const response = await axios.get(url);
        // const results = await response.json()
        console.log(response.data)
        const coordinates = response.data[0].geometry.coordinates
        // setGeoLocation([coordinates[1], coordinates[0]])

        // console.log(geoLocation[0])

        const url2 = `https://msearch.gsi.go.jp/address-search/AddressSearch?q=${data.address2}`
        const response2 = await axios.get(url2);
        // const results2 = await response2.json()

        console.log(response2.data)

        const coordinates2 = response2.data[0].geometry.coordinates
        // setGeoLocation2([coordinates2[1], coordinates2[0]])


        // console.log(geoLocation2[0])


        const imageRef = ref(storage, "image/" + image.name);

        uploadBytes(imageRef, image).then(
            (snapshot) => {
                console.log("Uploaded a file!");

            }
        );

        console.log(selectGenre)



        const stampref = collection(db, "stamptitle",)
        // await getDocs(stampref)

        // console.log(stampref.id)


        const stamptitle = await addDoc(collection(db, "stamptitle"), {
            region: data.region,
            title: data.title,
            wayto: data.wayto,
            timestamp: serverTimestamp(),

        })

        console.log(stamptitle)

        const stamptitleid = stamptitle.id
        await updateDoc(doc(stampref, stamptitleid), {
            id: stamptitleid
        })


        const stamprally1 = await setDoc(doc(db, "stamprally", stamptitle._key.path.segments[1]), {
            place1: data.place1,
            address1: data.address1,
            latitude1: coordinates[1],
            longitude1: coordinates[0],
            time1: data.time1,
            hint11: data.hint11,
            hint21: data.hint21,
            hint31: data.hint31,

            id: stamptitle._key.path.segments[1]
        })

        const stamprally2 = await setDoc(doc(db, "stamprally2", stamptitle._key.path.segments[1]), {
            place2: data.place2,
            address2: data.address2,
            latitude2: coordinates2[1],
            longitude2: coordinates2[0],
            time2: data.time2,
            hint12: data.hint12,
            hint22: data.hint22,
            hint32: data.hint32,
            id: stamptitle._key.path.segments[1]

        })



        const genreConnects = selectGenre.map(obj => obj.label)

        console.log(genreConnects)



        const genreconnect = await addDoc(collection(db, "genreconnect"), {
            timestamp: serverTimestamp(),

            genre: genreConnects,
            id: stamptitle._key.path.segments[1]
        }
        )

        console.log(genreconnect)


        // setLoading(false)
        // 

        alert("登録しました")
        setOk(true)

    }






    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);

        });
    }, []);

    // if (loading) {
    //     return <p>now loading...</p>
    // }

    if (ok) {
        return (<>
            <p>登録完了！</p>
            <div><Link to={`/mypage/`} className="hover:text-indigo-500">マイページへ戻る</Link>
            </div>
        </>)
    }
    return (
        <>
            {!loading &&
                <>
                    {!user ? (
                        <Navigate to="/login" />
                    ) : (
                        <>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <p className="m-2 bg-indigo-700 text-white border rounded-lg border-indigo-700  w-max p-1">スタンプラリーを作る</p>
                                <div className="m-2">
                                    <div >
                                        <label htmlFor="">スタンプラリータイトル(10文字以内)
                                            <input className={input}
                                                type="text"
                                                id="title"
                                                {...register('title', { required: true })}
                                                maxlength="10"
                                            />
                                        </label>
                                    </div>
                                    <div>
                                        <label htmlFor="">地域
                                            <select className={input}
                                                id="region"
                                                {...register('region', { required: true })}
                                            >
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
                                        </label>
                                    </div>
                                    <div>
                                        <label htmlFor="">移動手段
                                            <select className={input}
                                                id="wayto"
                                                {...register('wayto', { required: true })}
                                                type="text">
                                                <option value=""></option>
                                                <option value="徒歩">徒歩</option>
                                                <option value="車">車</option>
                                                <option value="電車">電車orバス</option>
                                                <option value="自転車">自転車</option>
                                            </select>
                                        </label>
                                    </div>
                                    <div>
                                        <label htmlFor="" >ジャンル</label>
                                        <Select className="w-max"
                                            options={genres}
                                            onChange={(value) => {
                                                value ? setSelectGenre([...value]) : null
                                            }}
                                            {...(e) => setSelectGenre(e.target.value)
                                            }

                                            isMulti
                                            // trueに
                                            id="genre"

                                        />

                                    </div>
                                </div>
                                <div className="m-2">
                                    <div className="mb-1 border rounded-lg border-indigo-700 w-max p-1">チェックポイント①</div>

                                    <div>
                                        <label htmlFor="">場所の名前
                                            <input className={input}
                                                type="text"
                                                id="place1"
                                                {...register('place1', { required: true })} />
                                        </label>
                                    </div>
                                    <div>
                                        <label htmlFor="">住所
                                            <input className={input}
                                                type="text"
                                                id="address1"
                                                {...register('address1', { required: true })}
                                            />
                                        </label>
                                    </div>
                                    <div>
                                        <label htmlFor="">行くといい時間帯
                                            <select className={input}
                                                type="text"
                                                id="time1"
                                                {...register('time1', { required: true })}>
                                                <option value=""></option>
                                                <option value="午前">午前</option>
                                                <option value="お昼">お昼</option>
                                                <option value="夕方">夕方</option>
                                                <option value="夜">夜</option>
                                            </select>
                                        </label>
                                    </div>

                                    <div>

                                        <label htmlFor="">写真
                                            <input type="file" onChange={handleChange} />

                                        </label>


                                    </div>
                                    <div>
                                        <label htmlFor="">ヒント①

                                            <input className={input}
                                                id="hint11"
                                                {...register('hint11', { required: true })}
                                                type="text" />
                                        </label>
                                    </div>
                                    <div>
                                        <label htmlFor="">ヒント②
                                            <input className={input}
                                                id="hint21"
                                                {...register('hint21', { required: true })}
                                                type="text" />
                                        </label>
                                    </div>
                                    <div>
                                        <label htmlFor="">ヒント③
                                            <input className={input}
                                                id="hint31"
                                                {...register('hint31', { required: true })}
                                                type="text" />
                                        </label>
                                    </div>
                                </div>
                                <div className="m-2">
                                    <div className="mb-1 border rounded-lg border-indigo-700 w-max p-1 ">チェックポイント②</div>                    <div>
                                        <label htmlFor="">場所の名前
                                            <input className={input}
                                                id="place2"
                                                {...register('place2', { required: true })}
                                                type="text" />
                                        </label>
                                    </div>
                                    <div>
                                        <label htmlFor="">住所
                                            <input className={input}
                                                id="address2"
                                                {...register('address2', { required: true })}
                                                type="text" />

                                        </label>
                                    </div>
                                    <div>
                                        <label htmlFor="">行くといい時間帯
                                            <select className={input}
                                                type="text"
                                                id="time2"
                                                {...register('time2', { required: true })}>
                                                <option value=""></option>
                                                <option value="午前">午前</option>
                                                <option value="お昼">お昼</option>
                                                <option value="夕方">夕方</option>
                                                <option value="夜">夜</option>
                                            </select>
                                        </label>
                                    </div>

                                    <div>
                                        <label htmlFor="">写真
                                            <input type="file" onChange={handleChange} />
                                        </label>
                                    </div>
                                    <div>
                                        <label htmlFor="">ヒント①
                                            <input className={input}
                                                id="hint1-2"
                                                {...register('hint12', { required: true })}

                                                type="text" />
                                        </label>
                                    </div>
                                    <div>
                                        <label htmlFor="">ヒント②
                                            <input className={input}
                                                id="hint22"
                                                {...register('hint22', { required: true })}

                                                type="text" />
                                        </label>
                                    </div>
                                    <div>
                                        <label htmlFor="">ヒント③
                                            <input className={input}
                                                id="hint32"
                                                {...register('hint32', { required: true })}

                                                type="text" />
                                        </label>
                                    </div>
                                </div>
                                <button type="submit" className="rounded border border-gray-300 hover:border-indigo-500" onClick>登録</button>
                            </form>
                            <Link to={`/mypage/`} className="hover:text-indigo-500">マイページへ戻る</Link>
                        </>)}

                </>}
        </>
    )
} 