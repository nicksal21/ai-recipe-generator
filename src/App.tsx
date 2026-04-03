import * as React from 'react';
import { Flex, TextAreaField, Loader, Text, View, Button } from "@aws-amplify/ui-react"
import { useAIGeneration } from "./client.ts";

export default function App() {
  const [description, setDescription] = React.useState("");
  const [{ data, isLoading }, generateRecipe] =
    useAIGeneration("generateRecipe");

  const handleClick = async () => {
    console.log(description);
    generateRecipe({ description });
    console.log(data);
  };

  return (
    <Flex direction="column">
      <Flex direction="row">
        <TextAreaField
          autoResize
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          label="Description"
        />
        <Button onClick={handleClick}>Generate recipe</Button>
      </Flex>
      {isLoading ? (
        <Loader variation="linear" />
      ) : (
        <>
          <Text fontWeight="bold">{data?.name}</Text>
          <View as="ul">
            {data?.ingredients?.map((ingredient) => (
              <View as="li" key={ingredient}>
                {ingredient}
              </View>
            ))}
          </View>
          <Text>{data?.instructions}</Text>
        </>
      )}
    </Flex>
  );
}