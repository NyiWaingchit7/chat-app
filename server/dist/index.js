"use strict";

var _express = _interopRequireDefault(require("express"));
var _cors = _interopRequireDefault(require("cors"));
var _dotenv = _interopRequireDefault(require("dotenv"));
var _auth = require("./routes/auth.js");
var _twilio = _interopRequireDefault(require("twilio"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
_dotenv["default"].config();
var accountSid = process.env.TWILIO_ACCOUNT_SID;
var authToken = process.env.TWILIO_AUTH_TOKEN;
var messagingServiceSid = process.env.TWILIO_MESSAGING_SERVICE_SID;
var twilioClient = (0, _twilio["default"])(accountSid, authToken);
var app = (0, _express["default"])();
var PORT = process.env.PORT || 5000;
app.use((0, _cors["default"])());
app.use(_express["default"].json());
app.use(_express["default"].urlencoded());
app.use("/auth", _auth.authRoute);
app.get("/", function (req, res) {
  res.send("hello, vercel");
});
app.post("/", function (req, res) {
  var _req$body = req.body,
    message = _req$body.message,
    sender = _req$body.user,
    type = _req$body.type,
    members = _req$body.members;
  if (type === "message.new") {
    members.filter(function (member) {
      return member.user_id !== sender.id;
    }).forEach(function (_ref) {
      var user = _ref.user;
      if (!user.online) {
        twilioClient.message.create({
          body: "You have a new message from ".concat(message.user.fullName, " - ").concat(message.text),
          messagingServiceSid: messagingServiceSid,
          to: user.phoneNumber
        }).then(function () {
          return console.log("Message sent!");
        })["catch"](function (err) {
          return console.log(err);
        });
      }
    });
    return res.status(200).send("Message sent!");
  }
  return res.status(200).send("Not a new message request");
});
app.listen(PORT, function () {
  return console.log("server is running at ".concat(PORT));
});