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
  const [coverLetter, setCoverLetter] = useState("");

  const handleSubmit = async () => {
    if (!prompt.Name.trim()) {
      alert("Please enter a prompt");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        `http://localhost:3003/api/generate-from-transcript`,
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
      setCoverLetter(dataArr[2]);
      console.log("Resume generated:");
      console.log("Feedback generated:", data.feedback);
    } catch (error) {
      console.error("Error generating resume:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="form-container">
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="input-fields">
            <div className="left-col">
              <label>
                Desired Position:
                <input
                  type="text"
                  placeholder="Desired Position..."
                  value={prompt.DesiredPosition}
                  onChange={(e) =>
                    setPrompt({ ...prompt, DesiredPosition: e.target.value })
                  }
                  required
                />
              </label>
              <label>
                Full Name:
                <input
                  type="text"
                  placeholder="Full Name..."
                  value={prompt.Name}
                  onChange={(e) =>
                    setPrompt({ ...prompt, Name: e.target.value })
                  }
                  required
                />
              </label>
              <label>
                Phone Number:
                <input
                  type="text"
                  placeholder="Phone Number..."
                  value={prompt.PhoneNumber}
                  onChange={(e) =>
                    setPrompt({ ...prompt, PhoneNumber: e.target.value })
                  }
                  required
                />
              </label>
              <label>
                Email:
                <input
                  type="email"
                  placeholder="Email..."
                  value={prompt.Email}
                  onChange={(e) =>
                    setPrompt({ ...prompt, Email: e.target.value })
                  }
                  required
                />
              </label>
              <label>
                LinkedIn:
                <input
                  type="text"
                  placeholder="LinkedIn..."
                  value={prompt.LinkedIn}
                  onChange={(e) =>
                    setPrompt({ ...prompt, LinkedIn: e.target.value })
                  }
                  required
                />
              </label>
              <label>
                City and State:
                <input
                  type="text"
                  placeholder="City and state..."
                  value={prompt.CityState}
                  onChange={(e) =>
                    setPrompt({ ...prompt, CityState: e.target.value })
                  }
                  required
                />
              </label>
            </div>
            <div className="right-col">
              <label>
                Address:
                <input
                  type="text"
                  placeholder="Address..."
                  value={prompt.Address}
                  onChange={(e) =>
                    setPrompt({ ...prompt, Address: e.target.value })
                  }
                  required
                />
              </label>
              <label>
                Zip Code:
                <input
                  type="text"
                  placeholder="Zip Code..."
                  value={prompt.ZipCode}
                  onChange={(e) =>
                    setPrompt({ ...prompt, ZipCode: e.target.value })
                  }
                  required
                />
              </label>
              <label>
                Education:
                <input
                  type="text"
                  placeholder="Education..."
                  value={prompt.Education}
                  onChange={(e) =>
                    setPrompt({ ...prompt, Education: e.target.value })
                  }
                  required
                />
              </label>
              <label>
                Work Experience:
                <input
                  type="text"
                  placeholder="Work Experience..."
                  value={prompt.WorkExperience}
                  onChange={(e) =>
                    setPrompt({ ...prompt, WorkExperience: e.target.value })
                  }
                  required
                />
              </label>
              <label>
                Skills:
                <input
                  placeholder="Enter your skills, separated by commas..."
                  value={prompt.Skills}
                  onChange={(e) =>
                    setPrompt({ ...prompt, Skills: e.target.value })
                  }
                  required
                />
              </label>
              <label>
                Certifications:
                <input
                  type="text"
                  placeholder="Certifications..."
                  value={prompt.Certifications}
                  onChange={(e) =>
                    setPrompt({ ...prompt, Certifications: e.target.value })
                  }
                  required
                />
              </label>
              <label>
                Summary:
                <input
                  type="text"
                  placeholder="Summary..."
                  value={prompt.Summary}
                  onChange={(e) =>
                    setPrompt({ ...prompt, Summary: e.target.value })
                  }
                  required
                />
              </label>
            </div>
          </div>
        </form>

        <button type="submit" onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? "Generating..." : "Generate Resume"}
        </button>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ flex: 1, marginRight: "1px" }}>
          <h2>Resume:</h2>
          <div className="resumeBox">
            <ReactMarkdown>{resume}</ReactMarkdown>
          </div>
        </div>
        <div style={{ flex: 1, marginLeft: "10px" }}>
          <h2>Letter:</h2>
          <div className="resumeBox">
            <ReactMarkdown>{resumeFeedback}</ReactMarkdown>
          </div>
        </div>
        <div style={{ flex: 1, marginLeft: "10px" }}>
          <h2>Feedback:</h2>
          <div className="resumeBox">
            <ReactMarkdown>{coverLetter}</ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
