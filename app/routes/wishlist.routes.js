module.exports = app => {
    const wishlists = require("../controllers/Watchlist.controller");
  
    var router = require("express").Router();
  
    // Create a new Movie
    router.post("/", wishlists.create);
  
    // Retrieve all wishlistss
    router.get("/", wishlists.findAll);
  
    // Retrieve all published wishlistss
    router.get("/published", wishlists.findAllPublished);
  
    // Retrieve a single wishlists with id
    router.get("/:id", wishlists.findOne);
  
    // Update a wishlists with id
    router.put("/:id", wishlists.update);
  
    // Delete a wishlists with id
    router.delete("/:id", wishlists.delete);
  
    // Delete all wishlists
    router.delete("/", wishlists.deleteAll);
  
    app.use('/api/wishlists', router);
};