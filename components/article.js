import { format } from "date-fns";
import Image from "../components/image";

function Article({ articles, category }) {
  return (
    <section key={category}>
      <h1 className="text-5xl font-bold text-center">
        {category.replace(/_/, " ")}
      </h1>
      <div className="flex flex-row">
        {articles.map(
          ({
            sys: { id },
            articleCategory,
            date,
            linkSrc,
            linkLabel,
            imgSrc,
            imgAlt,
            title,
          }) => (
            <article className="flex w-1/3 m-8" key={id}>
              <a
                href={linkSrc}
                aria-label={linkLabel}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="relative">
                  <Image
                    className="object-fill object-center"
                    {...imgSrc}
                    alt={imgAlt}
                  />
                  <div className="text-black absolute bottom-0 left-0 bg-overlay px-2 w-full text-[28px]">
                    {articleCategory}
                  </div>
                </div>
                <h2 className="text-2xl font-bold ease-in-out duration-300 hover:text-purple">
                  {title}
                </h2>
                <p>{format(new Date(date), "MMM dd, yyyy")}</p>
              </a>
            </article>
          )
        )}
      </div>
    </section>
  );
}

export default Article;
