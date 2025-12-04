import React from "react";
import Subbutton from "./subbutton";
import Subbutton1 from "./subbutton1";
function Button() {
    return (<div className="signup_form-button-wrapper">
        <Subbutton
            value="Signin" />
        <Subbutton1 value="Sign up with Google" />
    </div>);
}
export default Button;