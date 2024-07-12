'use client'
import { upload } from "@/src/lib/actions";
import { Button } from "@/src/ui/button";

export default function DataPushButton( { obj }: { obj: object}) {

  async function handleClick() {
    try {
      await upload(obj);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Button onClick={handleClick} type="submit">
      作成
    </Button>

  );

}

