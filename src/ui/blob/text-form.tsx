import { put } from '@vercel/blob';
import { revalidatePath } from "next/cache";

export async function Form() {
  async function uploadImage(formData: FormData) {
    'use server';
    const text = formData.get('hello')?.toString()?? "default";
    const blob = await put("text.txt", text, {
      access: 'public',
    });
    console.log(blob);
    revalidatePath('/');
    return blob;
  }

  return (
    <form action={uploadImage} className='flex gap-2'>
      <div className='flex gap-1 items-center'>
        <label htmlFor="hello">Text:</label>
        <input type="text" id="hello" name="hello" required />
      </div>
      <button className='btn btn-outline btn-primary'>Send</button>
    </form>
  );
}