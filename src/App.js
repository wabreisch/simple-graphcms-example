import React from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import styled from "styled-components";

import "./App.css";

const GET_RECIPES = gql`
  {
    recipes {
      id
      title
      prepTime
      ingredients {
        id
        name
        description
      }
    }
  }
`;

function App() {
  const { loading, error, data } = useQuery(GET_RECIPES);

  if (loading) return <p>Loading ...</p>;
  if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>;

  return (
    <div className="App">
      <header className="App-header">
        <h1>GraphCMS Example</h1>

        {data.recipes.map(recipe => (
          <RecipeLink href={`recipe/${recipe.id}`} key={recipe.id}>
            {recipe.title}
          </RecipeLink>
        ))}
      </header>
    </div>
  );
}

export default App;

const RecipeLink = styled.a`
  margin: 0.3em 0;
  color: #7f7;
  text-decoration-style: dashed;
`;
