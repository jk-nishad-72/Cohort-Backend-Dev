
const app = require('./src/app');


app.get('/', (req, res) => {
    
    res.render('index');

});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});