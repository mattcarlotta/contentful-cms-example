import get from "lodash.get";
import { createPost } from "../../lib/api";

export default async function handler(_req, res) {
  try {
    await createPost({
      title: {
        "en-US": "This is an entry created from an API endpoint.",
      },
    });

    return res
      .status(200)
      .json({ message: "Successfully created a new post entry!" });
  } catch (err) {
    const error = JSON.parse(err.message);
    const errorReason = get(
      error,
      "details.errors[0].details",
      "There was an error processing that request"
    );
    const status = get(error, "status", 400);
    return res.status(status).send(errorReason);
  }
}
