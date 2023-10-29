import { useEffect, useState } from "react";
import "./Home.css";
import { fetchTweets } from "../../Services/tweetService";
import Card from "../../Components/TweetCard/Card";
import Loader from "../../Components/Loader/Loader";
import Header from "../../layouts/Header/Header";
import Footer from "../../layouts/Footer/Footer";
const Home = () => {
  const [tweets, setTweets] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const renderTweets = async () => {
    const {data,error} = await fetchTweets();
     if(error)return;
      setTweets(data.tweets);
      setLoaded(true);
  };
  useEffect(() => {
    renderTweets();
  }, [loaded]);
  return (
    <>
  <Header/>
      <div className="tweets-container d-flex flex-column align-items-center gap-3 py-2">
        {!loaded && <Loader />}
        {loaded && tweets.length === 0 && (
          <p className="text-center">No Tweets Available at the Moment</p>
        )}
        {tweets.map((tweet) => {
          return <Card {...tweet} key={tweet._id} />;
        })}
      </div>
      <Footer/>
    </>
  );
};
export default Home;
