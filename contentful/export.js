const spaceExport = require("contentful-export");
const { resolve } = require("path");

const [
  CONTENTFUL_SPACE_ID,
  CONTENTFUL_MANAGEMENT_TOKEN,
  CONTENTFUL_ENVIRONMENT_ID,
] = process.argv.slice(2);

if (
  !CONTENTFUL_SPACE_ID ||
  !CONTENTFUL_MANAGEMENT_TOKEN ||
  !CONTENTFUL_ENVIRONMENT_ID
) {
  throw new Error(
    [
      "Parameters missing...",
      "Please run the setup command as follows",
      "CONTENTFUL_SPACE_ID=XXX CONTENTFUL_MANAGEMENT_TOKEN=CFPAT-XXX CONTENTFUL_ENVIRONMENT_ID=xxx npm run setup",
    ].join("\n")
  );
}

const options = {
  spaceId: CONTENTFUL_SPACE_ID,
  managementToken: CONTENTFUL_MANAGEMENT_TOKEN,
  environmentId: CONTENTFUL_ENVIRONMENT_ID,
  exportDir: resolve(process.cwd(), "contentful"),
  saveFile: true,
  contentFile: "export.json",
};

spaceExport(options)
  .then(() =>
    console.log("The content model(s) of your space have been exported!")
  )
  .catch((e) => console.error(e));
