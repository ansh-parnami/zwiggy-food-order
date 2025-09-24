import { useCallback, useEffect, useState } from 'react';

async function sendHttpRequest(url, config) {
  // Get token from localStorage
  const token = localStorage.getItem('authToken');

  // Prepare headers without forcing Content-Type on simple GET requests
  const headers = {
    ...config.headers,
  };

  // Only set Content-Type when sending a body (POST/PUT/PATCH) to avoid preflight on GET
  const method = (config && config.method ? config.method : 'GET').toUpperCase();
  const hasBody = config && config.body !== undefined && config.body !== null;
  if (hasBody || method !== 'GET') {
    headers['Content-Type'] = headers['Content-Type'] || 'application/json';
  }

  // Add Authorization only when needed; avoid for public GET to /meals/**
  if (token) {
    const isPublicMealsGet = method === 'GET' && /\/meals\//.test(url);
    if (!isPublicMealsGet) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }

  const response = await fetch(url, {
    ...config,
    headers,
    mode: 'cors',
    credentials: 'omit',
  });

  const resData = await response.json();

  if (!response.ok) {
  
    if (response.status === 401) {
   
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    throw new Error(
      resData.message || 'Something went wrong, failed to send request.'
    );
  }

  return resData;
}

export default function useHttp(url, config, initialData) {
  const [data, setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  function clearData() {
    setData(initialData);
  }

  const sendRequest = useCallback(
    async function sendRequest(data) {
      setIsLoading(true);
      setError(null);
      try {
        const resData = await sendHttpRequest(url, { ...config, body: data });
        setData(resData);
      } catch (error) {
        setError(error.message || 'Something went wrong!');
      }
      setIsLoading(false);
    },
    [url, config]
  );

  useEffect(() => {
    if ((config && (config.method === 'GET' || !config.method)) || !config) {
      sendRequest();
    }
  }, [sendRequest, config]);

  return {
    data,
    isLoading,
    error,
    sendRequest,
    clearData
  };
}