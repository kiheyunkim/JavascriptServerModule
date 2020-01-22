const express = require('express');
const passport = require('passport');
const googleStrategy = require('passport-google-oauth20').Strategy;
const app = express();

let Addpassport = ()=>{
    //if(app !== require('express')())
    //    throw new Error('not express module');

    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser((user,done)=>{
        done(null,user.id);
    });

    passport.deserializeUser((id,done)=>done(null,id));

    passport.use(new googleStrategy({
        clientID: '----',
        clientSecret: '----,
        callbackURL: '----'
    },
    (accessToken, refreshToken, profile, done)=> {
        // asynchronous verification, for effect...
        process.nextTick( ()=>{
          console.log(profile);
          // To keep the example simple, the user's Google profile is returned to
          // represent the logged-in user.  In a typical application, you would want
          // to associate the Google account with a user record in your database,
          // and return that user instead.
          return done(null, profile);
        });
    }));

    app.get('/login/google',
        passport.authenticate('google', { scope: [
            'https://www.googleapis.com/auth/userinfo.email'],
            accessType: 'offline', approvalPrompt: 'force'}),
    (req, res)=>{    }
    // The request will be redirected to Google for authentication, so this
    // function will not be called.
    );

    app.get('/login/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res)=>{//console.log(req.query);
      res.redirect('/login');
    });

    app.get('/logout/google', function(req, res){
        req.logout();
        res.redirect('/login');
      });

    app.listen('3000');

    app.get('/login',(request,response)=>{
        response.send(`
        <a href='/login/google'>로그인</a>
        <a href='/login/google'>로그아웃</a>
        `)
    })
}

Addpassport();