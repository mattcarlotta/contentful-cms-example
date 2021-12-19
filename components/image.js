const Image = ({ alt, className, height, width, src }) => (
  <picture data-testid="picture">
    <source
      className={className}
      srcSet={`${src}?fm=webp`}
      media="(min-width:992px)"
      type="image/webp"
    />
    <source className={className} srcSet={src} media="(min-width:992px)" />
    <source
      srcSet={`${src}?fm=webp&fit=scale&h=${Math.round(
        height * 0.75
      )}&w=${Math.round(width * 0.75)}`}
      media="(min-width:768px)"
      type="image/webp"
    />
    <source
      srcSet={`${src}?fit=scale&h=${Math.round(height * 0.75)}&w=${Math.round(
        width * 0.75
      )}`}
      media="(min-width:768px)"
    />
    <source
      srcSet={`${src}?fm=webp&fit=scale&h=${Math.round(
        height * 0.5
      )}&w=${Math.round(width * 0.5)}`}
      media="(min-width:300px)"
      type="image/webp"
    />
    <source
      srcSet={`${src}?fit=scale&h=${Math.round(height * 0.75)}&w=${Math.round(
        width * 0.5
      )}`}
      media="(min-width:300px)"
    />
    <img data-testid="image" className={className} src={src} alt={alt} />
  </picture>
);

export default Image;
