var express = require('express');
var router = express.Router();
var dbConn = require('../lib/db');

// DISPLAY patients page
router.get('/', function (req, res, next) {

  dbConn.query('SELECT * FROM tbl_patients ORDER BY id desc', function (err, rows) {
    const formatYmd = date => date.toISOString().slice(0, 10);

    formatYmd(new Date());

    if (err) {
      req.flash('error', err);
      // render to views/patients/index.ejs
      res.render('patients', { data: '' });
    } else {
      // render to views/patients/index.ejs
      res.render('patients', { data: rows });
    }
  });
});

// DISPLAY add patients page
router.get('/add', function (req, res, next) {
  // render to add.ejs
  res.render('patients/add', {
    name: '',
    dob: '',
    gender: '',
    tos: '',
    general: ''
  })
})

// ADD new patients
router.post('/add', function (req, res, next) {

  let name = req.body.name;
  let dob = req.body.dob;
  let gender = req.body.gender;
  let tos = req.body.tos;
  let general = req.body.general;
  let errors = false;

  if (name.length === 0 || dob.length === 0 || gender.length === 0 || tos.length === 0 || general.length === 0) {
    errors = true;

    // SET flash message
    req.flash('error', "Please enter patients name, email, and phone");
    // RENDER to add.ejs with flash message
    res.render('patients/add', {
      name: name,
      dob: dob,
      gender: gender,
      tos: tos,
      general: general
    })
  }

  // if no error
  if (!errors) {

    var form_data = {
      name: name,
      dob: dob,
      gender: gender,
      tos: tos,
      general: general
    }

    // INSERT query
    dbConn.query('INSERT INTO tbl_patients SET ?', form_data, function (err, result) {
      //if(err) throw err
      if (err) {
        req.flash('error', err)

        // RENDER to add.ejs
        res.render('patients/add', {
          name: form_data.name,
          dob: form_data.dob,
          gender: form_data.gender,
          tos: form_data.tos,
          general: form_data.general
        })
      } else {
        req.flash('success', 'Patient successfully added');
        res.redirect('/patients');
      }
    })
  }
})







module.exports = router;