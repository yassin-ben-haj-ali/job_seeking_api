const Job = require("../models/jobSchema");
const { BadRequestError } = require("../utils/appErrors");


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



}

module.exports={
    createJob
}