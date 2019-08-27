// JS Goes here - ES6 supported

import "./css/main.css";

import Range from "./range";
import Snackbar from "./snackbar";

document.addEventListener("DOMContentLoaded", () => {
  const range = new Range(document.getElementById("range"));
  const apiEndpoint = process.env.NODE_ENV === "production" ? "https://moon.aerokube.com/license" : "http://localhost:8080/license";
  const reset = function() {
    grecaptcha.reset();
  };
  const notify = function(color, message) {
    Snackbar.show({
      backgroundColor: color,
      pos: "top-center",
      showAction: false,
      duration: 7000,
      text: message
    });
  };
  const success = function(message) {
    notify("#43a047", message);
  };
  const failure = function(message) {
    notify("#d32f2f", message);
  };
  window.onSubmit = function() {
    $.post(apiEndpoint, $("form#license-form").serialize())
      .done(function(evt, status, xhr) {
        if (xhr.status === 200) {
          success("An evaluation license key was sent to your email address");
        } else {
          failure(`An error while requesting evaluation license key: ${xhr.statusText}`);
        }
        reset();
      })
      .fail(function(e) {
        failure(`Failed to request evaluation license key: ${e.statusText}`);
        reset();
      });
  };
});
