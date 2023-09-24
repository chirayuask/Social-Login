import "./styles.scss";
import Linkedin from "../../assets/images/icons/LinkedIn.svg";
import Google from "../../assets/images/icons/google.svg";
import Github from '../../assets/images/icons/github-mark.svg'

export default function LoginModal({ signInModal, setSignInModal }) {
  const linkedin = () => {
    window.open("http://localhost:3200/api/v1/linkedin/login", "_self");
  };
  const google = () => {
    window.open("http://localhost:3200/api/v1/google/login", "_self");
  };
  const github = () => {
    window.open("http://localhost:3200/api/v1/github/login", "_self");
  };

  return (
    <div>
      <div>
        <div onClick={google} class="social-login-button">
          <span>
            <img src={Google} alt="" />
          </span>
          <span>Google</span>
        </div>
        <div onClick={linkedin} class="social-login-button">
          <span>
            <img src={Linkedin} alt="" />
          </span>
          <span>Linkedin</span>
        </div>
        <div onClick={github} class="social-login-button">
          <span>
            <img src={Github} alt="" />
          </span>
          <span>Github</span>
        </div>
      </div>
    </div>
  );
}
