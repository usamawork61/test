const express = require("express");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("basic-auth");
const Users = require("../models/users");

function authentication(req, res, next) {
  var user = auth(req);
  console.log("user in midd", user);
  if (!user) return res.status(403).send({ message: 2021 });
  let userId = user.name;
  let token = user.pass;
  Users.findOne({ userId: userId }, (err, result) => {
    if (err) return res.send({ message: 2010, err });
    if (!result) return res.send({ message: 2011 });
    jwt.verify(token, config.jwtSecret, (err, resp) => {
      if (err) return res.send({ message: 2010, err });
      req.userDetails = result;
      if (resp.user !== result.userId) return res.send({ message: 2022 });
      if (resp.user !== userId) return res.send({ message: 2022 });
      next();
    });
  });
}

module.exports = authentication;
