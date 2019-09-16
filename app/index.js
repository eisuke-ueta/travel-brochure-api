const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const multer = require('multer')
const PORT = process.env.PORT || 4000

// Controllers
const auth = require('./controllers/auth')
const signup = require('./controllers/signup')
const login = require('./controllers/login')
const profile = require('./controllers/profile')
const user = require('./controllers/user')
const follow = require('./controllers/follow')
const favorite = require('./controllers/favorite')
const star = require('./controllers/star')
const brochure = require('./controllers/brochure')
const contact = require('./controllers/contact')

const app = express()
app.use(cors())
app.use(morgan('combined'))
app.use(bodyParser.json())

const storage = multer.memoryStorage()
const upload = multer({ storage: storage }).single('file')

// Endpoints
app.get('/auth', auth.guard, (request, response) =>
  auth.getCurrentUser(request, response)
)

app.post('/signup', (request, response) => signup.signup(request, response))
app.post('/signup/complete', (request, response) =>
  signup.completeSignup(request, response)
)
app.post('/signup/reset_password', (request, response) =>
  signup.resetPassword(request, response)
)
app.post('/signup/change_password', (request, response) =>
  signup.changePassword(request, response)
)
app.post('/login', (request, response) => login.login(request, response))
app.delete('/logout', auth.guard, (request, response) =>
  login.logout(request, response)
)

app.post('/contact', (request, response) => contact.send(request, response))

app.get('/profile', auth.guard, (request, response) =>
  profile.get(request, response)
)
app.post('/profile/update', auth.guard, upload, async (request, response) =>
  profile.update(request, response)
)
app.post('/profile/change_password', auth.guard, (request, response) =>
  profile.changePassword(request, response)
)
app.post('/profile/change_email', auth.guard, (request, response) =>
  profile.changeEmail(request, response)
)
app.post('/profile/confirm_email', auth.guard, (request, response) =>
  profile.confirmEmail(request, response)
)
app.delete('/profile/delete', auth.guard, (request, response) =>
  profile.deleteAccount(request, response)
)

app.get('/user', auth.guard, (request, response) =>
  user.getById(request, response)
)
app.get('/users/follows', auth.guard, (request, response) =>
  user.getFollows(request, response)
)
app.get('/users/followers', auth.guard, (request, response) =>
  user.getFollowers(request, response)
)
app.get('/users/ranking', auth.guard, (request, response) =>
  user.getByRanking(request, response)
)

app.post('/follow', auth.guard, (request, response) =>
  follow.follow(request, response)
)
app.post('/unfollow', auth.guard, (request, response) =>
  follow.unfollow(request, response)
)

app.post('/favorite', auth.guard, (request, response) =>
  favorite.favorite(request, response)
)
app.post('/unfavorite', auth.guard, (request, response) =>
  favorite.unfavorite(request, response)
)

app.post('/star', auth.guard, (request, response) =>
  star.star(request, response)
)
app.post('/unstar', auth.guard, (request, response) =>
  star.unstar(request, response)
)

app.get('/brochures', auth.guard, (request, response) =>
  brochure.get(request, response)
)
app.get('/brochures/ranking', auth.guard, (request, response) =>
  brochure.getByRanking(request, response)
)
app.get('/brochures/share', auth.guard, (request, response) =>
  brochure.getByShareId(request, response)
)
app.get('/brochure', auth.guard, (request, response) =>
  brochure.getById(request, response)
)
app.post('/brochure/create', auth.guard, (request, response) =>
  brochure.create(request, response)
)
app.post('/brochure/update', auth.guard, (request, response) =>
  brochure.update(request, response)
)
app.post('/brochure/delete', auth.guard, (request, response) =>
  brochure.deleteById(request, response)
)

app.listen(PORT, () => {
  console.info(`app is running on port ${PORT}`)
})
