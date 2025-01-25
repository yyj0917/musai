import SymbolLogo from "@public/svg/symbol-logo.svg";

export default function NotFoundAll({ alertText }: { alertText: string }) {
  return (
    <div className="my-auto flex flex-col items-center gap-[14px] text-grey650 text-body1">
        <SymbolLogo />
        <p>{alertText}</p>
    </div>
  );
}