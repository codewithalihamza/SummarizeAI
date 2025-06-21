import { SummaryReel } from "@/types";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

/**
 * Generate an emoji-enhanced summary using Gemini Flash 2.0
 * @param text - The extracted text from PDF
 * @returns Promise<string> - The generated emoji-enhanced summary
 */
export async function generateAISummary(text: string): Promise<string> {
    try {
        // Initialize the model
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        // Create the prompt for emoji-enhanced summary
        const prompt = `
    Create a concise, engaging summary of the following text that would work well as an Instagram-style "summary reel". 
      
      Requirements:
      - Keep it under 500 words
      - Use relevant emojis throughout to make it visually appealing
      - Structure it with clear sections using emojis as headers
      - Make it engaging and easy to read
      - Highlight the most important key points
      - Use bullet points or numbered lists where appropriate
      - End with a call-to-action or key takeaway
      
      Text to summarize:
      ${text}
    `;

        // Generate the summary
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const summary = response.text();

        if (!summary) {
            throw new Error("No summary generated from AI");
        }

        return summary;
    } catch (error) {
        console.error("Error generating AI summary:", error);
        throw new Error(
            `Failed to generate AI summary: ${error instanceof Error ? error.message : "Unknown error"}`,
        );
    }
}

/**
 * Generate summary points for Instagram-style display
 * @param text - The extracted text from PDF
 * @returns Promise<SummaryReel> - Structured summary data for visual display
 */
export async function generateSummaryReel(text: string): Promise<SummaryReel> {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

        const prompt = `
      Create a structured summary perfect for an Instagram-style "summary reel" from the following text.
      
      IMPORTANT: Return ONLY a valid JSON object with no markdown formatting, no code blocks, no backticks, and no additional text.
      
      Return a JSON object with this exact structure:
      {
        "title": "Catchy title with emoji (max 60 characters)",
        "subtitle": "Brief subtitle (max 100 characters)",
        "keyPoints": [
          "Key point 1 with emoji (max 120 characters)",
          "Key point 2 with emoji (max 120 characters)",
          "Key point 3 with emoji (max 120 characters)",
          "Key point 4 with emoji (max 120 characters)",
          "Key point 5 with emoji (max 120 characters)"
        ],
        "callToAction": "Engaging call-to-action with emoji (max 100 characters)",
        "hashtags": ["#hashtag1", "#hashtag2", "#hashtag3", "#hashtag4", "#hashtag5"],
        "emoji": "Single representative emoji for the entire summary"
      }
      
      Requirements:
      - Use relevant emojis throughout
      - Keep within character limits
      - Make it engaging and visually appealing
      - Focus on the most important points
      - Use trending hashtags when appropriate
      - Return ONLY the JSON object, no other text
      
      Text to summarize:
      ${text}
    `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        let jsonResponse = response.text();

        // Clean the response - remove markdown code blocks if present
        if (jsonResponse.includes('```json')) {
            jsonResponse = jsonResponse.replace(/```json\s*/g, '').replace(/```\s*$/g, '');
        } else if (jsonResponse.includes('```')) {
            jsonResponse = jsonResponse.replace(/```\s*/g, '').replace(/```\s*$/g, '');
        }

        // Remove any leading/trailing whitespace
        jsonResponse = jsonResponse.trim();

        console.log("Raw AI response:", jsonResponse);

        // Parse the JSON response with better error handling
        let summaryReel;
        try {
            summaryReel = JSON.parse(jsonResponse);
        } catch (parseError) {
            console.error("JSON parsing failed, trying to extract JSON from response:", parseError);

            // Try to find JSON within the response
            const jsonMatch = jsonResponse.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                try {
                    summaryReel = JSON.parse(jsonMatch[0]);
                } catch (secondParseError) {
                    console.error("Second JSON parsing attempt failed:", secondParseError);
                    throw new Error("Could not parse AI response as JSON");
                }
            } else {
                throw new Error("No JSON found in AI response");
            }
        }

        // Validate the structure
        if (!summaryReel || typeof summaryReel !== 'object') {
            throw new Error("AI response is not a valid object");
        }

        if (!summaryReel.title || !summaryReel.keyPoints || !Array.isArray(summaryReel.keyPoints)) {
            console.error("Invalid summary reel structure:", summaryReel);
            throw new Error("Invalid summary reel structure from AI");
        }

        return summaryReel;
    } catch (error) {
        console.error("Error generating summary reel:", error);

        // Fallback: create a basic summary reel structure
        console.log("Attempting fallback summary reel generation...");
        try {
            const fallbackReel: SummaryReel = {
                title: "📄 Document Summary",
                subtitle: "AI-generated insights from your document",
                keyPoints: [
                    "📖 Document processed successfully",
                    "🧠 AI analysis completed",
                    "✨ Key insights extracted",
                    "📊 Summary generated",
                    "🎯 Ready for review"
                ],
                callToAction: "Review the full summary below! 👇",
                hashtags: ["#AI", "#Summary", "#Document", "#Analysis", "#Smart"],
                emoji: "📄"
            };

            console.log("Fallback summary reel created");
            return fallbackReel;
        } catch (fallbackError) {
            console.error("Fallback generation also failed:", fallbackError);
            throw new Error(
                `Failed to generate summary reel: ${error instanceof Error ? error.message : "Unknown error"}`,
            );
        }
    }
}