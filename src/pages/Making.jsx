import React, { useState, useEffect, ChangeEvent } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth"
import axios from "axios";
import { Navigate, Link } from "react-router-dom";
import { auth } from "../firebase";
import { db, storage } from "../firebase";
import { ref, getDownloadURL, uploadBytes, getStorage } from "firebase/storage";
import { BeatLoader } from 'react-spinners';
import { collection, addDoc, serverTimestamp, setDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import Select from "react-select";
import genresJson from "../static/genres.json"
import GoogleMapReact from "google-map-react"
import {
    GoogleMap,
    LoadScript,
    InfoWindow,
Marker
} from "@react-google-maps/api";
import kallomate from "/img/kallomate.png"
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
    { value: "9", label: "文化" },
    { value: "10", label: "映え" }
];

const containerStyle = {
    width: "100%",
    height: "400px",
};
const customIcon = {
    url: kallomate,
    scaledSize: {
        width: 50,
        height: 50
    }
};

export const Making = () => {

    const [user, setUser] = useState("");
    const [isApiLoaded, setIsApiLoaded] = useState(false);
    const [loading, setLoading] = useState(true);
    const [subloading, setSubloading] = useState(true);
    const [regiloading, setRegiloading] = useState(false)
    const [ok, setOk] = useState(false)
    const [geoLocation, setGeoLocation] = useState()
    const [geoLocation2, setGeoLocation2] = useState()
    const [maplat1, setMaplat1] = useState()
    const [maplng1, setMaplng1] = useState()
    const [maplat2, setMaplat2] = useState()
    const [maplng2, setMaplng2] = useState()
    const [maplat3, setMaplat3] = useState()
    const [maplng3, setMaplng3] = useState()

    const [stamptitle, setStamptitle] = useState();
    const [selectGenre, setSelectGenre] = useState();
    const { register, handleSubmit, setValue, } = useForm({
        shouldUnregister: false,
    });
    const [defaultLatLng, setDefaultLatLng] = useState()

    const [map, setMap] = useState(null);
    const [map2, setMap2] = useState(null);
    const [map3, setMap3] = useState(null);

    const [maps, setMaps] = useState(null);
    const [maps2, setMaps2] = useState(null);
    const [maps3, setMaps3] = useState(null);


    const [marker1, setMarker1] = useState(null);
    const [marker2, setMarker2] = useState(null);
    const [marker3, setMarker3] = useState(null);

    // const[success,setSuccess]=useState(false)




    const success = (position) => {
        const { latitude, longitude } = position.coords;
        setGeoLocation({ latitude, longitude });
        setDefaultLatLng({
            lat: latitude,
            lng: longitude,
        });
        console.log(defaultLatLng)

        setSubloading(false)

    }

    const fail = (error) => console.log(error);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(success, fail);
        console.log("catch!")
    }, []);

    function handleMapClick1(event) {
        
            setMarker1({
                lat: event.latLng.lat(),
                lng: event.latLng.lng()
           
        })
    }

    function handleMapClick2(event) {

        setMarker2({
            lat: event.latLng.lat(),
            lng: event.latLng.lng()

        })
    }

    function handleMapClick3(event) {

        setMarker3({
            lat: event.latLng.lat(),
            lng: event.latLng.lng()

        })
    }

    const handleMapTypeChange = () => {
        const newMapTypeId =
            map.getMapTypeId() === 'roadmap'
                ? google.maps.MapTypeId.SATELLITE

                : google.maps.MapTypeId.ROADMAP;
        map.setMapTypeId(newMapTypeId);

    };


    const handleApiLoaded = (map, maps) => {
        setMap(map);
        setMaps(maps);

    };



    const setLatLng = ({ x, y, lat, lng, event }) => {
        console.log(lat);
        console.log(lng);
        setMaplat1(lat)
        setMaplng1(lng)
        setValue("latitude1", lat),
            setValue("longitude1", lng)

        // if (marker) {
        //     marker.setMap(null);
        // }
        const latLng = {
            lat,
            lng,
        };
        // setMarker(new maps.Marker({
        //     map,
        //     position: latLng,
        // }));
        map.panTo(latLng);

    };

    const handleApiLoaded2 = (map, maps) => {
        setMap2(map);
        setMaps2(maps);

    };
    const handleMapTypeChange2 = () => {
        const newMapTypeId2 =
            map2.getMapTypeId() === 'roadmap'
                ? google.maps.MapTypeId.SATELLITE
                : google.maps.MapTypeId.ROADMAP;
        map2.setMapTypeId(newMapTypeId2);
        // console.log(google)

    };

    const setLatLng2 = ({ x, y, lat, lng, event }) => {
        console.log(lat);
        console.log(lng);
        setMaplat2(lat)
        setMaplng2(lng)
        setValue("latitude2", lat),
            setValue("longitude2", lng)

        // if (marker2) {
        //     marker2.setMap2(null);
        // }
        const latLng2 = {
            lat,
            lng,
        };
        // setMarker2(new maps2.Marker2({
        //     map2,
        //     position: latLng2,
        // }));
        map2.panTo(latLng2);

    };

    const handleApiLoaded3 = (map, maps) => {
        setMap3(map);
        setMaps3(maps);

    };

    const handleMapTypeChange3 = () => {
        const newMapTypeId3 =
            map3.getMapTypeId() === 'roadmap'
                ? google.maps.MapTypeId.SATELLITE
                : google.maps.MapTypeId.ROADMAP;
        map3.setMapTypeId(newMapTypeId3);
        // console.log(google)

    };

    const setLatLng3 = ({ x, y, lat, lng, event }) => {
        console.log(lat);
        console.log(lng);
        setMaplat3(lat)
        setMaplng3(lng)
        setValue("latitude3", lat),
            setValue("longitude3", lng)

        // if (marker2) {
        //     marker2.setMap2(null);
        // }
        const latLng3 = {
            lat,
            lng,
        };
        // setMarker2(new maps2.Marker2({
        //     map2,
        //     position: latLng2,
        // }));
        map3.panTo(latLng3);

    };

    const [image, setImage] = useState();
    const [image2, setImage2] = useState();
    const [image3, setImage3] = useState();

    const [url, setUrl] = useState();

    const handleChange = (e) => {
        setImage(e.target.files[0]);

    };

    const handleChange2 = (e) => {
        setImage2(e.target.files[0]);
    };

    const handleChange3 = (e) => {
        setImage3(e.target.files[0]);
    };

    // console.log(image);

    //「国土地理院API」でキーワードから緯度・経度を含む住所情報を取得

    // const url = `https://msearch.gsi.go.jp/address-search/AddressSearch?q=${data.address1}`
    // const response = await axios.get(url);
    // // const results = await response.json()
    // console.log(response.data)
    // const coordinates = response.data[0].geometry.coordinates
    // setGeoLocation([coordinates[1], coordinates[0]])


    // console.log(geoLocation[0])

    // const url2 = `https://msearch.gsi.go.jp/address-search/AddressSearch?q=${data.address2}`
    // const response2 = await axios.get(url2);
    // // const results2 = await response2.json()

    // console.log(response2.data)

    // const coordinates2 = response2.data[0].geometry.coordinates
    // // setGeoLocation2([coordinates2[1], coordinates2[0]])


    // // console.log(geoLocation2[0])




    const onSubmit = async (data) => {

        setRegiloading(true)

        const genreConnects = selectGenre.map(obj => obj.label)

        const stampref = collection(db, "stamptitle",)
        // await getDocs(stampref)
        const imageRef = ref(storage, "image/" + image.name);

        // console.log(stampref.id)
        const snapshot = await uploadBytes(imageRef, image)


        const url = await getDownloadURL(imageRef)
        const stamptitle = await addDoc(collection(db, "stamptitle"), {
            url: url,
            genre: genreConnects,
            region: data.region,
            title: data.title,
            wayto: data.wayto,
            about: data.about,
            timestamp: serverTimestamp(),
        })



        // const stamptitle = await addDoc(collection(db, "stamptitle"), {

        // })


        const stamptitleid = stamptitle.id
        await updateDoc(doc(stampref, stamptitleid), {
            id: stamptitleid,

        })

        const stamprally = await setDoc(doc(db, "stamprally", stamptitleid), {

            url: url,
            place1: data.place1,
            // address2: data.address2,
            latitude1: marker1.lat,
            longitude1: marker1.lng,
            time1: data.time1,
            hint11: data.hint11,
            hint21: data.hint21,
            hint31: data.hint31,
            id: stamptitle._key.path.segments[1]


        })

        // const imageRef = ref(storage, "image/" + image.name);

        // await uploadBytes(imageRef, image).then(
        //     (snapshot) => {
        //         console.log("Uploaded a file!");
        //         getDownloadURL(imageRef).then((url) => {
        //             setDoc(doc(db, "stamprally", stamptitle.id), {
        //                 url: url,
        //                 place1: data.place1,
        //                 // address1: data.address1,
        //                 latitude1: maplat1,
        //                 longitude1: maplng1,
        //                 time1: data.time1,
        //                 hint11: data.hint11,
        //                 hint21: data.hint21,
        //                 hint31: data.hint31,

        //                 id: stamptitle._key.path.segments[1]
        //             }).then(() => {
        //                 console.log("Document successfully written!");

        //             }).catch((error) => {
        //                 console.error("Error writing document: ", error);
        //             });
        //         })
        //     }

        // );

        const imageRef2 = ref(storage, "image/" + image2.name);

        await uploadBytes(imageRef2, image2).then(
            (snapshot) => {
                console.log("Uploaded a file!");
                getDownloadURL(imageRef2).then((url) => {
                    setDoc(doc(db, "stamprally2", stamptitle.id), {
                        url: url,
                        place2: data.place2,
                        // address2: data.address2,
                        latitude2: marker2.lat,
                        longitude2: marker2.lng,
                        time2: data.time2,
                        hint12: data.hint12,
                        hint22: data.hint22,
                        hint32: data.hint32,
                        id: stamptitle._key.path.segments[1]


                    }).then(() => {
                        console.log("Document successfully written!");

                    }).catch((error) => {
                        console.error("Error writing document: ", error);
                    });
                })
            }

        );

        const imageRef3 = ref(storage, "image/" + image3.name);

        await uploadBytes(imageRef3, image3).then(
            (snapshot) => {
                console.log("Uploaded a file!");
                getDownloadURL(imageRef3).then((url) => {
                    setDoc(doc(db, "stamprally3", stamptitle.id), {
                        url: url,
                        place2: data.place3,
                        // address2: data.address2,
                        latitude2: marker3.lat,
                        longitude2: marker3.lng,
                        time2: data.time3,
                        hint12: data.hint13,
                        hint22: data.hint23,
                        hint32: data.hint33,
                        id: stamptitle._key.path.segments[1]


                    }).then(() => {
                        console.log("Document successfully written!");

                    }).catch((error) => {
                        console.error("Error writing document: ", error);
                    });
                })
            }

        );



        // console.log(selectGenre)





        // const stamprally1 = await setDoc(doc(db, "stamprally", stamptitle._key.path.segments[1]), {

        // })

        // const stamprally2 = await setDoc(doc(db, "stamprally2", stamptitle._key.path.segments[1]), {

        // })

        // console.log(genreConnects)

        // const genreconnect = await addDoc(collection(db, "genreconnect"), {
        //     timestamp: serverTimestamp(),


        //     id: stamptitle._key.path.segments[1]
        // }
        // )

        // console.log(genreconnect)


        // setLoading(false)
        // 

        // alert("登録しました")
        // setSubloading(false)

        setOk(true)

    }


    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            const script = document.createElement('script');
            script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_NEXT_PUBLIC_GOOGLE_MAP_KEY}&libraries=drawing`;
            script.onload = () => setIsApiLoaded(true);
            document.body.appendChild(script);


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

    if (subloading) {
        return <>
            <div className="text-center m-5">
                <BeatLoader color={'#123abc'} loading={true} timeout={3000} />
                <p>loading</p>
            </div>

        </>
    }
    if (regiloading) {
        return <>
            <div className="text-center m-5">
                <BeatLoader color={'#123abc'} loading={true} timeout={3000} />
                <p>登録中です。しばらくお待ちください。</p>

            </div>
        </>
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
                                <p className="m-2 bg-indigo-700 text-white border rounded-lg border-indigo-700 p-1 text-xl text-center">スタンプラリーを作る</p>
                                <div className="p-2 mb-6 mx-2 border-2 rounded border-indigo-500">

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
                                            <label htmlFor="">主要地域
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
                                        <div>具体的な場所
                                            <div>例：大阪環状線沿線、奈良県北西部</div>
                                            <div><input type="text" className={input}
                                                id="about"
                                                {...register('about', { required: true })}
                                            /></div>

                                        </div>
                                        <div>
                                            <label htmlFor="">移動手段
                                                <select className={input}
                                                    id="wayto"
                                                    {...register('wayto', { required: true })}
                                                    type="text">
                                                    <option value="徒歩">徒歩</option>
                                                    <option value="車">車</option>
                                                    <option value="電車">電車orバス</option>
                                                    <option value="自転車">自転車</option>
                                                    <option value="飛行機">飛行機</option>
                                                    <option value="船">船</option>
                                                </select>
                                            </label>
                                        </div>
                                        <div>
                                            <label htmlFor="" >ジャンル</label>
                                            <Select
                                                options={genres}
                                                onChange={(value) => {
                                                    value ? setSelectGenre([...value]) : null
                                                }}
                                                {...(e) => setSelectGenre(e.target.value)
                                                }
                                                styles={{ menu: (styles) => ({ ...styles, maxHeight: '500px' }) }}
                                                isMulti
                                                // trueに
                                                id="genre"

                                            />
                                            ※複数選択可
                                        </div>
                                    </div>
                                </div>
                                <div className="">
                                    <div className="m-2 border rounded-lg border-indigo-700 text-center p-1">チェックポイント①</div>
                                    <div className="p-2 mb-6 mx-2 border rounded border-indigo-500 ">

                                        <div>
                                            <label htmlFor="">場所の名前
                                                <input className={input}
                                                    type="text"
                                                    id="place1"
                                                    {...register('place1', { required: true })} />
                                            </label>
                                        </div>

                                        <div>

                                            <label htmlFor="">写真
                                                <input type="file" onChange={handleChange}
                                                // {...register('photo1', { required: true })}
                                                />

                                            </label>


                                        </div>

                                        <div>
                                            <div>撮影場所（チェックポイント）</div>
                                            <div>地図をタップして撮影場所にマーカーを付けてください</div>
                                            <div>マーカーのついた場所がチェックポイントになります</div>
                                            <div>マップ右上のボタンを押すと全画面表示にできます</div>

                                            <div>
                                            </div>
                                            <div>
                                               {/* {isApiLoaded && (
                                                     <GoogleMapReact
                                                        bootstrapURLKeys={{
                                                            key: import.meta.env.VITE_NEXT_PUBLIC_GOOGLE_MAP_KEY,
                                                            libraries: 'drawing',
                                                            options: {
                                                                mapTypeId: google.maps.MapTypeId.SATELLITE,

                                                            },
                                                        }}
                                                        defaultCenter={defaultLatLng}
                                                        defaultZoom={7}
                                                        onClick={setLatLng}
                                                        onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
                                                        yesIWantToUseGoogleMapApiInternals
                                                    >

                                                        <Marker lat={maplat1} lng={maplng1}
                                                            icon={{
                                                                url: kallomate,
                                                                // scaledSize: new window.google.maps.Size(10,10),
                                                                scaledSize: { width: 10, height: 10 }
                                                            }} />

                                                    </GoogleMapReact>
 )}  */}
                                                {isApiLoaded && (
                                                    
                                                 
                                                    <GoogleMap center={defaultLatLng} zoom={7}
                                                        mapContainerStyle={containerStyle}
                                                        onClick={handleMapClick1}
                                                        >
                                                        {marker1 && (
                                                            <Marker position={marker1}
                                                                icon={customIcon}
                                                            />
                                                        )}

                                                        </GoogleMap>
                                                 
                                                )}
                                            </div>
                                            {/* <div onClick={handleMapTypeChange} className="border w-max p-1 m-1 border-black bg-gray-200">航空写真に切り替え</div> */}

                                        </div>
                                        <div>
                                            <input type="text" disabled={true} {...register("latitude1", { required: true })} />
                                            <input type="text" disabled={true} {...register("longitude1", { required: true })} />
                                        </div>
                                        {/* <div>
                                        <label htmlFor="">住所
                                            <input className={input}
                                                type="text"
                                                id="address1"
                                                {...register('address1', { required: true })}
                                            />
                                        </label>
                                                </div>*/}
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

                                        <div>ヒントを考えてください</div>
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
                                </div>
                                <div className="">
                                    <div className="m-2 border rounded-lg border-indigo-700 text-center p-1">チェックポイント②</div>
                                    <div className="p-2 m-2 border rounded border-indigo-500">
                                        <div>
                                            <label htmlFor="">場所の名前
                                                <input className={input}
                                                    id="place2"
                                                    {...register('place2', { required: true })}
                                                    type="text" />
                                            </label>
                                        </div>
                                        <div>
                                            <label htmlFor="">写真
                                                <input type="file" onChange={handleChange2}
                                                // {...register('photo2', { required: true })}

                                                />
                                            </label>
                                        </div>
                                        <div>
                                            {/* <label htmlFor="">住所
                                            <input className={input}
                                                id="address2"
                                                {...register('address2', { required: true })}
                                                type="text" />

                                        </label> */}
                                        </div>
                                        <div>
                                            <div>撮影場所（チェックポイント）</div>
                                            <div>地図をタップして撮影場所にマーカーを付けてください</div>
                                            <div>マーカーのついた場所がチェックポイントになります</div>
                                            <div>マップ右上のボタンを押すと全画面表示にできます</div>

                                            <div>
                                                {isApiLoaded && (


                                                    <GoogleMap center={defaultLatLng} zoom={7}
                                                        mapContainerStyle={containerStyle}
                                                        onClick={handleMapClick2}
                                                    >
                                                        {marker2 && (
                                                            <Marker position={marker2}
                                                                icon={customIcon}
                                                            />
                                                        )}

                                                    </GoogleMap>

                                                )}
                                            </div>
                                            {/* <div onClick={handleMapTypeChange2} className="border w-max p-1 m-1 border-black bg-gray-200">航空写真に切り替え</div> */}
                                        </div>
                                        <div>
                                            <input type="text" disabled={true} {...register("latitude2", { required: true })} />
                                            <input type="text" disabled={true} {...register("longitude2", { required: true })} />
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
                                </div>
                                <div className="">
                                    <div className="m-2 border rounded-lg border-indigo-700 text-center p-1">チェックポイント③</div>
                                    <div className="p-2 m-2 border rounded border-indigo-500">
                                        <div>
                                            <label htmlFor="">場所の名前
                                                <input className={input}
                                                    id="place2"
                                                    {...register('place3', { required: true })}
                                                    type="text" />
                                            </label>
                                        </div>
                                        <div>
                                            <label htmlFor="">写真
                                                <input type="file" onChange={handleChange3}
                                                // {...register('photo3', { required: true })}

                                                />
                                            </label>
                                        </div>
                                        <div>
                                            {/* <label htmlFor="">住所
                                            <input className={input}
                                                id="address2"
                                                {...register('address2', { required: true })}
                                                type="text" />

                                        </label> */}
                                        </div>
                                        <div>
                                            <div>撮影場所（チェックポイント）</div>
                                            <div>地図をタップして撮影場所にマーカーを付けてください</div>
                                            <div>マーカーのついた場所がチェックポイントになります</div>

                                            <div>
                                                {isApiLoaded && (


                                                    <GoogleMap center={defaultLatLng} zoom={7}
                                                        mapContainerStyle={containerStyle}
                                                        onClick={handleMapClick3}
                                                    >
                                                        {marker3 && (
                                                            <Marker position={marker3}
                                                                icon={customIcon}
                                                            />
                                                        )}

                                                    </GoogleMap>

                                                )}
                                            </div>
                                            {/* <div onClick={handleMapTypeChange3} className="border w-max p-1 m-1 border-black bg-gray-200">航空写真に切り替え</div> */}
                                        </div>
                                        <div>
                                            <input type="text" disabled={true} {...register("latitude3", { required: true })} />
                                            <input type="text" disabled={true} {...register("longitude3", { required: true })} />
                                        </div>
                                        <div>
                                            <label htmlFor="">行くといい時間帯
                                                <select className={input}
                                                    type="text"
                                                    id="time3"
                                                    {...register('time3', { required: true })}>
                                                    <option value=""></option>
                                                    <option value="午前">午前</option>
                                                    <option value="お昼">お昼</option>
                                                    <option value="夕方">夕方</option>
                                                    <option value="夜">夜</option>
                                                </select>
                                            </label>
                                        </div>


                                        <div>
                                            <label htmlFor="">ヒント①
                                                <input className={input}
                                                    id="hint1-3"
                                                    {...register('hint13', { required: true })}

                                                    type="text" />
                                            </label>
                                        </div>
                                        <div>
                                            <label htmlFor="">ヒント②
                                                <input className={input}
                                                    id="hint2-3"
                                                    {...register('hint23', { required: true })}

                                                    type="text" />
                                            </label>
                                        </div>
                                        <div>
                                            <label htmlFor="">ヒント③
                                                <input className={input}
                                                    id="hint3-3"
                                                    {...register('hint33', { required: true })}

                                                    type="text" />
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <button type="submit" className="border border-indigo-500 rounded p-1 m-1 bg-indigo-500 text-white ">登録</button>
                                </div>
                            </form>
                            <div className="m-2">
                                <div>登録完了画面に変わるまで数秒かかることがあります。</div>
                                <div className="pb-5 border-b-2 border-indigo-600 border-dotted ">登録ボタンは２回押さないでください！！</div>
                            </div>
                            <div className="flex-end ml-auto mr-2 w-max mb-3 border-b-2 border-indigo-500">
                                <Link to={`/mypage/`} className="hover:text-indigo-500 ">マイページへ戻る</Link>
                            </div>
                        </>)}

                </>}
        </>
    )
}

// const Marker = ({ text }) => (
//     <div className="text-indigo-500 text-4xl  p-2" style={{ position: 'absolute', transform: 'translate(-50%, -50%)' }}>
//         <i className="fas fa-map-marker-alt fa-2x"></i>
//         <p style={{ margin: '0'}}>{text}</p>
//     </div>
// );
// const Marker2 = ({ icon, ...props }) => (
//     <div style={{ position: 'absolute', transform: 'translate(-50%, -50%)' }}>
//         <img src={icon.url} alt="marker" style={{ width: 50, height: 50 }} />
//     </div>
// );