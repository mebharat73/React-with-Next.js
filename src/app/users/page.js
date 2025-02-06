export default async function UsersPage() {
  let users = [];

  try {
    const data = await fetch(
      "https://node-20240823-eta.vercel.app/api/products"
    );

    users = await data.json();
  } catch (error) {
    throw new Error("Something went wrong.");
  }

  return (
    <div className="flex items-center justify-center flex-col container mx-auto py-12 ">
      {users.map((user) => (
        <div key={user.id} className="w-full bg-primary px-8 py-3 my-3">
          <div className="w-full h-6 text-white">{user.name}</div>
        </div>
      ))}
    </div>
  );
}
