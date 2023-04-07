import { Link } from "react-router-dom"


export const Retire = () => {

    return (<>
        <div className="mb-2">
        <p>お疲れ様でした</p>
        <div>またチャレンジしてね</div>
        <div>作り手になれば次はクリアできるかも？</div>
        </div>
        <div className="mb-2">
            <Link to="/making" className="border-b-2 border-blue-500 hover:text-indigo-500 ">スタンプラリーを作ってみる！</Link>
        </div>
        <div>
            <Link to="/mypage" className="border-b-2 border-indigo-700 hover:text-indigo-500">マイページへ</Link>
        </div>


    </>
    )
}