const ClientUser = require("../../models/clientUserModel/clientUserModel");

// Create a new client user
exports.createClientUser = async (req, res) => {
  try {
    const { name, mobile, email } = req.body;
    const userId = req.userId;

    // Check if a client with the same email or mobile already exists for the logged-in user
    const existingClient = await ClientUser.findOne({
      $or: [{ email }, { mobile }],
      userId,
    });

    if (existingClient) {
      return res.status(400).json({
        success: false,
        message: "Client with the same email or mobile number already exists.",
      });
    }

    // Create a new client user if no duplicates found
    const clientUser = new ClientUser({
      userId,
      name,
      mobile,
      email,
    });

    await clientUser.save();
    res.status(201).json({ success: true, data: clientUser });
  } catch (error) {
    // Check for MongoDB unique constraint errors
    if (error.code === 11000) {
      const field = error.keyValue.email ? "email" : "mobile";
      return res.status(400).json({
        success: false,
        message: `Client with this ${field} already exists.`,
      });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all client users created by the logged-in user
exports.getClientUsers = async (req, res) => {
  try {
    const userId = req.userId;

    // Find all client users associated with the logged-in user
    const clientUsers = await ClientUser.find({ userId });
    res.status(200).json({ success: true, data: clientUsers });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get a single client user by ID, only if created by the logged-in user
exports.getClientUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const clientUser = await ClientUser.findOne({ _id: id, userId });

    if (!clientUser) {
      return res
        .status(404)
        .json({ success: false, message: "Client not found" });
    }

    res.status(200).json({ success: true, data: clientUser });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update a client user, only if created by the logged-in user
exports.updateClientUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;
    const { name, mobile, email } = req.body;

    // Update the client user only if it belongs to the logged-in user
    const clientUser = await ClientUser.findOneAndUpdate(
      { _id: id, userId },
      { name, mobile, email },
      { new: true, runValidators: true }
    );

    if (!clientUser) {
      return res
        .status(404)
        .json({ success: false, message: "Client not found" });
    }

    res.status(200).json({ success: true, data: clientUser });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete a client user, only if created by the logged-in user
exports.deleteClientUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    // Delete the client user only if it belongs to the logged-in user
    const clientUser = await ClientUser.findOneAndDelete({ _id: id, userId });

    if (!clientUser) {
      return res
        .status(404)
        .json({ success: false, message: "Client not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Client deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
