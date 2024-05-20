export default async function Cards() {
  await new Promise((resolve) =>
    setTimeout(() => {
      resolve("");
    }, 3000)
  );
  return <div className="hidden 2xl:block">Left Cards</div>;
}
