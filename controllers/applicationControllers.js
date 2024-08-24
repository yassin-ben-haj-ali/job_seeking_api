const ApplicationService = require('../services/applicationService');

const postApplication = async (req, res) => {
    const { id: JobId } = req.params;
    const { _id: JobSeekerId } = req.user;
    const application = await ApplicationService.postApplication(req.body, JobId, JobSeekerId);
    return res.status(201).json({ success: true, message: "Application submitted.", application });
};



module.exports = {
    postApplication
}