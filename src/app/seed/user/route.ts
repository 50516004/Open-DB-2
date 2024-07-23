import { User } from '@/src/lib/definitions';
import { db } from '@vercel/postgres';
import bcrypt from 'bcrypt';

const client = await db.connect();

async function addUser(user: User) {

  const hashedPassword = await bcrypt.hash(user.password, 10);
  const insertedUsers = await client.sql`
      INSERT INTO users (name, email, password)
      VALUES (${user.name}, ${user.email}, ${hashedPassword})
      ON CONFLICT (id) DO NOTHING;
  `;

  return insertedUsers;
}

export async function GET() {

  const user: User = {
    id: "",
    name: "Kenshin",
    email: "kenshin@nextmail.com",
    password: "nsu8v4p8nt",
  };

  try {
    await client.sql`BEGIN`;
    await addUser(user);
    await client.sql`COMMIT`;

    return Response.json({ message: 'Database seeded successfully' });
  } catch (error) {
    await client.sql`ROLLBACK`;
    return Response.json({ error }, { status: 500 });
  }
}
