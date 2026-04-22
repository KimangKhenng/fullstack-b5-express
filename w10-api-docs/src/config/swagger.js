import { readFileSync } from 'fs';
import { load } from 'js-yaml';

export const swaggerSpec = load(readFileSync('./swagger.yaml', 'utf8'));