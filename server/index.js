const app = require('./config/express');
const config = require('./config/config');
const port = config.port;

app.listen(1234, () => console.info(`server started on port ${port}`));

module.exports = app;