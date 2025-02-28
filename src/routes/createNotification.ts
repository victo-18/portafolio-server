import { Response, Request } from "express";
import { emailNotification } from "../notification/sendEmail";
/**
 * Handles the creation and sending of a notification email.
 * 
 * @async
 * @function createNotification
 * @param {Request} req - The Express request object containing the email details in the request body.
 * @param {Response} res - The Express response object used to send the response back to the client.
 * @returns {Promise<void>} - A promise that resolves when the process is completed.
 * 
 * @throws {Error} - Logs an error message if the email could not be sent.
 */
export const createNotification = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name: customerName, email: customerEmail, subject, message } = req.body;
      // Asegurar que req.body tiene datos
  if (!req.body || Object.keys(req.body).length === 0) {
    console.error("❌ Error: data wasn't send");
    res.status(400).json({ message: "Bad Request: No data received" });
    return;
  }
    await emailNotification(customerName, subject, customerEmail, message);
    res.status(200).json({ message: "The email has been successfully sent." });
  } catch (error) {
    console.error("The message haven't send");
    throw new Error("Internal server error")
  }
};
