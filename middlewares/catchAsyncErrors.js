const catchAsyncErrors = (fn) => {

    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch((error)=>next(error));
    }

}

module.exports=catchAsyncErrors