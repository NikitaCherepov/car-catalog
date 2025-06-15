import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const search = url.search ? url.search : '';

  const apiUrl = `https://testing-api.ru-rating.ru/cars${search}`;

  const response = await fetch(apiUrl, {
    headers: {
      Accept: 'application/json',
    },
  });

  const data = await response.json();
  return Response.json(data);
}
