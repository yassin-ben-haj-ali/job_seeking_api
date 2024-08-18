const JobService = require('../services/jobService')

const createJob = async (req, res) => {
    const job = await JobService.createJob(req.body, req.user);
    return res.status(201).json({ success: true, message: "Job Created.", job });
};

const getAllJobs = async (req, res) => {
    const { jobs, count } = await JobService.getAllJobs(req.query);
    return res.status(201).json({ success: true, jobs, count });
};

const getMyJobs = async (req, res) => {
    const jobs = await JobService.getMyJobs(req.user._id);
    return res.status(201).json({ success: true, jobs });
};

const deleteJob = async (req, res) => {
    const job = await JobService.deleteJob(req.params.id);
    return res.status(201).json({ success: true, job });
};

const getSingleJob = async (req, res) => {
    const job = await JobService.getSingleJob(req.params.id);
    return res.status(201).json({ success: true, job });
};

module.exports = {
    createJob,
    getAllJobs,
    getMyJobs,
    deleteJob,
    getSingleJob
}