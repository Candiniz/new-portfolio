import fs from 'fs/promises';
import path from 'path';

const tokenFilePath = path.resolve('data', 'instagram-token.json');

export async function getAccessToken(): Promise<string | null> {
  try {
    const file = await fs.readFile(tokenFilePath, 'utf-8');
    const json = JSON.parse(file);
    return json.access_token;
  } catch (err) {
    console.error("Erro ao ler o token:", err);
    return null;
  }
}

export async function saveAccessToken(token: string): Promise<void> {
  const data = { access_token: token };
  await fs.writeFile(tokenFilePath, JSON.stringify(data, null, 2));
}
