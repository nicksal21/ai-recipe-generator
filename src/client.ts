import { generateClient } from "aws-amplify/api";
import { Schema } from "../amplify/data/resource";
import { createAIHooks } from "@aws-amplify/ui-react-ai";

import { Amplify } from 'aws-amplify';
import '@aws-amplify/ui-react/styles.css';
import outputs from '../amplify_outputs.json';

Amplify.configure(outputs);

export const client = generateClient<Schema>({ authMode: "userPool" });
export const { useAIConversation, useAIGeneration } = createAIHooks(client);