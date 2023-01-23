import type { ComponentType } from '../types';

const widthPattern = /width="(\d+)"/;
const heightPattern = /height="(\d+)"/;
const fillPattern = /fill="(\w+)"/;

export function setProps(
  componentType: ComponentType,
  svgText: string,
  size: boolean,
  color: boolean,
): string {
  if (!size && !color) {
    return svgText;
  }

  if (size) {
    svgText = svgText.replace(widthPattern, `width={size}`);
    svgText = svgText.replace(heightPattern, `height={size}`);
  }
  if (color) {
    svgText = svgText.replace(fillPattern, `fill={color}`);
  }

  let propsHeader = '';
  switch (componentType) {
    case 'svelte':
      propsHeader =
        '<script lang="ts">\n' +
        (size ? '\texport let size: number;\n' : '') +
        (color ? '\texport let color: string;\n' : '') +
        '</script>\n\n';
      break;
    case 'astro':
      const props: { [key: string]: boolean } = { size, color };
      const propsArray = Object.keys(props).filter((key) => props[key]);

      propsHeader =
        '---\nexport interface Props {\n' +
        (size ? '\tsize: number;\n' : '') +
        (color ? '\tcolor: string;\n' : '') +
        '}\nconst { ' +
        propsArray.join(', ') +
        ' }: Props = Astro.props;\n---\n\n';
      break;
  }

  return propsHeader + svgText;
}
