import React from 'react';
import { baseUrl } from './userApi';

export const recipeApi = {
  listAll: async () => {
    const result = await fetch(`${baseUrl}/api/recipe`);
    const json = result.json();

    return json;
  },
  insert: async ({
    dishname,
    picture,
    guide,
    description,
    nutrition,
    allergens,
    ingredients,
    kitchentools,
    category,
    culture,
  }) => {
    const res = await fetch(`${baseUrl}/api/recipe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        dishname,
        picture,
        guide,
        description,
        nutrition,
        allergens,
        ingredients,
        kitchentools,
        category,
        culture,
      }),
    });

    return res.ok;
  },
  update: async ({
    id,
    dishname,
    picture,
    guide,
    description,
    nutrition,
    allergens,
    ingredients,
    kitchentools,
    category,
    culture,
  }) => {
    const res = await fetch(`${baseUrl}/api/recipe`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
        dishname,
        picture,
        guide,
        description,
        nutrition,
        allergens,
        ingredients,
        kitchentools,
        category,
        culture,
      }),
    });

    return res.ok;
  },
  delete: async (id) => {
    const res = await fetch(`${baseUrl}/api/recipe`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });

    return res.ok;
  },
};