'use server';

import { signIn } from '@/auth';
import { sql } from '@vercel/postgres';
import { promises as fs } from "fs";
import { AuthError } from 'next-auth';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

// Invoiceフォーム
const FormSchema = z.object({
  id: z.string(),
  customerId: z.string({
    invalid_type_error: 'Please select a customer.',
  }),
  amount: z.coerce
    .number()
    .gt(0, { message: 'Please enter an amount greater than $0.' }),
  status: z.enum(['pending', 'paid'], {
    invalid_type_error: 'Please select an invoice status.',
  }),
  date: z.string(),
});

// Invoice作成
const CreateInvoice = FormSchema.omit({ id: true, date: true });

export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};

export async function createInvoice(prevState: State, formData: FormData) {
  // Validate form using Zod
  const validatedFields = CreateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });
 
  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Invoice.',
    };
  }
 
  // Prepare data for insertion into the database
  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split('T')[0];
 
  // Insert data into the database
  try {
    await sql`
      INSERT INTO invoices (customer_id, amount, status, date)
      VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
    `;
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: 'Database Error: Failed to Create Invoice.',
    };
  }
 
  // Revalidate the cache for the invoices page and redirect the user.
  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

// Invoice更新
const UpdateInvoice = FormSchema.omit({ id: true, date: true });

export async function updateInvoice(
  id: string,
  prevState: State,
  formData: FormData,
) {
  const validatedFields = UpdateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });
 
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Invoice.',
    };
  }
 
  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;
 
  try {
    await sql`
      UPDATE invoices
      SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
      WHERE id = ${id}
    `;
  } catch (error) {
    return { message: 'Database Error: Failed to Update Invoice.' };
  }
 
  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

// Invoice削除
export async function deleteInvoice(id: string) {
  try {
    await sql`DELETE FROM invoices WHERE id = ${id}`;
    revalidatePath('/dashboard/invoices');
    return { message: 'Deleted Invoice.' };
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Invoice.' };
  }
}

// ログイン
export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

// Open-DB
export async function upload(id: string, content : object) {
  try {
    const text = JSON.stringify(content);
    await fs.writeFile(`private/${id}.json`, text, 'utf8');
    console.log('ファイルにデータが書き込まれました。');
  } catch (err) {
    console.error('エラーが発生しました:', err);
  }
}

export async function download(id: string) {
  try {
    const data = await fs.readFile(`private/${id}.json`, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error('エラーが発生しました:', err);
  }
}

export async function unlinkTable(id: string) {
  try {
    const data = await fs.unlink(`private/${id}.json`);
    console.log('ファイルを削除しました。');
  } catch (err) {
    console.error('エラーが発生しました:', err);
  }
}

export async function createTable(
  email: string, title: string, table: object
) {
 
  // Insert data into the database
  try {
    const inserted = await sql`
      WITH inserted_table AS (
        INSERT INTO tables (creator_id, title)
        SELECT id, ${title}
        FROM users
        WHERE email = ${email}
        RETURNING *
      )
      SELECT *
      FROM inserted_table
    `;

    const table_id = inserted?.rows[0]?.table_id;
    await upload(table_id, table);
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: 'Database Error: Failed to Create Invoice.',
    };
  }
 
  // Revalidate the cache for the invoices page and redirect the user.
  revalidatePath('/home');
  redirect('/home');
}

export async function deleteTable(id: string) {
  try {
    await sql`DELETE FROM tables WHERE table_id = ${id}`;
    revalidatePath('/home');
    unlinkTable(id);
    return { message: 'Deleted Table.' };
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Table.' };
  }
}