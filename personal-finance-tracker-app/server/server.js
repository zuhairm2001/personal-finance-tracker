
// Error handling middleware
App.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Soemthing broke!');
});

