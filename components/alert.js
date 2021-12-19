import Container from "./container";
import cn from "classnames";
import { EXAMPLE_PATH } from "../lib/constants";

export default function Alert({ preview }) {
  return (
    <div
      className={cn("border-b", {
        "bg-accent-7 border-accent-7 text-white": preview,
        "bg-accent-1 border-accent-2": !preview,
      })}
    >
      <Container>
        <div className="py-2 text-center text-sm">
          {preview ? (
            <>
              This is page is a preview.&nbsp;
              <a
                href="/api/exit-preview"
                className="underline hover:text-cyan duration-200 transit`ion-colors"
              >
                Click here
              </a>
              &nbsp; to exit preview mode.
            </>
          ) : (
            <>
              The source code for this blog is&nbsp;
              <a
                href="https://github.com/mattcarlotta/contentful-cms-example"
                className="underline hover:text-success duration-200 transition-colors"
              >
                available on GitHub
              </a>
              .
            </>
          )}
        </div>
      </Container>
    </div>
  );
}
