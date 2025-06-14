const { Projects, Vulnerabilities } = require("../models");

// Get all projects
exports.getAllProjects = async (req, res) => {
  try {
    console.log("getAllProjects :: ");
    
    // First fetch all projects
    const projects = await Projects.find({})
      .sort({ lastModifiedDate: -1 }) // Sort by last modified date, newest first
      .select('name slug description organization branch lastModifiedDate'); // Select specific fields

    // Fetch vulnerabilities for all projects in parallel
    const projectsWithVulnerabilities = await Promise.all(
      projects.map(async (project) => {
        const vulnerabilities = await Vulnerabilities.find({ projectId: project._id })
          .sort({ createdAt: -1 })
          .select('branch commit PR_link tags vulnerabilityList createdAt');

        return {
          ...project.toObject(),
          vulnerabilities
        };
      })
    );

    res.status(200).json({
      data: projectsWithVulnerabilities,
      message: "Projects and vulnerabilities fetched successfully",
    });
  } catch (error) {
    console.error("Error in getAllProjects:", error);
    res.status(500).json({ 
      error: "Failed to fetch projects and vulnerabilities",
      details: error.message 
    });
  }
};