'use server';

import { signIn } from '@/auth';
import { del, put } from '@vercel/blob';
import { sql } from '@vercel/postgres';
import { AuthError, User } from 'next-auth';
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

/************************************ */
// Open-DB開発
/************************************ */

/**
 * テーブルアップロード
 * @param content 
 * @returns 
 */
export async function upload(content: object) {
  try {
    const text = JSON.stringify(content);
    const blob = await put("tables/table.json", text, {
      access: 'public',
    });
    console.log('ファイルにデータが書き込まれました。');
    return blob.url;
  } catch (err) {
    console.error('エラーが発生しました:', err);
    return null;
  }
}

/**
 * テーブルダウンロード
 * @param content 
 * @returns 
 */
export async function download(url: string) {
  try {
    const response = await fetch(url);
    return response.json();
  } catch (err) {
    console.error('エラーが発生しました:', err);
  }
}

/**
 * テーブル削除
 * @param url 
 */
export async function deleteTable(url: string) {
  try {
    await del(url);
    console.log('ファイルを削除しました。');
  } catch (err) {
    console.error('エラーが発生しました:', err);
  }
}

/**
 * テーブル情報追加
 * @param email
 * @param title 
 * @param url 
 * @returns 
 */
export async function createTable(
  email: string,
  title: string,
  url: string
) {

  // Insert data into the database
  try {
    await sql`
      INSERT INTO tables (creator_id, title, content_url)
      SELECT id, ${title}, ${url}
      FROM users WHERE email = ${email}
    `;
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: 'Database Error: Failed to Create Invoice.',
    };
  }

  // Revalidate the cache for the invoices page and redirect the user.
  revalidatePath('/tables/home');
  redirect('/tables/home');
}

/**
 * テーブル名編集
 */
export async function editTable(
  id: string,
  title: string,
) {

  // Insert data into the database
  try {
    await sql`
      UPDATE tables
      SET title = ${title}
      WHERE table_id = ${id}
    `;
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: 'Database Error: Failed to Create Invoice.',
    };
  }

  // Revalidate the cache for the invoices page and redirect the user.
  revalidatePath('/tables/home');
  redirect('/tables/home');
}

/**
 * テーブル情報削除
 * @param id 
 * @returns 
 */
export async function removeTable(id: string) {
  try {
    await sql`DELETE FROM tables WHERE table_id = ${id}`;
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Table.' };
  }
  revalidatePath('/tables/home');
  redirect('/tables/home');
}

/**
 * ユーザ情報取得
 * @param email 
 * @returns 
 */
export async function getUser(email: string, name: string) {
  try {
    const user = await sql<User>`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0];
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

/**
 * ユーザ名変更
 */
export async function updateUserName(name: string, email: string) {
  try {
    await sql`
      UPDATE users
      SET name = ${name}
      WHERE email = ${email}
    `;
  } catch (error) {
    console.error('Failed to update user:', error);
    throw new Error('Failed to update user.');
  }
}