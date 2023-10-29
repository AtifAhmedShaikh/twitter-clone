import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import PropTypes from "prop-types";
import Spinner from 'react-bootstrap/Spinner';
import AuthContext from "../../Context/AuthContext/AuthContext";
import { editProfileInfo } from "../../Services/profileService";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
const EditProfile = ({ isShow, handleCloseModal }) => {
  const context = useContext(AuthContext);
  const { bio, username, name } = context.userState;
  const [updatedValues, setUpdatedValues] = useState({ bio, name, username });
  const [loading, setLoading] = useState(false);
  const handleInputs = (e) => {
    const key = e.target.name;
    const value = e.target.value;
    setUpdatedValues({ ...updatedValues, [key]: value });
  };
  const handleUpdateProfile = async () => {
    setLoading(true);
    const { error } = await editProfileInfo(
      context.userState._id,
      updatedValues
    );
    if (error) {
      toast.error("something went wrong !");
      setLoading(false);
    }
    toast("Succfully Updated Profile Info !");
    setLoading(false);
    handleCloseModal();
  };
  return (
    <>
      <Modal closebutton={"false"} show={isShow} centered>
        <Modal.Dialog backdrop="static">
          <Modal.Header
            bsPrefix={"p-2 d-flex justify-content-between text-black"}
          >
            <Modal.Title>Update Profiles</Modal.Title>
          </Modal.Header>
          <Modal.Body
            bsPrefix={
              "p-1 text-black d-flex flex-column align-items-center border-0 edit-dialog-box"
            }
          >
            <Form.Control
              type="text"
              name="name"
              onChange={(e) => handleInputs(e)}
              value={updatedValues.name}
              placeholder="Edit Name"
              className="mb-2 text-black"
            />
            <Form.Control
              type="text"
              name="username"
              onChange={(e) => handleInputs(e)}
              value={updatedValues.username}
              placeholder="Edit Username"
              className="mb-2 text-black"
            />
            <Form.Control
              type="text"
              name="bio"
              onChange={(e) => handleInputs(e)}
              value={updatedValues.bio}
              placeholder="Edit Bio"
              className="mb-2 text-black"
            />
            <Form.Control
              type="file"
              placeholder="Normal text"
              className="mb-2"
            />
            <Form.Control
              type="file"
              placeholder="Normal text"
              className="mb-2"
            />
          </Modal.Body>
          <Modal.Footer bsPrefix={"p-1 d-flex justify-content-end gap-3"}>
            <button className="unfollow-button" onClick={handleCloseModal}>
              Cancel
            </button>
            <button
              className="follow-button"
              onClick={handleUpdateProfile}
              disabled={loading}
            >
              {!loading ? (
                "Update"
              ) : (
                <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
                Loading
                </>
              )}
            </button>
          </Modal.Footer>
        </Modal.Dialog>
      </Modal>
    </>
  );
};

EditProfile.propTypes = {
  isShow: PropTypes.bool,
  handleCloseModal: PropTypes.func,
};

export default EditProfile;
