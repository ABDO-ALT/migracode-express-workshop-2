const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const boom = require("@hapi/boom");
const utils = require("./utils");

app.use(bodyParser.json());

app.get("/", function(req, res) {
  //   res.send(boom.badRequest('wrong request')).code(400);
  res.send("oh yeah");
});
app.get("/bookings", function(req, res) {
  //   res.send(boom.badRequest('wrong request')).code(400);
  res.send(utils.getAllBookings());
});
app.get("/bookings/:bookingId", function(req, res) {
  const booking = parseInt(req.params.bookingId);
  //res.send(utils.getBooking(booking))
  if (utils.checkBookingExists(booking)) {
    return res.send(utils.getBooking(booking));
  } else {
    return res.status(404).send("Its not exists!");
  }
  console.log(utils.checkBookingExists(booking));
});

app.post(
  "/bookings",
  function(req, res, next) {
    res.send(utils.createBooking(req.body));
  },
  function(err, req, res) {
    res.status(409).send(`Booking Id ${req.body.id} already exists!`);
  }
);

app.delete("/bookings/:bookingId", function(req, res) {
  const bookingId = parseInt(req.params.bookingId);
  if (utils.checkBookingExists(bookingId)) {
    res.send(utils.deleteBooking(bookingId));
  } else {
    res.status(404).send("Its not exists!");
  }
});

app.listen(3000, function() {
  console.log("Server is listening on port 3000. Ready to accept requests!");
});
