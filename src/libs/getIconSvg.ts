import { Client } from 'figma-js';
import { config } from 'dotenv';
import type { Developer } from '../types';

config();

const icons: { [key in Developer]: string } = {
  'css-gg': process.env.CSS_GG_FILE_ID as string,
  bootstrap: process.env.BOOTSTRAP_FILE_ID as string,
  'untitled-ui': process.env.UNTITLED_UI_FILE_ID as string,
};

export async function getIconSvg(iconName: string, developer: Developer): Promise<string> {
  const fileId = icons[developer];
  const client = Client({ personalAccessToken: process.env.FIGMA_TOKEN });
  const file = await client.file(fileId);
  const fileComponents = file.data.components;
  const componentIds = Object.keys(fileComponents);

  const id = componentIds.find((id) => {
    const name = fileComponents[id].name;
    return name === iconName;
  });

  if (!id) {
    throw new Error(`Icon with name ${iconName} not found`);
  }

  const response = await client.fileImages(fileId, {
    ids: [id],
    scale: 1,
    format: 'svg',
  });
  const svgEndpoint = response.data.images[id];
  const svg = await fetch(svgEndpoint);
  const svgText = await svg.text();

  return svgText;
}
