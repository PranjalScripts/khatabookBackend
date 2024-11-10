const ClientUser = require("../../models/clientUserModel/clientUserModel"); // Import the model

// Create a new ClientUser
exports.createClientUser = async (req, res) => {
  try {
    // Assuming the userId is sent in the body
    const { name, mobile, email } = req.body;

    // Create a new ClientUser instance and set the userId
    const newClientUser = new ClientUser({
      name,
      mobile,
      email,
        user: req.userId, // userId from the decoded token, ensure it's available
      userId: req.userId, // userId from the decoded token, ensure it's available
    });

    // Save the new client user to the database
    await newClientUser.save();

    // Send back the created client user
    res.status(201).json(newClientUser);  
  } catch (error) { 
    console.error(error);
    res
      .status(500)
      .json({ message: "Server error. Could not create client user." });
  }
};

// Get all ClientUsers
exports.getAllClientUsers = async (req, res) => {
  try {
    const clientUsers = await ClientUser.find().populate("user", "name email");
    res.status(200).json(clientUsers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get a single ClientUser by ID
exports.getClientUserById = async (req, res) => {
  try {
    const clientUser = await ClientUser.findById(req.params.id).populate(
      "user",
      "name email"
    );
    if (!clientUser) {
      return res.status(404).json({ message: "ClientUser not found" });
    }
    res.status(200).json(clientUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update a ClientUser by ID
exports.updateClientUser = async (req, res) => {
  try {
    const { name, mobile, email, userId } = req.body;
    const updatedClientUser = await ClientUser.findByIdAndUpdate(
      req.params.id,
      { name, mobile, email, userId },
      { new: true }
    );
    if (!updatedClientUser) {
      return res.status(404).json({ message: "ClientUser not found" });
    }
    res
      .status(200)
      .json({
        message: "ClientUser updated successfully",
        clientUser: updatedClientUser,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete a ClientUser by ID
exports.deleteClientUser = async (req, res) => {
  try {
    const clientUser = await ClientUser.findByIdAndDelete(req.params.id);
    if (!clientUser) {
      return res.status(404).json({ message: "ClientUser not found" });
    }
    res.status(200).json({ message: "ClientUser deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
