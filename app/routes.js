const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

function generateReference (prefix) {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let ref = prefix + '-'
  for (let i = 0; i < 8; i++) {
    ref += chars[Math.floor(Math.random() * chars.length)]
  }
  return ref
}

router.get('/', function (req, res) {
  res.redirect('/start')
})

router.get('/baby-age', function (req, res) {
  res.render('baby-age')
})

router.post('/baby-age', function (req, res) {
  const answer = req.session.data['baby-age']
  if (!answer || !answer.toString().trim()) {
    res.locals.errors = { 'baby-age': 'Tell us how old your baby is.' }
    return res.render('baby-age')
  }
  if (answer === 'under-6-months') {
    return res.redirect('/ineligible-baby-age')
  } else if (answer === '6-months-to-1-year') {
    return res.redirect('/favourite-film')
  } else if (answer === '1-to-2-years') {
    return res.redirect('/favourite-film')
  }
  res.redirect('/favourite-film')
})

router.get('/ineligible-baby-age', function (req, res) {
  res.render('ineligible-baby-age')
})

router.get('/favourite-film', function (req, res) {
  res.render('favourite-film')
})

router.post('/favourite-film', function (req, res) {
  const answer = req.session.data['favourite-film']
  if (!answer || !answer.toString().trim()) {
    res.locals.errors = { 'favourite-film': 'Tell us your baby\'s favourite film.' }
    return res.render('favourite-film')
  }
  res.redirect('/film-character')
})

router.get('/film-character', function (req, res) {
  res.render('film-character')
})

router.post('/film-character', function (req, res) {
  const answer = req.session.data['film-character']
  if (!answer || !answer.toString().trim()) {
    res.locals.errors = { 'film-character': 'Tell us which character your baby likes.' }
    return res.render('film-character')
  }
  if (answer === 'main-character') {
    return res.redirect('/teddy-size')
  } else if (answer === 'helper-character') {
    return res.redirect('/teddy-size')
  } else if (answer === 'animal-character') {
    return res.redirect('/teddy-size')
  } else if (answer === 'bad-character') {
    return res.redirect('/ineligible-film-character')
  }
  res.redirect('/teddy-size')
})

router.get('/ineligible-film-character', function (req, res) {
  res.render('ineligible-film-character')
})

router.get('/teddy-size', function (req, res) {
  res.render('teddy-size')
})

router.post('/teddy-size', function (req, res) {
  const answer = req.session.data['teddy-size']
  if (!answer || !answer.toString().trim()) {
    res.locals.errors = { 'teddy-size': 'Tell us how big you want the teddy bear.' }
    return res.render('teddy-size')
  }
  if (answer === 'small') {
    return res.redirect('/baby-name')
  } else if (answer === 'medium') {
    return res.redirect('/baby-name')
  } else if (answer === 'big') {
    return res.redirect('/baby-name')
  }
  res.redirect('/baby-name')
})

router.get('/baby-name', function (req, res) {
  res.render('baby-name')
})

router.post('/baby-name', function (req, res) {
  const answer = req.session.data['baby-name']
  if (!answer || !answer.toString().trim()) {
    res.locals.errors = { 'baby-name': 'Tell us your baby\'s name.' }
    return res.render('baby-name')
  }
  res.redirect('/check-answers')
})

router.get('/check-answers', function (req, res) {
  res.render('check-answers')
})

router.post('/check-answers', function (req, res) {
  if (!req.session.data['reference']) {
    req.session.data['reference'] = generateReference('FTB')
  }
  res.redirect('/confirmation')
})

router.get('/confirmation', function (req, res) {
  res.render('confirmation')
})

module.exports = router
