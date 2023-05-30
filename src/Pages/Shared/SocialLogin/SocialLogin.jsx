import { useContext } from "react";
import { FaGoogle } from "react-icons/fa";
import { AuthContext } from "../../../Providers/AuthProvider";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";

const SocialLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const { googleSignIn } = useContext(AuthContext);
  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((result) => {
        const loggedUser = result.user;

        fetch(`http://localhost:5000/users`, {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify({ name: loggedUser.displayName, email: loggedUser.email }),
          })
            .then((res) => res.json())
            .then(() => {
              navigate(from, { replace: true });
            });

      })
      .catch((err) => Swal.fire(`${err.message}`));
  };
  return (
    <div className="mx-auto my-5">
      <div className="divider"></div>
      <button
        onClick={handleGoogleSignIn}
        className="btn btn-circle btn-outline"
      >
        <FaGoogle className="h-7 w-7"></FaGoogle>
      </button>
    </div>
  );
};

export default SocialLogin;
