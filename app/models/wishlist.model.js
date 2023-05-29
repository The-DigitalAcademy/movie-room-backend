module.exports = mongoose => {
    const Wishlist = mongoose.model(
      "wishlist",
      mongoose.Schema(
        {
          title: String,
          description: String,
          cast: String,
          age_rating: String,
          Director: String,
          genre: String,
          release_date: Number,
          duration: Number,
          Ratings: Number,
          youtube_url: String,
          image_url: String,
          background_url: String,
          uid:String
        },
      )
    );
  
    return Wishlist;
  };