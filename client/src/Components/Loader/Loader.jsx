import { SyncLoader } from "react-spinners";
const Loader = () => {
  return (
    <>
      <div className="mt-2 d-flex justify-content-center">
        <SyncLoader
          color="#36d7b7"
          size={10}
          loading={true}
          speedMultiplier={0.8}
        />
      </div>
    </>
  );
};

export default Loader;
