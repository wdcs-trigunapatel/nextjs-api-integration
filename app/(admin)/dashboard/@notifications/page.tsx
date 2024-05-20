export default async function Notification() {
  await new Promise((resolve) =>
    setTimeout(() => {
      resolve("");
    }, 3000)
  );
  return <div>Notification</div>;
}
