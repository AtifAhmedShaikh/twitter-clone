import {
  FacebookIcon,
  FacebookShareButton,
  InstapaperIcon,
  InstapaperShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
import { copyText } from "../../Utils/helper";
const ShareSlider = () => {
  const url = window.location.href; //App Url for share
  return (
    <>
      <div>
        <div
          className="offcanvas offcanvas-bottom rounded-top-5"
          tabIndex={-1}
          id="offcanvasBottom"
          aria-labelledby="offcanvasBottomLabel"
        >
          <div className="offcanvas-body small px-1 py-2 m-0 d-flex flex-wrap gap-3 justify-content-start flex-column">
            <div className="d-flex justify-content-center">
              <button
                className="copyButton"
                onClick={async () => await copyText(url)}
              >
                copy Link
              </button>
            </div>
            <div className="d-flex justify-content-around flex-wrap">
              <FacebookShareButton
                url={url}
                quote="Amazing App please check out this now !"
                hashtag="#TwitterAppClone"
              >
                <FacebookIcon round={true}></FacebookIcon>
                <span>FaceBook</span>
              </FacebookShareButton>
              <WhatsappShareButton
                url={url}
                title=" check out the Tweet ! "
                separator={` This is one of the amazing tweet  `}
              >
                <WhatsappIcon round={true}></WhatsappIcon>
                <span>WhatsApp</span>
              </WhatsappShareButton>
              <InstapaperShareButton
                url={url}
                title=" check out the Tweet ! "
                description={` This is one of the amazing tweet `}
              >
                <InstapaperIcon
                  round={true}
                  iconFillColor={"white"}
                  bgStyle={{ fill: "#8134af" }}
                ></InstapaperIcon>
                <span>Instagram</span>
              </InstapaperShareButton>
              <LinkedinShareButton
                url={url}
                title=" check out the Tweet ! "
                summary={` This is one of the amazing tweet `}
              >
                <LinkedinIcon round={true}></LinkedinIcon>
                <span>LinkedIn</span>
              </LinkedinShareButton>
              <TwitterShareButton url={url} title=" check out the Tweet">
                <TwitterIcon round={true}></TwitterIcon>
                <span>Twitter</span>
              </TwitterShareButton>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ShareSlider;
