import { Link } from "react-router-dom"
import TweetButton from './TweetButton';

export const Clear = () => {
    const tweetText = 'みんなで共有するスタンプラリー「過労☆メイト」新しい旅の楽しみ方を体験しよう！https://project-cbf66.web.app/';

    return (
        <>
            <h1 className="text-center text-xl m-2">クリア！！</h1>
            <p>おめでとうございます。</p>
            <p>また違うスタンプラリーで遊んでね☆</p>

            <div className="border-2 rounded p-1 w-max m-1">  <TweetButton text={tweetText} /></div>
            <Link to="/mypage" className="border-b-2 border-indigo-700 hover:text-indigo-500">マイページへ</Link>
        </>


    )
}