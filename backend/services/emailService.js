/**
 * services/emailService.js - Email notification service
 * TODO: Integrate with Nodemailer + SendGrid / AWS SES
 */

/**
 * sendWelcomeEmail - Sends welcome email after registration
 * @param {string} to - Recipient email
 * @param {string} name - Recipient name
 */
const sendWelcomeEmail = async (to, name) => {
    // TODO: Compose and send welcome email via Nodemailer
    console.log(`[EMAIL PLACEHOLDER] Welcome email → ${to}`);
};

/**
 * sendEnquiryNotification - Notifies owner of new student enquiry
 */
const sendEnquiryNotification = async (ownerEmail, listingTitle) => {
    // TODO: Compose and send notification
    console.log(`[EMAIL PLACEHOLDER] Enquiry notification → ${ownerEmail}`);
};

/**
 * sendListingApprovalEmail - Notifies owner of admin decision on listing
 */
const sendListingApprovalEmail = async (ownerEmail, status, listingTitle) => {
    // TODO: Send approved/rejected email
    console.log(`[EMAIL PLACEHOLDER] Listing ${status} → ${ownerEmail}`);
};

module.exports = { sendWelcomeEmail, sendEnquiryNotification, sendListingApprovalEmail };
