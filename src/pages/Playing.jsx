import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// useParamsでidを取ってくる
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

export const Playing = () => {
    // const [loading, setLoading] = useState(true);

    const [stamprally, setStamprally] = useState(null);

    const { id } = useParams();

    useEffect(() => {
        const docRef = doc(db, "stamprally", id);
        getDoc(docRef).then((documentSnapshot) => {
            console.log(documentSnapshot);
            setStamprally({ ...documentSnapshot.data(), id: documentSnapshot.id });
            // setLoading(false);
        });
    }, []);



    return(<>
    <p></p>
    
    </>)
}