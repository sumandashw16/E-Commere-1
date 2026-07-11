module.exports.addToCart = async (req, res) => {
    try{
        let product_id = req.params.id
        if (!req.user.cart.includes(product_id)){
            req.user.cart.push(product_id)
            await req.user.save()
        }
        res.redirect("/shop")
    }catch(err){
        console.log(err.message)
    }
}