/**
 * @name helpers.js
 * @description contains arrayify function to format data before sending to client
 */
const fs = require("fs");
const path = require("path");

const helper = {};

// helper.isAuthorized = (req, res, next) => {
//   //authorization middleware
//   if (req.cookies.authorized) {
//     let authorized = jwt.verify(req.cookies.authorized, secret, {
//       algorithm: "HS256"
//     }).authorized;
//     if (authorized) {
//       return next();
//     } else {
//       return next("unauthorized access");
//     }
//   }
//   return next("no cookies");
// };

helper.arrayify = arr => {
  const newArray = [];
  const toBeModified = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].amount === null) {
      newArray.push(arr[i]);
    } else {
      toBeModified.push(arr[i]);
    }
  }
  newArray.forEach(el => {
    el.bids = [];
  });

  const helperObj = {};
  for (let i = 0; i < toBeModified.length; i++) {
    let post_id = toBeModified[i].post_id;
    if (helperObj[post_id]) {
      helperObj[post_id].bids.push({
        amount: toBeModified[i].amount,
        username: toBeModified[i].username
      });
    } else {
      helperObj[post_id] = {
        post_id: post_id,
        title: toBeModified[i].title,
        description: toBeModified[i].description,
        bids: [
          {
            amount: toBeModified[i].amount,
            username: toBeModified[i].username
          }
        ]
      };
    }
  }
  const helperKeys = Object.keys(helperObj);
  for (let i = 0; i < helperKeys.length; i++) {
    newArray.push(helperObj[helperKeys[i]]);
  }
  return newArray;
};

module.exports = helper;
