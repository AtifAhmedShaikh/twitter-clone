import { useEffect, useState } from "react";
import { fetchUserFollowingById } from "../../Services/profileService";
import User from "../../Components/UserCard/User";
import Loader from "../../Components/Loader/Loader";
import { useParams } from "react-router-dom";
import SearchInput from "../../Components/SearchInput/SearchInput";
import { filteredList } from "../../Utils/helper";
const FollowingList = () => {
  const [users, setUsers] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const { userId } = useParams();
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    const displayUsers = async () => {
      const { data, error } = await fetchUserFollowingById(userId);
      console.log(data, error);
      if (error) return;
      setUsers(data.following);
      setLoaded(true);
    };
    displayUsers();
  }, [userId]);

  // handle search Input to send query and get the filtered list  for users
  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };
  return (
    <>
      <div className="d-flex flex-column gap-3 align-items-center mt-3 pb-3 user-container">
        <SearchInput searchQuery={searchQuery} onSearch={handleSearch} />
        {!loaded && <Loader />}
        {users.length === 0 && loaded && (
          <p className="text-center px-2">No following yet? That&apos;s okay! Keep engaging and sharing to build your community.</p>
        )}
        {filteredList(searchQuery, users).map((user) => {
          return <User {...user} key={user._id} />;
        })}
      </div>
    </>
  );
};

export default FollowingList;
