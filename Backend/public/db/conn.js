require('dotenv').config()
const mongoose = require('mongoose')
<<<<<<< HEAD
const CONNECTION_URL = process.env.CONNECTION_URL
=======
const CONNECTION_URL = process.env.MONGO_URL
>>>>>>> 7a753fd14e5ce516d7e6fe2606c555ff762fb2f5

mongoose.connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connection Successful');
}).catch((e) => {
    console.log(e);
})