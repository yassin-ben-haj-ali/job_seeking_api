const Job = require("../models/jobSchema");
const { BadRequestError, NotFoundError } = require("../utils/appErrors");


const createJob = async (body, user) => {
    const { title, jobType, location, companyName, introduction, responsibilities, qualifications, offers, salary, hiringMultipleCandidates, personalWebsiteUrl, personalWebsiteTitle, jobNiche, newsLetterSent } = body;
    const { _id: postedBy } = user
    if (
        !title ||
        !jobType ||
        !location ||
        !companyName ||
        !introduction ||
        !responsibilities ||
        !qualifications ||
        !salary ||
        !jobNiche
    ) {
        throw new BadRequestError("Please provide full job details.")
    }
    if (!personalWebsiteTitle || !personalWebsiteUrl) {
        throw new BadRequestError("Provide both the website url and title, or leave both blank.")
    }
    const job = await Job.create({
        title,
        jobType,
        location,
        companyName,
        introduction,
        responsibilities,
        qualifications,
        offers,
        salary,
        hiringMultipleCandidates,
        personalWebsite: {
            title: personalWebsiteTitle,
            url: personalWebsiteUrl
        },
        jobNiche,
        newsLetterSent,
        postedBy
    })

    return job

}


const getAllJobs = async (keyword = null) => {
    const { city, niche, searchKeyword } = keyword;
    const query = {}
    if (city) {
        query.location = city
    }
    if (niche) {
        query.jobNiche = niche
    }
    if (searchKeyword) {
        const regexPattern = new RegExp(searchKeyword, 'i');
        query.$or = [
            { title: regexPattern },
            { companyName: regexPattern },
            { introduction: regexPattern }
        ]
    }
    const jobs = await Job.find(query)
    return { jobs, count: jobs.length }
}

const getMyJobs = async (userId) => {
    const myJobs = await Job.find({ postedBy: userId });
    return myJobs
}

const deleteJob = async (jobId) => {
    const job = await Job.findById(jobId);
    if (!job) {
        throw new NotFoundError("Oops! job not found.")
    }
    await job.deleteOne();
    return job;
}

const getSingleJob = async (jobId) => {
    const job = await Job.findById(jobId);
    if (!job) {
        throw new NotFoundError("Job not found.")
    }
    return job;
}

module.exports = {
    createJob,
    getAllJobs,
    getMyJobs,
    deleteJob,
    getSingleJob
}