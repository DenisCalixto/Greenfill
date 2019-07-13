const path = require('path')
const express = require('express')
const hbs = require('hbs')
const bodyParser = require('body-parser');

// Require controller modules.
const companyController = require('../controllers/companyController');

const connection = require('../lib/db');
const refill = require('../lib/refill');
const company = require('../classes/company');
const productCategory = require('../classes/productCategory');
const bulkStrategy = require('../classes/bulkStrategy');

const app = express()

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const router = express.Router();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

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

app.get('/company/:id(\\d+)', (req, res) => {  // (\\d+) means an integer will be provided

    const query = "select name, website, city, province, address, expiringItemsNote, provideReusableItemsNotes, " +
                  "recentHistory, comments, loosePercentage, discountExpiringItems, donateExpiringItems, " +
                  "throwOutExpiringItems, sellInBulk, byo, extraChargeSingleItem, provideReusableItems, " +
                  "employeesUseSingleUseItems, employeesSingleUseItemsNotes " +
                  "from company " +
                  "where companyid = " + req.params.id

    // connection.connect(function(error){
    //     if(error) {
    //         throw error;
    //     }
    //     else
    //     {
            connection.query(query,function(error, results, fields) { 
                if (error) {
                    throw error;
                }
                else {
                    let companyObject = new company.Company()
                    for (var index = 0 ; index < results.length ; index++) {
                        companyObject.name = results[index].name;
                        companyObject.website = results[index].website;
                        companyObject.city = results[index].city;
                        companyObject.province = results[index].province;
                        companyObject.address = results[index].address;
                        companyObject.expiringItemsNote = results[index].expiringItemsNote;
                        companyObject.provideReusableItemsNotes = results[index].provideReusableItemsNotes;
                        companyObject.recencompanyObjecttory = results[index].recencompanyObjecttory;
                        companyObject.comments = results[index].comments;
                        companyObject.loosePercentage = results[index].loosePercentage;
                        companyObject.discountExpiringItems = results[index].discountExpiringItems;
                        companyObject.donateExpiringItems = results[index].donateExpiringItems;
                        companyObject.throwOutExpiringItems = results[index].throwOutExpiringItems;
                        companyObject.sellInBulk = results[index].sellInBulk;
                        companyObject.byo = results[index].byo;
                        companyObject.extraChargeSingleItem = results[index].extraChargeSingleItem;
                        companyObject.provideReusableItems = results[index].provideReusableItems;
                        companyObject.employeesUseSingleUseItems = results[index].employeesUseSingleUseItems;
                        companyObject.employeesSingleUseItemsNotes = results[index].employeesSingleUseItemsNotes;
                    }
                    res.render('company', {
                        title: 'Company',
                        name: 'Team Kilimanjaro',
                        company: JSON.stringify(companyObject)
                    })
                }
            });
    //     }
    // });
})

app.get('/company/:idCompany(\\d+)/productcategories/', (req, res) => {

    const query = "select cpc.ProductCategoryId, pc.name " +
                  "from companyproductcategory cpc " + 
                  "inner join productcategory pc on pc.ProductCategoryId = cpc.ProductCategoryId " +
                  "where cpc.companyid = " + req.params.idCompany

    // connection.connect(function(error){
    //     if(error) {
    //         throw error;
    //     }
    //     else
    //     {
            connection.query(query,function(error, results, fields) { 
                if (error) {
                    throw error;
                }
                else {
                    let categories = []
                    for (var index = 0 ; index < results.length ; index++) {
                        let categoryObject = new productCategory.ProductCategory()
                        categoryObject.id = results[index].ProductCategoryId;
                        categoryObject.name = results[index].name;
                        categories.push(categoryObject);
                    }
                    // connection.end(function(error){
                    //     if(error) {
                    //         throw error;
                    //     }
                    //     else {
                            res.render('companyproductcategories', {
                                title: 'Company Product Categories',
                                name: 'Team Kilimanjaro',
                                productCategories: JSON.stringify(categories)
                            })
                    //     }
                    // });
                }
            });
    //     }
    // });
})

app.get('/company/:idCompany(\\d+)/bulkstrategies', (req, res) => {

    const query = "select cpc.BulkStrategyId, pc.name " +
                  "from companybulkstrategy cpc " + 
                  "inner join bulkstrategy pc on pc.BulkStrategyId = cpc.BulkStrategyId " +
                  "where cpc.companyid = " + req.params.idCompany

    // connection.connect(function(error){
    //     if(error) {
    //         throw error;
    //     }
    //     else
    //     {
            connection.query(query,function(error, results, fields) { 
                if (error) {
                    throw error;
                }
                else {
                    let strategies = []
                    for (var index = 0 ; index < results.length ; index++) {
                        let strategyObject = new bulkStrategy.BulkStrategy()
                        strategyObject.id = results[index].BulkStrategyId;
                        strategyObject.name = results[index].name;
                        strategies.push(strategyObject);
                    }
                    // connection.end(function(error){
                    //     if(error) {
                    //         throw error;
                    //     }
                    //     else {
                            res.render('companybulkstrategies', {
                                title: 'Company Bulk Strategy',
                                name: 'Team Kilimanjaro',
                                bulkStrategies: JSON.stringify(strategies)
                            })
                    //     }
                    // });
                }
            });
    //     }
    // });
})

app.post('/company/create', (req, res) => {
    
    let name = req.body.name;
    let website = req.body.website;
    let city = req.body.city;
    let province = req.body.province;
    let address = req.body.address;
    let expiringItemsNote = req.body.expiringItemsNote;
    let provideReusableItemsNotes = req.body.provideReusableItemsNotes;
    let recentHistory = req.body.recentHistory;
    let comments = req.body.comments;
    let loosePercentage = req.body.loosePercentage;
    let discountExpiringItems = req.body.discountExpiringItems;
    let donateExpiringItems = req.body.donateExpiringItems;
    let throwOutExpiringItems = req.body.throwOutExpiringItems;
    let sellInBulk = req.body.sellInBulk;
    let byo = req.body.byo;
    let extraChargeSingleItem = req.body.extraChargeSingleItem;
    let provideReusableItems = req.body.provideReusableItems;
    let employeesUseSingleUseItems = req.body.employeesUseSingleUseItems;
    let employeesSingleUseItemsNotes = req.body.employeesSingleUseItemsNotes;

    
    connection.beginTransaction(function(err) {
        if (err) { throw err; }

        const query = "INSERT INTO Company (name, website, city, province, address, expiringItemsNote, provideReusableItemsNotes, " +
                        "recentHistory, comments, loosePercentage, discountExpiringItems, donateExpiringItems, " +
                        "throwOutExpiringItems, sellInBulk, byo, extraChargeSingleItem, provideReusableItems, " +
                        "employeesUseSingleUseItems, employeesSingleUseItemsNotes) " +
                        "Values ('" + 
                        name + "','" + website + "','" + city + "','" + province + "','" + address + "','" + expiringItemsNote + "','" + 
                        provideReusableItemsNotes + "','" + recentHistory + "','" + comments + "','" + loosePercentage + "'," + 
                        discountExpiringItems + "," + donateExpiringItems + "," + throwOutExpiringItems + "," + sellInBulk + ",'" + 
                        byo + "'," + extraChargeSingleItem + "," + provideReusableItems + "," + 
                        employeesUseSingleUseItems + ",'" + employeesSingleUseItemsNotes + "')";

        // console.log(query)
        
        connection.query(query, function (error, result) {
            if (error) {
                return connection.rollback(function() {
                    throw error;
                });
            }

            const companyId = result.insertId;
            // console.log("companyId: " + companyId)

            for(var key in req.body) {

                if (key.indexOf("category") != -1) {

                    // console.log(key  + ": " + req.body[key] + " - " + key.indexOf("category"))

                    if (parseInt(req.body[key]) == 1) {
    
                        const productCategoryId = parseInt(key.replace('category',''));
                        const queryCategory = `INSERT INTO CompanyProductCategory (CompanyId, ProductCategoryId) Values (${companyId}, ${productCategoryId})`;

                        // console.log(queryCategory)
                    
                        connection.query(queryCategory, function(err) {
                            if (err) {
                                return connection.rollback(function() {
                                    throw err;
                                });
                            }
                        })
                    }
                }
            }

            for(var key in req.body) {

                if (key.indexOf("strategy") != -1) {

                    // console.log(key  + ": " + req.body[key] + " - " + key.indexOf("category"))

                    if (parseInt(req.body[key]) == 1) {
    
                        const bulkStrategyId = parseInt(key.replace('strategy',''));
                        const queryStrategy = `INSERT INTO CompanyBulkStrategy (CompanyId, BulkStrategyId) Values (${companyId}, ${bulkStrategyId})`;

                        // console.log(queryStrategy)
                    
                        connection.query(queryStrategy, function(err) {
                            if (err) {
                                return connection.rollback(function() {
                                    throw err;
                                });
                            }
                        })
                    }
                }
            }

            connection.commit(function(err) {
                if (err) { 
                    connection.rollback(function() {
                        throw err;
                    });
                }
                console.log('Transaction Complete.');
            });
            
            res.redirect('/company/create');

        });
    });
})

app.get('/company/create/', (req, res) => {
    res.render('newcompany', {
        title: 'Register New Company',
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

app.get('/person/:userid/totalpackaging', (req, res) => {  // (\\d+) means an integer will be provided

    const query = "select sum(refillitem.quantity) as quantity " +
                    "from refill " +
                    "inner join refillitem on refill.refillid = refillitem.refillid " +
                    "inner join person on refill.personid = person.personid " +
                    "where person.userid = '" + req.params.userid + "'"

    let total = 0;
    connection.query(query,function(error, results) { 
        if (error) {
            throw error;
        }
        else {
            for (var index = 0 ; index < results.length ; index++) {
                total = results[0].quantity;
            }

            res.send({
                total: total
            })
        }
    });
})

app.get('/leaderboard', (req, res) => {

    const query = "select person.name, sum(refillitem.quantity) as quantity " +
                  "from person " +
                  "inner join refill on person.personid = refill.personid " +
                  "inner join refillitem on refill.refillid = refillitem.refillid " +
                  "group by person.name " +
                  "order by sum(refillitem.quantity) desc " +
                  "limit 3 "

    connection.query(query,function(error, results) { 
        if (error) {
            throw error;
        }
        else {
            res.json({
                leaders: results
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

app.get('/saverefill_simulation', (req, res) => {

    let personId = req.query.personId;

    if (!req.query.personId)
    {
        res.send({ error: "No personId informed in the querystring" })
    }
    else {
    // connection.connect(function(error){
    //     if(error) {
    //         throw error;
    //     }
    //     else {
            connection.beginTransaction(function(err) {
                if (err) { throw err; }

                let query = `INSERT INTO refill (PersonId, CompanyId) Values (${personId}, NULL)`
                
                connection.query(query, function(err, result) {
                    
                    if (err) { 
                        connection.rollback(function() {
                            throw err;
                        });
                    }
                    else 
                    {            
                        const refillId = result.insertId;
                        
                        let quantity = 1;

                        for (let categoryId = 1; categoryId < 15; categoryId++)
                        {
                            let queryRefillItem = 'INSERT INTO refillitem (RefillId, ProductCategoryId, Quantity)' +
                                                    `Values (${refillId}, ${categoryId}, ${quantity})`

                            connection.query(queryRefillItem, function(err) {
                                if (err) { 
                                    connection.rollback(function() {
                                        throw err;
                                    });
                                }
                            })

                            quantity = quantity + 2
                        }

                        connection.commit(function(err) {
                            if (err) { 
                                connection.rollback(function() {
                                    throw err;
                                });
                            }
                            // connection.end(function(error){
                            //     if(error) {
                            //         throw error;
                            //     }
                            //     else {
                                    console.log('Transaction Complete.');
                                    res.send("Refill saved!")
                            //     }
                            // });
                        });

                    }
                })
            });
    //     }
    // });        
    }
});

app.post('/search', (req, res) => {

    const query = "select companyId, name " +
                    "from company " +
                    "where name like '%" + req.body.search + "%' " + 
                    "or exists (select 1 from companyproductcategory cpc " + 
                    "           inner join productcategory pc on cpc.ProductCategoryId = pc.ProductCategoryId " + 
                    "           where company.CompanyId = cpc.CompanyId " + 
                    "           and pc.name like '%" + req.body.search + "%')"
                    
    connection.query(query,function(error, results, fields) { 
        if (error) {
            res.send({ error: error })
        }
        else {
            let companies = []
            for (var index = 0 ; index < results.length ; index++) {
                let companyObject = new company.Company()
                companyObject.id = results[index].companyId;
                companyObject.name = results[index].name;
                companies.push(companyObject);
            }
            res.json({
                companies: companies
            })
        }
    });
});

app.get('/search', (req, res) => {
    res.render('search', {
        title: 'search',
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