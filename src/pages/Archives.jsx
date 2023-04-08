import { useState, useEffect } from "react"

import { Link, BrowserRouter, Routes, Route, Navigate, useNavigate, useParams } from "react-router-dom"
import { auth } from "../firebase";
import { db } from "../firebase";
import { doc, getDoc, onSnapshot, query, orderBy, collection, where } from "firebase/firestore";
import { Flame} from "./FLame.jsx"
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";


export const Archives = () => {

    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true)
    const [subloading, setSubLoading] = useState(true)
    const [archive, setArchive] = useState([])
    const [noarchive, setNoarchive] = useState(true)
    const { id } = useParams();

    // console.log(id)

    // console.log(user)




    useEffect(() => {



        // }, []);



        const q = query(collection(db, "archives"), where("id", "==", id))

        const unsub = onSnapshot(q, (documentSnapshot) => {
            console.log(documentSnapshot.docs);

            setArchive(documentSnapshot.docs.map((x) =>
                ({ ...x.data(), id: x.id })))
            setSubLoading(false);



        })


        return unsub
        // const docRef = doc(db, "archives", id);

        // getDoc(docRef).then((documentSnapshot) => {
        //     // console.log(documentSnapshot);

        //     setArchive({
        //         ...documentSnapshot.data(),
        //         id: documentSnapshot.id

        //     });
        // console.log(archive)
        // if (archive === null 
        // ) {
        //     setNoarchive(false)
        // }
        // setSubLoading(false);

        // });
    }, []);

    //    if (archive === []) {
    //                 setNoarchive(false)
    //             }

    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false)
        })
    }, [])




    if (subloading) {
        return (<p>loading now...</p>)


    }

    // if (noarchive) {
    //     return <p>データがありません</p>
    // }


    return (<>
        {!loading &&
            // <>{
            //     noarchive &&
            <>
                {user ? (
                <> 
                   
                    <p className="m-2 bg-indigo-700 text-white border rounded-lg border-indigo-700 p-1 text-xl text-center">旅の記録</p>
                    <div className="p-2 m-2 border-2 rounded border-indigo-500">
                        {archive.map((x, i) => (
                            <div key={i} className="border rounded-lg w-max p-1 mb-2">
                                <div>{x.stamprally.place1}</div>
                                <div>{x.stamprally2.place2}</div>
                                <p></p>
                            </div>
                        ))}
                    </div>
                    
                    </>
                ) : (
                    (<Navigate to="/login" />)
                )}

            </>}
        {/* </>} */}
    </>
    )
}