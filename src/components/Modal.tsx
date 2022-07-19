import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

interface Props {
  setShowModal: (arg: boolean) => void;
  children: JSX.Element;
  heading: string;
}

export default function Modal(props: Props) {
  const modal = useRef<HTMLDivElement>(null);

  const handle_keydown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      props.setShowModal(false);
      return;
    }

    if (e.key === "Tab") {
      // trap focus
      const nodes = modal.current?.querySelectorAll("*") ?? [];
      const tabbable = Array.from(nodes).filter((n: any) => n.tabIndex >= 0);

      if (document.activeElement) {
        let index = tabbable.indexOf(document.activeElement);
        if (index === -1 && e.shiftKey) index = 0;

        index += tabbable.length + (e.shiftKey ? -1 : 1);
        index %= tabbable.length;

        (tabbable[index] as any)?.focus();
      }

      e.preventDefault();
    }
  };

  const previously_focused =
    typeof document !== "undefined" && (document.activeElement as any);

  useEffect(() => {
    previously_focused?.blur();
    document.addEventListener("keydown", handle_keydown);

    return () => {
      document.removeEventListener("keydown", handle_keydown);
    };
  }, []);

  function hideModal(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (e.currentTarget === e.target) {
      props.setShowModal(false);
    }
  }

  return createPortal(
    <div
      className="fixed top-0 left-0 bg-black/50 w-full h-full cursor-pointer"
      onClick={(e) => hideModal(e)}
    >
      <div
        ref={modal}
        className="cursor-default max-h-[600px] h-4/5 w-[430px] bg-[#2c2c38] z-10 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 p-5 flex flex-col rounded-lg overflow-auto"
      >
        <div className="flex justify-between items-center pb-4 ">
          <h1 className="text-white/90 text-[1.35rem] font-semibold mt-0.5">
            {props.heading}
          </h1>

          <button
            onClick={() => props.setShowModal(false)}
            className="bg-[#404050] rounded-full w-8 h-8 grid place-content-center cursor-pointer text-white/90"
          >
            <span>X</span>
          </button>
        </div>

        {props.children}
      </div>
    </div>,
    document.body
  );
}
