const { v4: uuidv4 } = require('uuid');

const generateUniqueSlug = (name) => {
  // Convert name to lowercase and replace spaces/special chars with hyphens
  const baseSlug = name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-');

  // Generate a short UUID (first 8 characters)
  const shortUuid = uuidv4().split('-')[0];
  
  // Combine base slug with UUID
  return `${baseSlug}-${shortUuid}`;
};

module.exports = {
  generateUniqueSlug,
};
