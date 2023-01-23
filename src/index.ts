import { prompt } from 'enquirer';
import { setProps } from './libs/setProps';
import { getIconSvg } from './libs/getIconSvg';
import figmaUiIconNames from './data/css-gg.json';
import { writeFileSync } from 'fs';
import bootstrapIconNames from './data/bootstrap.json';
import untitledUiIconNames from './data/untitled-ui.json';
import type { Developer, ComponentType } from './types';

(async () => {
  const developers: Developer[] = ['css-gg', 'bootstrap', 'untitled-ui'];
  const componentTypes: ComponentType[] = ['svg', 'svelte', 'astro'];

  // developer
  const developerPrompt: any = await prompt({
    type: 'select',
    name: 'developer',
    message: 'Select developer',
    choices: developers,
  });
  const { developer } = developerPrompt;

  // iconName
  const iconNamePrompt: any = await prompt({
    type: 'autocomplete',
    name: 'iconName',
    message: 'Select icon',
    choices:
      developer === 'figma-ui'
        ? figmaUiIconNames
        : developer === 'bootstrap'
        ? bootstrapIconNames
        : untitledUiIconNames,
  });
  const { iconName } = iconNamePrompt;

  // componentType
  const componentTypePrompt: any = await prompt({
    type: 'select',
    name: 'componentType',
    message: 'Select component type',
    choices: componentTypes,
  });
  const { componentType } = componentTypePrompt;

  // outputDirectoryPath
  const outputDirectoryPathPrompt: any = await prompt({
    type: 'input',
    name: 'outputDirectoryPath',
    message: 'Enter output directory path',
  });
  const { outputDirectoryPath } = outputDirectoryPathPrompt;

  let svgText = await getIconSvg(iconName, developer);

  // props
  if (componentType !== 'svg') {
    const sizePrompt: any = await prompt({
      type: 'toggle',
      name: 'size',
      message: 'Size prop',
    });
    const colorPrompt: any = await prompt({
      type: 'toggle',
      name: 'color',
      message: 'Color prop',
    });
    const { size } = sizePrompt;
    const { color } = colorPrompt;

    svgText = setProps(componentType, svgText, size, color);
  }

  const upperCamelCaseIconName = iconName
    .split('-')
    .map((word: string) => {
      const firstLetter = word[0].toUpperCase();
      const restLetters = word.slice(1);
      return firstLetter + restLetters;
    })
    .join('');

  const iconComponent = `${upperCamelCaseIconName}.${componentType}`;
  const outputFilePath = `${process.cwd()}/${outputDirectoryPath}/${iconComponent}`;
  writeFileSync(outputFilePath, svgText);
})();
