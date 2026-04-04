import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
  Recipe: a.customType({
    name: a.string(),
    ingredients: a.string().array(),
    instructions: a.string(),
  }),
  generateRecipe: a.generation({
    aiModel: a.ai.model('Claude 3.5 Haiku'),
    systemPrompt: 'You are a helpful assistant that generates recipes.',
  })
    .arguments({ description: a.string() })
    .returns(a.ref('Recipe')) // ✅ Valid
    .authorization((allow) => allow.authenticated()),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "apiKey",
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});