import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// useParamsでidを取ってくる
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

const button = "rounded border border-gray - 300 hover: border - indigo - 500"
const tf = "hidden"


export const Playing = () => {
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

    const { id } = useParams();

    // const handlechange = async (e) => {
    //     e.preventDefault();

    //     try {if()
    //         if()
    //     }
    // }




    //   setLat(geoLocation.latitude)
    //   setLon(geoLocation.longitude)



    // console.log(stamprally.latitude1)
    // console.log(lat)
    // 


    // const success=


    useEffect(() => {
        const docRef = doc(db, "stamprally", id);
        getDoc(docRef).then((documentSnapshot) => {

            setStamprally({ ...documentSnapshot.data(), id: documentSnapshot.id });

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
        if (lat1 > -0.001 && lat1 < 0.001 && lon1 > -0.001 && lon1 < 0.001) {

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
        if (lat2 > -0.001 && lat2 < 0.001 && lon2 > -0.001 && lon2 < 0.001) {

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
    const options = { enableHighAccuracy: true, timeout: 10000, distanceFilter: 0.5 }
    useEffect(() => {
        navigator.geolocation.watchPosition(success, fail, options);

    });




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

            <table className={tf}>

                <tr>チェックポイント１</tr>

                <tr>ベストタイミング：{stamprally.time1}</tr>
                <tr>ヒント</tr>
                <tr className="flex">

                    <td>「{stamprally.hint11}」</td>
                    <td>「{stamprally.hint21}」</td>
                    <td>「{stamprally.hint31}」</td>
                    {stamprally.latitude1}
                </tr>

                <button className={button} onClick={getCurrentPosition1}>ここだ！</button>

            </table>
            <table className={tf2}>
                <tr>チェックポイント２</tr>
                <tr>ベストタイミング：{stamprally2.time2}</tr>

                <tr>ヒント</tr>
                <tr className="flex">
                    <td>「{stamprally2.hint12}」</td>
                    <td>「{stamprally2.hint22}」</td>
                    <td>「{stamprally2.hint32}」</td>
                    {stamprally2.latitude2}
                </tr>
                <button className={button} onClick={getCurrentPosition2}>ここだ！</button>

            </table>

        </>)
}