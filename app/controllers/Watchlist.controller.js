const db = require("../models");
const Wishlist = db.wishlist;

// Create and Save a new Wishlist
exports.create = (req, res) => {
  // Validate request


//   console.log(req.body)
  if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Wishlist
  const wishlist = new Wishlist({
    title: req.body.title,
    description: req.body.description,
    genre: req.body.genre,
    release_date: req.body.release_date,
    duration: req.body.duration,
    image_url: req.body.image_url
  });

  // Save Wishlist in the database
  wishlist
    .save(wishlist)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Wishlist."
      });
    });
};

// Retrieve all Wishlists from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};
  
    Wishlist.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Wishlists."
        });
    });
};

// Find a single Wishlist with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

  Wishlist.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Wishlist with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Wishlist with id=" + id });
    });
};

// Update a Wishlist by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
          message: "Data to update can not be empty!"
        });
      }
    
      const id = req.params.id;
    
      Wishlist.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
          if (!data) {
            res.status(404).send({
              message: `Cannot update Wishlist with id=${id}. Maybe Wishlist was not found!`
            });
          } else res.send({ message: "Wishlist was updated successfully." });
        })
        .catch(err => {
          res.status(500).send({
            message: "Error updating Wishlist with id=" + id
        });
    });
};

// Delete a Wishlist with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

  Wishlist.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Wishlist with id=${id}. Maybe Wishlist was not found!`
        });
      } else {
        res.send({
          message: "Wishlist was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Wishlist with id=" + id
      });
    });
};

// Delete all Wishlists from the database.
exports.deleteAll = (req, res) => {
    Wishlist.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Wishlists were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Wishlists."
      });
    });
};

// Find all published Wishlists
exports.findAllPublished = (req, res) => {
    Wishlist.find({ published: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Wishlists."
      });
    });
};