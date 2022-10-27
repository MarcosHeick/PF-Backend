const { Review, User, Product } = require('../db')

const postReview = async (req, res) => {
    const { product_id } = req.params;
    const { description, score, user_id } = req.body;
    console.log(user_id);
    const newReview = await Review.create({ description, score, product_id, user_id })

    res.status(201).json(newReview)
}

const putReview = async (req, res) => {
    const { score, description } = req.body;
    const { id_review } = req.params;

    const changeReview = Review.update({
        description: description,
        score: score
    }, { where: { id: id_review } })

    res.status(200).json(changeReview)

}

const getReview = async (req, res) => {

    const { product_id } = req.params

    const allReviews2 = await Review.findAll({

        where: { product_id: product_id },

        include: [{ model: User }]
    })


    console.log(allReviews2);
    res.status(200).json(allReviews2);
}

const getAllReview = async (req, res) => {


    const allReviews = await Review.findAll({
        include: [{ model: User }]
    })


    console.log(allReviews);
    res.status(200).json(allReviews);

}

module.exports = { postReview, getReview, getAllReview };