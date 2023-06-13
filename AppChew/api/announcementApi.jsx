import React from 'react';
import {baseUrl} from './userApi';

export const announcementApi = {
    listAll: async () => {
        const result = await fetch(`${baseUrl}/api/announcement`);
        const json = result.json();

        return json;
    },
    findSchoolBased: async (school) => {
        const res = await fetch(`${baseUrl}/api/announcement/${school}`);

        return await res.json()
    },
    findSchoolClassBased: async (school, schoolClass) => {
        const res = await fetch(`${baseUrl}/api/announcement/${school}/${schoolClass}`);

        return await res.json()
    },
    insert: async ({
                       title,
                       description,
                       startTime,
                       endTime,
                       school,
                       schoolClass,
                       recipeId,
                       authorId
                   }) => {
        const res = await fetch(`${baseUrl}/api/announcement`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title,
                description,
                startTime,
                endTime,
                school,
                schoolClass,
                recipeId,
                authorId
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
            body: JSON.stringify({id}),
        });

        return res.ok;
    },
};
