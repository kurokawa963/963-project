import{Link} from "react-router-dom"


export const Clear = () => {


    return(
        <>
            <h1 className="text-center text-xl m-2">クリア！！</h1>
            <p>おめでとうございます。</p>
            <p>また違うスタンプラリーで遊んでね☆</p>
            <Link to="/mypage" className="border-b-2 border-indigo-700 hover:text-indigo-500">マイページへ</Link>
        </>


    )
}