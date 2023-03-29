import { useState, useEffect } from "react"

import { Link, BrowserRouter, Routes, Route, Navigate, useNavigate, useParams } from "react-router-dom"
import { auth } from "../firebase";
import { db } from "../firebase";
import { doc, getDoc, onSnapshot, query, orderBy, collection, where } from "firebase/firestore";

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
                        <p>アーカイブ</p>
                        {archive.map((x, i) => (
                            <tr key={i}>
                                <td>{x.stamprally.place1}</td>
                                <p></p>
                            </tr>
                        ))}
                    </>
                ) : (
                    (<Navigate to="/login" />)
                )}

            </>}
        {/* </>} */}
    </>
    )
}