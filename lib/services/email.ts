import nodemailer from "nodemailer";

interface FeedbackEmailData {
  name: string;
  email: string;
  category: string;
  description: string;
}

export class EmailService {
  private static createTransporter() {
    return nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }

  static async sendFeedbackEmail(
    data: FeedbackEmailData,
  ): Promise<{ success: boolean; error?: string }> {
    try {
      const transporter = this.createTransporter();

      const categoryEmojis: { [key: string]: string } = {
        bug: "🐛",
        improvement: "💡",
        feature: "✨",
        contact: "📞",
        other: "📝",
      };

      const categoryLabels: { [key: string]: string } = {
        bug: "Bug Report",
        improvement: "Improvement Suggestion",
        feature: "Feature Request",
        contact: "General Contact",
        other: "Other",
      };

      const emoji = categoryEmojis[data.category] || "📝";
      const categoryLabel = categoryLabels[data.category] || "Other";
      const currentDate = new Date().toLocaleString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        timeZoneName: "short",
      });

      const mailOptions = {
        from: data.email,
        to: process.env.EMAIL_USER,
        replyTo: data.email,
        subject: `${emoji} SummarizeAI Feedback: ${categoryLabel} from ${data.name}`,
        html: `
          <html>
          <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            
            <h1 style="color: #4F6BFF; border-bottom: 2px solid #4F6BFF; padding-bottom: 10px;">
              ${emoji} SummarizeAI Feedback
            </h1>
            
            <div style="background: #f9f9f9; padding: 20px; margin: 20px 0; border-radius: 5px;">
              <h3 style="margin-top: 0; color: #333;">Feedback Details</h3>
              
              <p><strong>Category:</strong> ${emoji} ${categoryLabel}</p>
              <p><strong>Name:</strong> ${data.name}</p>
              <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
              <p><strong>Date:</strong> ${currentDate}</p>
            </div>
            
            <div style="margin: 20px 0;">
              <h3 style="color: #333;">Message:</h3>
              <div style="background: #f9f9f9; padding: 15px; border-radius: 5px; border-left: 4px solid #4F6BFF;">
                <p style="margin: 0; white-space: pre-wrap;">${data.description}</p>
              </div>
            </div>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; text-align: center; color: #666; font-size: 14px;">
              <p>SummarizeAI - AI-Powered Document Summarization</p>
            </div>
            
          </body>
          </html>
        `,
        text: `
SummarizeAI Feedback: ${categoryLabel}

From: ${data.name} <${data.email}>
Category: ${categoryLabel}
Date: ${currentDate}

Message:
${data.description}

---
SummarizeAI - AI-Powered Document Summarization
Reply to this email to respond directly to ${data.name}.
        `.trim(),
      };

      await transporter.sendMail(mailOptions);
      console.log(
        `✅ Feedback email sent successfully to 512syedalihamza@gmail.com`,
      );

      return { success: true };
    } catch (error) {
      console.error("❌ Email sending failed:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to send email",
      };
    }
  }
}
