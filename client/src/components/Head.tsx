export default function Head({ title, description }: { title: string; description?: string }) {
  return (
    <>
      <title>{title}</title>
      {description && <meta name="description" content={description} />}
      <meta name="description" content={description} />
      {description && <meta property="og:description" content={description} />}
    </>
  );
}
