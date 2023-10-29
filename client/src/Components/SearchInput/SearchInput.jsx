import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
const SearchInput = ({ searchQuery, onSearch }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="search-container w-100 d-flex align-items-center  gap-3 justify-content-center">
        <button
          onClick={() => navigate(-1)}
          className="bg-transparent text-white fs-5 ms-1"
        >
          {" "}
          <i className="bx bx-arrow-back"></i>{" "}
        </button>
        <input
          type="text"
          placeholder="Type To Search... "
          className="rounded-2 px-3 py-1"
          style={{
            width: "85%",
            background: "var(--bs-gray-700)",
            color: "white",
          }}
          value={searchQuery}
          onChange={onSearch}
        />
      </div>
    </>
  );
};
SearchInput.propTypes={
  searchQuery:PropTypes.string,
  onSearch:PropTypes.func

}
export default SearchInput;