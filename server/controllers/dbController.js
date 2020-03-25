/**
 * @name dbController.js
 * @description Middleware functions pertaining to making SQL calls
 *
 * @insertBid inserts new bid, should redirect to /getmarkets @ endpoint
 * @getUserByName given a username grab first sql row that contains that username and attach to res.locals
 * @insertNewUser inserts new user into the db given a proper username and hashed pw
 * @getMarkets grab markets data from db and attach it to res.locals
 * @insertMarket inserts a market to the db (need to attach user_id via jwt.verify beforehand)
 */

const db = require("../models/marketModel.js");
const { arrayify } = require("../helpers");
const dbController = {};

dbController.insertBid = (req, res, next) => {
  const { bidAmount, postId } = req.body;
  //make sure to run jwtcontroller to nab proper user_id
  const user_id = res.locals.user_id;
  db.query(
    `
        INSERT INTO public.bids (bid_by, amount, post_id, posted_at)
        VALUES ($1, $2, $3, NOW()::timestamp);
        `,
    [user_id, bidAmount, postId],
    (err, sqlres) => {
      if (err) {
        return next(err);
      }
      console.log("Successful bid insert!");
      //  next middleware function should be to grab markets or endpoint that redirects to getmarkets
      //return res.redirect("/getmarkets");
      return next();
    }
  );
};

dbController.getUserByName = (req, res, next) => {
  const { username } = req.body;
  db.query(
    `
        SELECT *
        FROM public.users as users
        WHERE users.username = $1;
        `,
    [username],
    (err, sqlres) => {
      //console.log(sqlres);
      if (err){
        console.log("Error in getUserByName");
        return next(err);
      }
      // if (sqlres.rows.length === 0)
      //   return next("Error: invalid username/password!");

      //  no check if there is a user by id, just nabbing the data and putting it in res.locals
      res.locals.user = sqlres.rows[0];
      //  next function should be jwt middleware to sign in and set cookies
      //  OR register a user if getUserById attaches undefined to res.locals (register route)
      return next();
    }
  );
};

dbController.insertNewUser = (req, res, next) => {
  //  need to run bCrypt somewhere to hash the password
  //  if a user with that username already exists, throw an error
  if (res.locals.user) return next("Error: Username already taken!");
  const { username } = req.body;
  const hashedPwd = res.locals.hashedPwd;
  db.query(
    `
    INSERT INTO public.users (username, password)
    VALUES ($1, $2)
    RETURNING user_id, username, password;
    `,
    [username, hashedPwd],
    (err, sqlres) => {
      console.log(sqlres);
      if (err) return next(err);
      //  need to invoke jwt authentication and cookie storage after this
      //  so need to set relevant data in res.locals from the sqlres rows
      //  user is a object containing the single sql row of user
      res.locals.user = sqlres.rows[0];      
      return next();
    }
  );
};

dbController.getMarkets = (req, res, next) => {
  db.query(
    `
    SELECT posts.post_id, 
         posts.title,
         posts.description,
         --bids.post_id as bid_post_id,
         bids.amount, 
         bids.bid_by,
         users.username
  FROM public.posts as posts
  LEFT JOIN public.bids as bids 
  ON bids.post_id = posts.post_id
  LEFT JOIN public.users as users
  ON users.user_id = bids.bid_by
    `,
    (err, sqlres) => {
      if (err) return next(err);
      //invoking arrayify to structure the rows
      res.locals.rows = arrayify(sqlres.rows);

      //after that invoke socket-io
      next();
    }
  );
};

dbController.insertMarket = (req, res, next) => {
  //need to invoke jwtcontroller before this to verify and grab proper user id
  db.query(
    `
    INSERT INTO public.posts (title, description, posted_by_id, posted_at)
    VALUES ($1, $2, $3, NOW()::timestamp);
    `,
    [req.body.marketName, req.body.description, res.locals.user_id],
    (err, sqlres) => {
      if (err) return next(err);
      //  next middleware function should be endpoint that redirects to getmarkets route or something else if need be
      //  return res.redirect("/getmarkets");
      return next();
    }
  );
};

module.exports = dbController;
