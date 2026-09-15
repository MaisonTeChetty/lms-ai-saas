const { loadEnvConfig } = require('@next/env');
loadEnvConfig(process.cwd(), true);
const required = ["NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY", "CLERK_SECRET_KEY", "NEXT_PUBLIC_SANITY_PROJECT_ID", "NEXT_PUBLIC_SANITY_DATASET", "SANITY_API_WRITE_TOKEN", "OPENAI_API_KEY", "MUX_TOKEN_ID", "MUX_TOKEN_SECRET", "MUX_SIGNING_KEY_ID", "MUX_SIGNING_KEY"];
const missing = required.filter((key) => !process.env[key]?.trim());
if (missing.length) {
  console.error('Fill these values in .env.local (values are never printed):');
  missing.forEach((key) => console.error(`  ${key}`));
  process.exitCode = 1;
} else {
  console.log('Required environment values are present. Service access still needs verification.');
}
