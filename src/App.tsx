import * as React from 'react';
import { Flex, TextAreaField, Loader, Text, View, Button } from "@aws-amplify/ui-react"
import { BedrockRuntimeClient, InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime";
import '@aws-amplify/ui-react/styles.css';
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import './App.css';


export default function App() {
  const [description, setDescription] = React.useState("");
  const [data, setData] = React.useState("");

  const handleClick = async () => {

    const config = {
      region: "us-east-1",
      credentials: {
        accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY,
        secretAccessKey: import.meta.env.VITE_AWS_SECRET_KEY
      }
    };
    const client = new BedrockRuntimeClient(config);
    const input = {
      body: new TextEncoder().encode(JSON.stringify({
        anthropic_version: "bedrock-2023-05-31",
        max_tokens: 512,
        messages: [
          { role: "user", content: `Create a recipe given the following ingredients: ${description}` }
        ]
      })),
      contentType: "application/json",
      accept: "application/json",
      modelId: "us.anthropic.claude-haiku-4-5-20251001-v1:0",
    };
    const command = new InvokeModelCommand(input);
    const response = await client.send(command);

    const result = JSON.parse(new TextDecoder().decode(response.body));
    console.log(result.content[0].text);
    setData(result.content[0].text);
  };

  const getRecipeTitle = (markdown: string) => {
    const firstLine = markdown
      .split("\n")
      .map(line => line.trim())
      .find(line => line.length > 0) || "recipe";

    return firstLine.replace(/^#+\s*/, "").trim();
  };

  const handleDownload = () => {
    if (!data) return;

    const title = getRecipeTitle(data);
    const safeName = title
      .replace(/[^a-z0-9]+/gi, "_")
      .replace(/^_+|_+$/g, "")
      .toLowerCase();

    const blob = new Blob([data], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `${safeName || "recipe"}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  return (
    <div className="app-container">
      <div className="header-container">
        <h1 className="main-header">
          Meet Your Personal
          <br />
          <span className="highlight">Recipe AI</span>
        </h1>
        <p className="description">
          Simply type a few ingredients using the format ingredient1, ingredient2, etc., and Recipe AI will generate an all-new recipe on demand...
        </p>
      </div>
      <div className='form-container'>
        <TextAreaField
          autoResize
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          label="Description"
        />
      </div>
      <Button className='search-button' onClick={handleClick}>Generate recipe</Button>


      {data && (
        <div className="result-container">
          <div className="result">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {data}
            </ReactMarkdown>
            <Button className='download-button' onClick={handleDownload} isDisabled={!data}>
              Download recipe
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}