import type { Metadata } from "next";
import { PageHero } from "@/components/site/page-hero";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Chính sách bảo mật",
  description: "Chính sách bảo mật thông tin khách hàng của Công ty TNHH Tư vấn Thiết kế - Xây dựng Đông Á.",
  path: "/bao-mat",
});

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Chính sách"
        title="Chính sách bảo mật"
        description="Chúng tôi cam kết bảo vệ thông tin cá nhân của khách hàng."
        crumbs={[{ label: "Chính sách bảo mật" }]}
      />
      <Section>
        <Container size="narrow">
          <div className="prose prose-lg max-w-none">
            <p>Đông Á tôn trọng và bảo vệ quyền riêng tư của khách hàng. Chính sách này giải thích cách chúng tôi thu thập, sử dụng và bảo vệ thông tin cá nhân của bạn.</p>
            <h2>1. Thông tin chúng tôi thu thập</h2>
            <p>Chúng tôi có thể thu thập các thông tin sau: họ tên, số điện thoại, email, địa chỉ, thông tin dự án khi bạn liên hệ hoặc yêu cầu báo giá.</p>
            <h2>2. Mục đích sử dụng</h2>
            <p>Thông tin của bạn được sử dụng để: tư vấn, báo giá, liên hệ hỗ trợ, cải thiện dịch vụ và gửi thông tin khuyến mãi (nếu bạn đồng ý).</p>
            <h2>3. Bảo mật thông tin</h2>
            <p>Chúng tôi áp dụng các biện pháp bảo mật kỹ thuật và tổ chức để bảo vệ thông tin cá nhân khỏi truy cập trái phép, mất mát hoặc tiết lộ.</p>
            <h2>4. Chia sẻ thông tin</h2>
            <p>Chúng tôi không bán, trao đổi hoặc cho thuê thông tin cá nhân của khách hàng cho bên thứ ba vì mục đích thương mại.</p>
            <h2>5. Quyền của khách hàng</h2>
            <p>Bạn có quyền yêu cầu truy cập, chỉnh sửa hoặc xóa thông tin cá nhân của mình bất cứ lúc nào bằng cách liên hệ với chúng tôi.</p>
            <h2>6. Liên hệ</h2>
            <p>Mọi thắc mắc về chính sách bảo mật, vui lòng liên hệ: xaydungdonga@gmail.com hoặc 0901 219 261.</p>
          </div>
        </Container>
      </Section>
    </>
  );
}