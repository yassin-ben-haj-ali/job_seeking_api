const Application = require("../models/applicationSchema");
const Job = require("../models/jobSchema");
const { BadRequestError, NotFoundError } = require("../utils/appErrors");

const postApplication = async (body, JobId, JobSeekerId) => {
    const { name, email, phone, address, resume,coverLetter  } = body;
    if (!name || !email || !phone || !address || !coverLetter) {
        throw new BadRequestError("All fields are required.")
    }
    const isAlreadyApplied = await Application.findOne({
        "jobInfo.JobId": JobId,
        "jobSeekerInfo.id": JobSeekerId
    });
    if (isAlreadyApplied) {
        throw new BadRequestError("You have already applied for this job.")
    }
    const jobSeekerInfo = {
        id: JobSeekerId,
        name,
        email,
        phone,
        address,
        resume,
        coverLetter,
        role: "Job Seeker"
    }
    const jobDetails = await Job.findById(JobId);
    if (!jobDetails) {
        throw new NotFoundError("Job not found.")
    }
    const employerInfo = {
        id: jobDetails.postedBy,
        role: "Employer"
    }
    const jobInfo = {
        JobId,
        JobTitle: jobDetails.title
    }
    const application = await Application.create({
        jobSeekerInfo,
        employerInfo,
        jobInfo
    })
    return application;
}

module.exports = {
    postApplication
}