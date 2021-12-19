const Image = ({ alt, className, contentType, height, width, url }) => (
  <picture data-testid="picture">
    <source
      className={className}
      srcSet={`${url}?fm=webp`}
      media="(min-width:992px)"
      type="image/webp"
    />
    <source className={className} srcSet={url} media="(min-width:992px)" />
    <source
      srcSet={`${url}?fm=webp&fit=scale&h=${Math.round(
        height * 0.75
      )}&w=${Math.round(width * 0.75)}`}
      media="(min-width:768px)"
      type="image/webp"
    />
    <source
      srcSet={`${url}?fit=scale&h=${Math.round(height * 0.75)}&w=${Math.round(
        width * 0.75
      )}`}
      media="(min-width:768px)"
      type={contentType}
    />
    <source
      srcSet={`${url}?fm=webp&fit=scale&h=${Math.round(
        height * 0.5
      )}&w=${Math.round(width * 0.5)}`}
      media="(min-width:300px)"
      type="image/webp"
    />
    <source
      srcSet={`${url}?fit=scale&h=${Math.round(height * 0.75)}&w=${Math.round(
        width * 0.5
      )}`}
      media="(min-width:300px)"
      type={contentType}
    />
    <img
      data-testid="image"
      className={className}
      src={url}
      height={height}
      width={width}
      alt={alt}
    />
  </picture>
);

export default Image;
