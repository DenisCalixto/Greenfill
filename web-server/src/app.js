const path = require('path')
const express = require('express')
const hbs = require('hbs')

var routes = require('../routes/routes');
var connection = require('../lib/db');
var refill = require('../lib/refill');

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Greenfill',
        name: 'Team Kilimanjaro'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Us',
        name: 'Team Kilimanjaro'
    })
})

app.get('/contact', (req, res) => {
    res.render('contact', {
        title: 'Get in Touch',
        name: 'Team Kilimanjaro'
    })
})

app.get('/dashboard', (req, res) => {
    res.render('dashboard', {
        title: 'Dashboard',
        name: 'Team Kilimanjaro'
    })
})

app.get('/guide', (req, res) => {
    res.render('guide', {
        guideText: 'This is some helpful text.',
        title: 'Guide',
        name: 'Team Kilimanjaro'
    })
})

app.get('/leaderboard', (req, res) => {

    const query = "select person.name, sum(refillitem.quantity) as quantity " +
                  "from person " +
                  "inner join refill on person.personid = refill.personid " +
                  "inner join refillitem on refill.refillid = refillitem.refillid " +
                  "group by person.name " +
                  "order by sum(refillitem.quantity) desc " +
                  "limit 5 "
    connection.query(query,function(err, results, fields) { 
        if (err) {
            return res.send({
                error: err
            })
        }
        else {            
            res.render('leaderboard', {
                title: 'Leaderboard',
                name: 'Team Kilimanjaro',
                leaders: JSON.stringify(results),
                people: [
                    "Yehuda Katz",
                    "Alan Johnson",
                    "Charles Jolley"
                  ]
            })
        }
                            
    });
    
});

app.get('/refill', (req, res) => {
    res.render('refill', {
        title: 'Refill',
        name: 'Team Kilimanjaro'
    })
})

app.get('/saverefill', (req, res) => {
    let personId = req.query.personId;
    let category1Amount = refill.extractCategoryAmount(req.query.category1);
    let category2Amount = refill.extractCategoryAmount(req.query.category2);
    let category3Amount = refill.extractCategoryAmount(req.query.category3);
    let category4Amount = refill.extractCategoryAmount(req.query.category4);
    let category5Amount = refill.extractCategoryAmount(req.query.category5);
    // let category6Amount;
    // let category7Amount;
    // let category8Amount;
    // let category9Amount;
    // let category10Amount;
    // let category11Amount;
    // let category12Amount;
    // let category13Amount;
    // let category14Amount;
    // let category15Amount;
    // let category16Amount;
    // let category17Amount;
    // let category18Amount;
    // let category19Amount;
    // let category20Amount;
    // let category21Amount;

    let refills = []    

    if (category1Amount || category2Amount  || category3Amount || category4Amount || category5Amount) {
        
        // req.assert('personId', 'Customer is required').notEmpty() //Validate name
    
        // var errors = req.validationErrors()
        
        // if( !errors ) {   //No errors were found.  Passed Validation! 

            let query = 'INSERT INTO `refill` (PersonId, CompanyId)' +
                        'Values (' + personId + ', NULL)';
            
            connection.query(query, function(err, result) {
                    //if(err) throw err
                    if (err) {
                        return res.send({
                            error: err
                        })
                    } else {
                        // return res.send({
                        //     error: 'Refill successfully saved!'
                        // })
                        //req.flash('success', 'Refill successfully saved!');
                        const refillId = result.insertId;

                        if (category1Amount) {
                            let errItem = refill.saveItemRefill(refillId, 1, category1Amount);
                            if (errItem) {
                                return res.send({
                                    error: errItem
                                })
                            }
                        }

                        res.redirect('/refill');
                    }
                })
        // }
        // else {   //Display errors to user
        //     var error_msg = ''
        //     errors.forEach(function(error) {
        //         error_msg += error.msg + '<br>'
        //     })                
        //     req.flash('error', error_msg)        
            
        //     // return res.send({
        //     //     error: error_msg
        //     // })
        // }

    }
    else {
        return res.send({
            error: 'There is nothing to be saved'
        })
    }
})

app.get('/search', (req, res) => {
    res.render('search', {
        title: 'Search',
        name: 'Team Kilimanjaro'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Team Kilimanjaro',
        errorMessage: 'Page not found.'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})