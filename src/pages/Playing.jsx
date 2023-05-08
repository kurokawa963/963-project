import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, Navigate, Link } from "react-router-dom";
// useParamsでidを取ってくる
import { db } from "../firebase";
import { auth } from "../firebase"
import { BeatLoader } from 'react-spinners';

import { onAuthStateChanged, signOut } from "firebase/auth"


import { doc, getDoc, setDoc, serverTimestamp, addDoc, collection } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
const button = "rounded border border-indigo-300 p-1 my-1"
const tf = "hidden"





export const Playing = () => {
    const [user, setUser] = useState("");
    const [checkpoint, setCheckpoint] = useState(3)
    const [loading, setLoading] = useState(true);
    const [geoLocation, setGeoLocation] = useState(null);
    // const [checklat, setChecklat] = useState();
    // const [checklan, setChecklan] = useState();
    const [correct1, setCorrect1] = useState(false);
    const [correct2, setCorrect2] = useState(false);
    const [correct3, setCorrect3] = useState(false);


    const [lat1, setLat1] = useState();
    const [lon1, setLon1] = useState();
    const [lat2, setLat2] = useState();
    const [lon2, setLon2] = useState();
    const [lat3, setLat3] = useState();
    const [lon3, setLon3] = useState();


    const [stamprally, setStamprally] = useState(null);
    const [stamprally2, setStamprally2] = useState(null);
    const [stamprally3, setStamprally3] = useState(null);

    const [submit, setSubmit] = useState();
    const [tf, setTf] = useState();
    const [tf2, setTf2] = useState();
    const [tf3, setTf3] = useState();

    const [count, setCount] = useState(0);
    // ↑useEffectの中身を無理やり作動させるやつ
    const { id } = useParams();

    //   setLat(geoLocation.latitude)
    //   setLon(geoLocation.longitude)

    // console.log(stamprally.latitude1)
    // console.log(lat)
    // 
    // useEffect(() => {

    // }, []);




    // const success=



    useEffect(() => {

        onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);

        }, []);

        const docRef = doc(db, "stamprally", id);

        getDoc(docRef).then((documentSnapshot) => {

            setStamprally({ ...documentSnapshot.data(), id: documentSnapshot.id });
            setCount((prevCount) => prevCount + 1);
            // setLoading(false);
        });
        //  setChecklat(stamprally.latitude1),
        //     setChecklan(stamprally.longitude1)

    }, []);

    useEffect(() => {
        const docRef2 = doc(db, "stamprally2", id);
        getDoc(docRef2).then((documentSnapshot2) => {
            console.log(documentSnapshot2);
            setStamprally2({ ...documentSnapshot2.data(), id: documentSnapshot2.id });


        })

    }, [])
    useEffect(() => {
        const docRef3 = doc(db, "stamprally3", id);
        getDoc(docRef3).then((documentSnapshot3) => {
            console.log(documentSnapshot3);
            setStamprally3({ ...documentSnapshot3.data(), id: documentSnapshot3.id });

            setLoading(false);

        })

    }, [])

    // const fail = (error) => console.log(error);
    // const options = { enableHighAccuracy: true, timeout: 20000, maximumAge: 0 }

    // useEffect(() => {
    //     const navigate = navigator.geolocation.watchPosition(success, fail, options);
    //     // setLoading(false);
    // });
    // useEffect(() => {
    //     navigator.geolocation.watchPosition(position => {
    //         const { latitude, longitude } = position.coords;
    //         setGeoLocation({ latitude, longitude });
    //     });

    // }, [])

    // console.log(geoLocation.latitude)
    //             console.log(geoLocation.longitude)
    const getCurrentPosition1 = async () => {
        setCount((prevCount) => prevCount + 1);
        if (geoLocation) {
            // navigator.geolocation.watchPosition(success, fail, options);

            // console.log(stamprally.latitude1)
            // console.log(lat)
            // 
            // console.log(geoLocation)
            // const lat = (stamprally.latitude1) - (geoLocation.latitude)
            // const lon = (stamprally.longitude1) - (geoLocation.longitude)
            // setLat((stamprally.latitude1) - (geoLocation.latitude));
            // setLon((stamprally.longitude1) - (geoLocation.longitude));
            //  const lat = -0.1;
            //         const lon = -0.0009;
            console.log(lat1);
            console.log(lon1)
            if (lat1 > -0.0002 && lat1 < 0.0002 && lon1 > -0.0002 && lon1 < 0.0002) {

                alert("せいかい！")
                setCheckpoint((prevCount => prevCount - 1))
                setTf("hidden")
                setCorrect1(true)
            }

            else {
                alert("ちがいまーす")

            }
        }
    }

    const getCurrentPosition2 = async () => {
        setCount((prevCount) => prevCount + 1);
        if (geoLocation) {

            // navigator.geolocation.watchPosition(success, fail, options);
            //  console.log(geoLocation.latitude)


            // const lat = (stamprally2.latitude2) - `${ latitude }`;
            // const lon = (stamprally2.longitude2) -` ${ longitude }`;
            //      setLat((stamprally.latitude1) - (geoLocation.latitude)),
            //   setLon((stamprally.longitude1) - (geoLocation.longitude))
            //  const lat = -0.1;
            //         const lon = -0.0009;
            console.log(lat2);
            console.log(lon2)
            if (lat2 > -0.0002 && lat2 < 0.0002 && lon2 > -0.0002 && lon2 < 0.0002) {

                alert("せいかい！")
                setTf2("hidden")
                setCorrect2(true)
                setCheckpoint((prevCount => prevCount - 1))

            }

            else {
                alert("ちがいまーす")


            }
        }
    }
    const getCurrentPosition3 = async () => {
        setCount((prevCount) => prevCount + 1);
        if (geoLocation) {

            // navigator.geolocation.watchPosition(success, fail, options);
            //  console.log(geoLocation.latitude)


            // const lat = (stamprally2.latitude2) - `${ latitude }`;
            // const lon = (stamprally2.longitude2) -` ${ longitude }`;
            //      setLat((stamprally.latitude1) - (geoLocation.latitude)),
            //   setLon((stamprally.longitude1) - (geoLocation.longitude))
            //  const lat = -0.1;
            //         const lon = -0.0009;
            console.log(lat3);
            console.log(lon3)
            if (lat3 > -0.0002 && lat3 < 0.0002 && lon3 > -0.0002 && lon3 < 0.0002) {

                alert("せいかい！")
                setTf3("hidden")
                setCorrect3(true)
                setCheckpoint((prevCount => prevCount - 1))

            }

            else {
                alert("ちがいまーす")


            }
        }
    }


    // const fail = (error) => console.log(error);
    const success = async (position) => {

        const { latitude, longitude } = position.coords
        setGeoLocation({ latitude, longitude })

        setLat1((stamprally.latitude1) - `${latitude}`);
        setLon1((stamprally.longitude1) - ` ${longitude}`)
        setLat2((stamprally2.latitude2) - `${latitude}`);
        setLon2((stamprally2.longitude2) - ` ${longitude}`)
        setLat3((stamprally3.latitude2) - `${latitude}`);
        setLon3((stamprally3.longitude2) - ` ${longitude}`)



        setLoading(false)
    }

    const fail = (error) => console.log(error);
    const options = { enableHighAccuracy: true, }

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(success, fail, options);
        console.log("catch!")
    }, [count]);




    if (loading) {
        return (<>
            <div className="text-center m-5">
            <BeatLoader color={'#123abc'} loading={true} timeout={3000} />
            <p>loading</p>
        </div>
      </>  )

    }

    if (correct1 === true && correct2 === true && correct3 === true) {
        const archives =
            addDoc(collection(db, "archives"), {
                stamprally,
                stamprally2,
                stamprally3,
                timestamp: serverTimestamp(),
                id: user.uid

            })

        return (
            <Navigate to="/clear" />
        )
        // <p>
        //     クリア！
        // </p>

    }

    return (

        <>
            {!user ? (<Navigate to="/login" />)
                : (<>
                    <div className="border-b-2 w-max p-1 m-1 border-dashed border-indigo-200">チェックポイントはどこから回ってもOK！</div>
                    <div className="flex m-2">
                        <div>残りチェックポイント数</div>
                        <div className="ml-1 text-indigo-500">{checkpoint}/3</div>
                    </div>
                    <div className={tf}>
                        <table className="border-b-2 border-dotted border-indigo-300 m-2"  >

                            <tr>チェックポイント①</tr>
                            <tr><img src={stamprally.url} alt="" /></tr>
                            <tr>ベストタイミング：{stamprally.time1}</tr>
                            <tr>ヒント</tr>
                            <div className="">

                                <div>「{stamprally.hint11}」</div>
                                <div>「{stamprally.hint21}」</div>
                                <div>「{stamprally.hint31}」</div>

                            </div>

                            <button className={button} onClick={getCurrentPosition1}>ここだ！</button>
                        </table>
                    </div>
                    <div className={tf2}>
                        <table className="{tf2} border-b-2 border-dotted border-indigo-300 m-2">
                            <tr>チェックポイント②</tr>
                            <tr><img src={stamprally2.url} alt="" /></tr>
                            <tr>ベストタイミング：{stamprally2.time2}</tr>

                            <tr>ヒント</tr>
                            <div className="">

                                <div>「{stamprally2.hint12}」</div>
                                <div>「{stamprally2.hint22}」</div>
                                <div>「{stamprally2.hint32}」</div>
                            </div>

                            <button className={button} onClick={getCurrentPosition2}>ここだ！</button>
                        </table>
                    </div>
                    <div className={tf3}>
                        <table className="{tf3} border-b-2 border-dotted border-indigo-300 m-2">
                            <tr>チェックポイント③</tr>
                            <tr><img src={stamprally3.url} alt="" /></tr>
                            <tr>ベストタイミング：{stamprally3.time2}</tr>

                            <tr>ヒント</tr>
                            <div className="m">

                                <div>「{stamprally3.hint12}」</div>
                                <div>「{stamprally3.hint22}」</div>
                                <div>「{stamprally3.hint32}」</div>
                            </div>

                            <button className={button} onClick={getCurrentPosition3}>ここだ！</button>


                        </table>
                    </div>
                    <div className="text-indigo-600 m-2"><Link to="/retire">リタイアする</Link></div>

                </>)
            }
        </>)
}