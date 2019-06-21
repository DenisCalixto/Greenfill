const path = require('path')
const express = require('express')
const hbs = require('hbs')

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
    res.render('leaderboard', {
        title: 'Leaderboards',
        name: 'Team Kilimanjaro'
    })
})

app.get('/refill', (req, res) => {
    res.render('refill', {
        title: 'Refill',
        name: 'Team Kilimanjaro'
    })
})

app.get('/search', (req, res) => {
    res.render('search', {
        title: 'Search',
        name: 'Team Kilimanjaro'
    })
})

// app.get('/guide/*', (req, res) => {
//     res.render('404', {
//         title: '404',
//         name: 'Team Kilimanjaro',
//         errorMessage: 'Guide article not found.'
//     })
// })

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