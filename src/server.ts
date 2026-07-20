import { createStartHandler } from '@tanstack/react-start/server';
import { getRouterManifest } from '@tanstack/react-start/manifest';

export default createStartHandler({
  createRouterManifest: getRouterManifest,
});
