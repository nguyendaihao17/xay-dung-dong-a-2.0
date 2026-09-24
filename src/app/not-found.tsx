import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-6">
      <div className="text-center">
        <p className="font-display text-display-xl uppercase leading-none text-navy-900">404</p>
        <h1 className="mt-6 font-display text-2xl uppercase text-navy-900">
          Không tìm thấy trang
        </h1>
        <p className="mt-4 text-neutral-600">
          Trang bạn tìm không tồn tại hoặc đã bị di chuyển.
        </p>
        <div className="mt-10">
          <Button href="/" size="lg">Về trang chủ</Button>
        </div>
      </div>
    </div>
  );
}