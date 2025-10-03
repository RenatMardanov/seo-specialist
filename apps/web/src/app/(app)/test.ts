'use server';
import config from '@payload-config';

import { getPayload } from 'payload';

export async function getPages() {
  const payload = await getPayload({
    config: config,
  });
  const pages = await payload.find({
    collection: 'pages',
  });
  return pages;
}
