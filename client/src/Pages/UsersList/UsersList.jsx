import { useEffect, useState } from "react";
import Loader from "../../Components/Loader/Loader";
import User from "../../Components/UserCard/User";
import { fetchUsers } from "../../Services/profileService";
import SearchInput from "../../Components/SearchInput/SearchInput";
import { filteredList } from "../../Utils/helper";
import Header from "../../layouts/Header/Header";
import Footer from "../../layouts/Footer/Footer";
const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  // Render All Users list on search page and as well search the user
  const renderUsersList = async () => {
    const { data, error } = await fetchUsers();
    if (error) return;
    setUsers(data.users);
    setLoaded(true);
  };

  useEffect(() => {
    renderUsersList();
  }, [loaded]);
  // handle search Input to send query and get the filtered list  for users
  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };
  return (
    <>
      <Header />
      <div className="d-flex flex-column gap-3 align-items-center mt-1 pb-1 user-container">
        <SearchInput searchQuery={searchQuery} onSearch={handleSearch} />
        {filteredList(searchQuery, users).map((user) => {
          return <User {...user} key={user._id} />;
        })}
        {!loaded && <Loader />}
      </div>
      <Footer />
    </>
  );
};

export default UserList;
