import React, { useState } from "react";
import "./Form.css";
import ReactMarkdown from "react-markdown";

const Form = () => {
  const [prompt, setPrompt] = useState({
    DesiredPosition: "",
    Name: "",
    PhoneNumber: "",
    Email: "",
    LinkedIn: "",
    CityState: "",
    Address: "",
    ZipCode: "",
    Education: "",
    WorkExperience: "",
    Skills: "",
    Certifications: "",
    Summary: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [resume, setResume] = useState("");
  const [resumeFeedback, setResumeFeedback] = useState("");

  const handleSubmit = async () => {
    if (!prompt.Name.trim()) {
      alert("Please enter a prompt");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        `http://localhost:3003/api/generate-from-transcript`,
        // `${import.meta.env.VITE_BASE_API_URL}/api/generate-from-transcript`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to generate resume");
      }

      const data = await response.json();
      let dataArr = data.split("---");

      setResume(dataArr[0]);
      setResumeFeedback(dataArr[1]);
      console.log("Resume generated:");
      console.log("Feedback generated:", data.feedback);
      // Handle successful response here
    } catch (error) {
      console.error("Error generating resume:", error);
      // Handle error here
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="form-container">
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="input-fields">
            <input
              type="text"
              placeholder="Desired Position..."
              value={prompt.DesiredPosition}
              onChange={(e) =>
                setPrompt({ ...prompt, DesiredPosition: e.target.value })
              }
              required
            />
            <input
              type="text"
              placeholder="Full Name..."
              value={prompt.Name}
              onChange={(e) => setPrompt({ ...prompt, Name: e.target.value })}
              required
            />
            <input
              type="number"
              placeholder="Phone Number..."
              value={prompt.PhoneNumber}
              onChange={(e) =>
                setPrompt({ ...prompt, PhoneNumber: e.target.value })
              }
              required
            />
            <input
              type="email"
              placeholder="Email..."
              value={prompt.Email}
              onChange={(e) => setPrompt({ ...prompt, Email: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="LinkedIn..."
              value={prompt.LinkedIn}
              onChange={(e) =>
                setPrompt({ ...prompt, LinkedIn: e.target.value })
              }
              required
            />
            <input
              type="text"
              placeholder="City and state..."
              value={prompt.CityState}
              onChange={(e) =>
                setPrompt({ ...prompt, CityState: e.target.value })
              }
              required
            />
            <input
              type="text"
              placeholder="Address..."
              value={prompt.Address}
              onChange={(e) =>
                setPrompt({ ...prompt, Address: e.target.value })
              }
              required
            />
            <input
              type="text"
              placeholder="Zip Code..."
              value={prompt.ZipCode}
              onChange={(e) =>
                setPrompt({ ...prompt, ZipCode: e.target.value })
              }
              required
            />
            <input
              type="text"
              placeholder="Education..."
              value={prompt.Education}
              onChange={(e) =>
                setPrompt({ ...prompt, Education: e.target.value })
              }
              required
            />
            <input
              type="text"
              placeholder="Work Experience..."
              value={prompt.WorkExperience}
              onChange={(e) =>
                setPrompt({ ...prompt, WorkExperience: e.target.value })
              }
              required
            />
            <textarea
              placeholder="Enter your skills, separated by commas..."
              value={prompt.Skills}
              onChange={(e) => setPrompt({ ...prompt, Skills: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Certifications..."
              value={prompt.Certifications}
              onChange={(e) =>
                setPrompt({ ...prompt, Certifications: e.target.value })
              }
              required
            />
            <input
              type="text"
              placeholder="Summary..."
              value={prompt.Summary}
              onChange={(e) =>
                setPrompt({ ...prompt, Summary: e.target.value })
              }
              required
            />
          </div>
        </form>

        <button type="submit" onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? "Generating..." : "Generate Resume"}
        </button>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ flex: 1, marginRight: "10px" }}>
          <h2>Generated Resume:</h2>
          <div className="resumeBox">
            <ReactMarkdown>{resume}</ReactMarkdown>
          </div>
        </div>
        <div style={{ flex: 1, marginLeft: "10px" }}>
          <h2>Feedback:</h2>
          <div className="resumeBox">
            <ReactMarkdown>{resumeFeedback}</ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
  /*

Skills
:
"tech,programming,computer repair, fullstack development, ruby on rails, python, javascript, react, AWS"
Certifications
:
"High School Diploma"
Summary
:
"Ive been in tech school forever. I'm so tired and i just want to get a job already"
*/
};

export default Form;
