const Review = require('../models/review');
const Listing = require('../models/listing');

module.exports.createReview =  async (req, res) => {
   let listing= await Listing.findById(req.params.id);
   let newReview = new Review(req.body.review);
    newReview.author = req.user._id;
   listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();

    console.log("new review added"); 
    req.flash("success", "New review added");
    res.redirect(`/listings/${listing._id}`);
};

module.exports.destroyReview = async (req, res) => {
    let {id, reviewId} = req.params;
    await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);
    console.log("review deleted");
    req.flash("success", "Review Deleted!");
    res.redirect(`/listings/${id}`);
};