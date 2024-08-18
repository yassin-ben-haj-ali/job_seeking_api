const JobService = require('../services/jobService')

const createJob = async (req, res) => {
    const job = await JobService.createJob(req.body, req.user);
    return res.status(201).json({ success: true, message: "Job Created.", job });
};


module.exports = {
    createJob
}