

const TweetButton = ({ text }) => {
    const tweetIntentUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
    return (
        <a href={tweetIntentUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500">
            Tweet
        </a>
    );
};

export default TweetButton;