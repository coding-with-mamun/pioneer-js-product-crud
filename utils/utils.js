// Utility function to generate a unique ID
const generateUniqueId = () => "id-" + Math.random().toString(36).slice(2, 18);

// Utility function to get the current timestamp
const getCurrentTimestamp = () => new Date().toISOString();
