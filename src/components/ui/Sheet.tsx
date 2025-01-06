import { useModal } from "@/context/ModalContext";

function Sheet({ children }: { children: React.ReactNode }) {
  const { isOpen, closeModal } = useModal();
  return (
    <div
      className={`fixed top-0 left-0 z-20 w-full h-full bg-black/40 transition-all duration-500 ease-in-out ${
        isOpen ? "opacity-100 " : "opacity-0 pointer-events-none"
      }`}
      onClick={(e) => {
        e.stopPropagation();
        closeModal();
      }}
    >
      {children}
    </div>
  );
}

export default Sheet;
