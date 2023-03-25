import { useState, useEffect, useRef } from "react";
import { useParams,useNavigate,Navigate } from "react-router-dom";
// useParamsでidを取ってくる
import { db } from "../firebase";
import { auth } from "../firebase"

import { onAuthStateChanged, signOut } from "firebase/auth"


import { doc, getDoc } from "firebase/firestore";

const button = "rounded border border-gray - 300 hover: border - indigo - 500"
const tf = "hidden"


export const Playing = () => {
    const [user, setUser] = useState("");

    const [loading, setLoading] = useState(true);
    const [geoLocation, setGeoLocation] = useState(null);
    // const [checklat, setChecklat] = useState();
    // const [checklan, setChecklan] = useState();
    const [correct1, setCorrect1] = useState(false);
    const [correct2, setCorrect2] = useState(false);

    const [lat1, setLat1] = useState();
    const [lon1, setLon1] = useState();
    const [lat2, setLat2] = useState();
    const [lon2, setLon2] = useState();

    const [stamprally, setStamprally] = useState(null);
    const [stamprally2, setStamprally2] = useState(null);
    const [submit, setSubmit] = useState();
    const [tf, setTf] = useState();
    const [tf2, setTf2] = useState();
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

     },[]);
        
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
            if (lat1 > -0.0008 && lat1 < 0.0008 && lon1 > -0.0008 && lon1 < 0.0008) {

                console.log("成功")
                setTf("hidden")
                setCorrect1(true)
            }

            else {
                console.log("ちがいまーす")

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
            if (lat2 > -0.0008 && lat2 < 0.0008 && lon2 > -0.0008 && lon2 < 0.0008) {

                console.log("成功")
                setTf2("hidden")
                setCorrect2(true)

            }

            else {
                console.log("ちがいまーす")


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


        console.log(lat2)
        console.log(lon2)

        setLoading(false)
    }

    const fail = (error) => console.log(error);
    const options = { enableHighAccuracy: true, }

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(success, fail, options);
        console.log("catch!")
    }, [count]);




    if (loading) {
        return <p>loading now...</p>;
    }

    if (correct1 === true && correct2 === true) {
        return <p>
            クリア！
        </p>

    }

    return (

        <>
            {!user ? (<Navigate to="/login" />)
                : (<>

                    <table className="{tf} border-b-2 border-dotted">

                        <tr>チェックポイント①</tr>

                        <tr>ベストタイミング：{stamprally.time1}</tr>
                        <tr>ヒント</tr>
                        <div className="">

                            <div>「{stamprally.hint11}」</div>
                            <div>「{stamprally.hint21}」</div>
                            <div>「{stamprally.hint31}」</div>
 
                        </div>

                        <button className={button} onClick={getCurrentPosition1}>ここだ！</button>

                    </table>
                    <table className="{tf2} border-b-2 border-dotted">
                        <tr>チェックポイント②</tr>
                        <tr>ベストタイミング：{stamprally2.time2}</tr>

                        <tr>ヒント</tr>
                        <div className="">

                            <div>「{stamprally2.hint12}」</div>
                            <div>「{stamprally2.hint22}」</div>
                            <div>「{stamprally2.hint32}」</div>

                        </div>
                        <button className={button} onClick={getCurrentPosition2}>ここだ！</button>

                    </table>

                </>)}
        </>)
}