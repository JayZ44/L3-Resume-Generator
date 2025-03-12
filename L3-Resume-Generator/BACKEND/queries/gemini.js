require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const generateAIResponse = async (promptObject) => {
  console.log(promptObject);
  try {
    const apiKey = process.env.API_KEY;

    if (!apiKey) {
      throw new Error("API_KEY is undefined. Check your .env file.");
    }

    // Initialize the AI client
    const genAI = new GoogleGenerativeAI(apiKey);

    // Get the generative model
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction:
        "You are a resume generator. You are clean and professional and will write resumes that will get people hired based on the info they gave you. You will do this to the best of your ability. You may use markdown to make the text prettier or cleaner looking. Respond with the feedback seperate from the resume by putting '---' between the two. There should be absolutely no feedback of any kind in the resume half of the response. Only the resume should be in there and nothing else. Be extra fancy with the markdown to make the resume as pleasing to the eye as possible. Also provide a cover letter to go with the resume. Seperate that with a '---' as well. Your response should be in this order, Resume, Cover letter, and feedback. Seperate each with '---' so I can split them into different text fields properly. ",
    });

    // Convert the prompt object to a string
    const prompt = Object.entries(promptObject)
      .map(([key, value]) => `${key}: ${value}`)
      .join("\n");

    // Generate content
    const result = await model.generateContentStream({
      contents: [
        {
          role: "user",
          parts: [
            {
              text: prompt,
            },
          ],
        },
      ],
      generationConfig: {
        maxOutputTokens: 1000,
        temperature: 0.1,
      },
    });

    let fullResponse = "";
    for await (const chunk of result.stream) {
      const chunkText = chunk.text();
      fullResponse += chunkText;
    }

    return fullResponse;
  } catch (error) {
    console.error("Error generating AI response:", error.message);
    throw error; // Re-throw to handle in controller
  }
};

// Call the async function
// const promptObject = {
//   Name: "John Doe",
//   PhoneNumber: "123-456-7890",
//   Email: "john.doe@example.com",
//   LinkedIn: "linkedin.com/in/johndoe",
//   CityState: "New York, NY",
//   Address: "123 Main St",
//   ZipCode: "10001",
//   Education: "B.S. in Computer Science",
//   WorkExperience: "Software Engineer at XYZ Corp",
//   Skills: "JavaScript, React, Node.js",
//   Certifications: "Certified JavaScript Developer",
//   Summary: "A passionate software engineer with experience in building web applications."
// };
// generateAIResponse(promptObject);

module.exports = {
  generateAIResponse,
};
