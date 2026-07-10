import type { ComponentProps, FocusEvent, MouseEvent, TouchEvent } from "react";
import { Link } from "wouter";
import { preloadRoute } from "../routes";

// Drop-in replacement for wouter's <Link> that preloads the target page's
// chunk as soon as the user shows intent to navigate (hover, keyboard focus,
// or touch). By the time the click lands, the chunk is usually in flight or
// already cached, so navigation feels instant. See src/routes.ts for the
// full preloading picture.
//
// HOW TO REMOVE: swap <PreloadLink> back to wouter's <Link> wherever it is
// used (the props are identical), delete this file, and follow the removal
// steps in src/routes.ts.

// Mirrors wouter's <Link> props in its plain-anchor form. wouter's asChild
// variant and `to` alias are not supported here — use wouter's <Link>
// directly if you need those.
type PreloadLinkProps = Omit<ComponentProps<"a">, "className" | "href"> & {
  href: string;
  className?: string | ((isActive: boolean) => string | undefined);
  replace?: boolean;
  state?: unknown;
};

const PreloadLink = (props: PreloadLinkProps) => {
  const handleIntent = () => {
    preloadRoute(props.href);
  };

  return (
    <Link
      {...props}
      onMouseEnter={(event: MouseEvent<HTMLAnchorElement>) => {
        handleIntent();
        props.onMouseEnter?.(event);
      }}
      onFocus={(event: FocusEvent<HTMLAnchorElement>) => {
        handleIntent();
        props.onFocus?.(event);
      }}
      onTouchStart={(event: TouchEvent<HTMLAnchorElement>) => {
        handleIntent();
        props.onTouchStart?.(event);
      }}
    />
  );
};

export default PreloadLink;
