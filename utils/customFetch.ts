import { NextRequest } from "next/server";
import { ApiJsonResponse } from "../entities/response/response";

export const customFetch = async<T> (
    url: string,
    method: string = 'GET',
    body?: any,
    req?: NextRequest,
    jwtToken?: string
  ): Promise<T | null> => {
    //const token = getToken(req, jwtToken);
  
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      //Authorization: token ? `Bearer ${token}` : '',
    };
  
    // Configure fetch options
    const options: RequestInit = {
      method,
      headers,
    };
  
    // Add body if needed (for POST, PATCH, etc.)
    if (body) {
      options.body = JSON.stringify(body);
    }
  
    // Return the fetch promise directly
    const res = await fetch(url, options);
    const json: ApiJsonResponse = await res.json();
    const { data, error } = json;
    if (error) {
      alert(error.message);
      return null;
    }
    return data;
  };