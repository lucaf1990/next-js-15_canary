import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "../env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // true ? CACHE the content for 60 seconds and revalidate the content after 60 sec : Set to false if statically generating pages, using ISR or tag-based revalidation
});
