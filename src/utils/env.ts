import 'dotenv/config'

import { z } from 'zod'

const envScheme = z.object({
  URL_DEV: z.string(),
  URL_PROD: z.string(),
})

export const env = envScheme.parse(process.env)
