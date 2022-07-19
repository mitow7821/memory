import { useRef } from "react";
import { createPortal } from "react-dom";

interface Props {
  children: JSX.Element;
}

export default function Modal(props: Props) {
  const modal = useRef<HTMLDivElement>(null);

  return createPortal(
    <div className="fixed top-0 left-0 bg-black/50 w-full h-full cursor-pointer z-50">
      <div
        ref={modal}
        className="cursor-default max-h-[600px] h-4/5 w-[430px] bg-dark z-10 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 p-5 flex flex-col rounded-lg overflow-auto"
      >
        {props.children}
      </div>
    </div>,
    document.body
  );
}
