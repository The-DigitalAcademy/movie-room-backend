const db = require("../models");
const Movie = db.movies;

// Create and Save a new Movie
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Movie
  const movie = new Movie({
    title: req.body.title,
    description: req.body.description,
    genre: req.body.genre,
    release_date: req.body.release_date,
    duration: req.body.duration,
    image_url: req.body.image_url
  });

  // Save Movie in the database
  movie
    .save(movie)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Movie."
      });
    });
};

// Retrieve all Movies from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};
  
    Movie.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Movies."
        });
    });
};

// Find a single Movie with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

  Movie.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Movie with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Movie with id=" + id });
    });
};

//find by Title
exports.findByTitle = (req, res) => {
  const title = req.query.title;

  Movie.findOne( title)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Movie with title " + title });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Movie with title=" + title });
    });
};


// Update a Movie by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
          message: "Data to update can not be empty!"
        });
      }
    
      const id = req.params.id;
    
      Movie.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
          if (!data) {
            res.status(404).send({
              message: `Cannot update Movie with id=${id}. Maybe Movie was not found!`
            });
          } else res.send({ message: "Movie was updated successfully." });
        })
        .catch(err => {
          res.status(500).send({
            message: "Error updating Movie with id=" + id
        });
    });
};

// Delete a Movie with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

  Movie.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Movie with id=${id}. Maybe Movie was not found!`
        });
      } else {
        res.send({
          message: "Movie was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Movie with id=" + id
      });
    });
};

// Delete all Movies from the database.
// exports.deleteAll = (req, res) => {
//     Movie.deleteMany({})
//     .then(data => {
//       res.send({
//         message: `${data.deletedCount} Movies were deleted successfully!`
//       });
//     })
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while removing all Movies."
//       });
//     });
// };

// Find all published Movies
exports.findAllPublished = (req, res) => {
    Movie.find({ published: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Movies."
      });
    });
};