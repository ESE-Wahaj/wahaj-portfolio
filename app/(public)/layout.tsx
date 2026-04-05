import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CustomCursor from '@/components/layout/CustomCursor';
import BackToTop from '@/components/shared/BackToTop';
import AIChat from '@/components/shared/AIChat';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CustomCursor />
      <Navbar />
      <main className="flex-1 pt-20">{children}</main>
      <Footer />
      <BackToTop />
      <AIChat />
    </>
  );
}
