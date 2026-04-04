import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Authenticator } from "@aws-amplify/ui-react";
import { Amplify } from 'aws-amplify';
import { generateClient } from "aws-amplify/api";
import outputs from '../amplify_outputs.json';
import { Schema } from "../amplify/data/resource";

Amplify.configure(outputs);
generateClient<Schema>({ authMode: "userPool" });

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Authenticator>
      <App />
    </Authenticator>
  </React.StrictMode>
);