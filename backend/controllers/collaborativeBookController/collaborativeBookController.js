const Transaction = require("../../models/transactionModel/transactionModel");
const ClientUser = require("../../models/clientUserModel/clientUserModel");

/**
 * Fetch transactions for a client based on their email
 */
const getTransactions = async (req, res) => {
  try {
    const loggedInUserEmail = req.user.email; // Email from authenticated user

    // Find the ClientUser that matches the logged-in user's email
    const clientUser = await ClientUser.findOne({ email: loggedInUserEmail });

    if (!clientUser) {
      return res
        .status(404)
        .json({ message: "No client record found for this email." });
    }

    // Fetch transactions for the matched client user
    const transactions = await Transaction.find({
      clientUserId: clientUser._id,
    })
      .populate("bookId", "bookname") // Populate book details
      .populate("userId", "name email") // Populate the user who registered the transaction
      .exec();

    if (!transactions.length) {
      return res.status(404).json({ message: "No transactions found." });
    }

    res.status(200).json(transactions);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching transactions." });
  }
};

module.exports = {
  getTransactions,
};
