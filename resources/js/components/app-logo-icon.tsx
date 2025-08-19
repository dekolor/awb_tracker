import { SVGAttributes } from 'react';

export default function AppLogoIconV2(props: SVGAttributes<SVGElement>) {
  return (
    <svg
      viewBox="0 0 40 40"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      {/* Outer isometric box */}
      <path d="M20 3 34 11v18l-14 8L6 29V11L20 3Z" />

      {/* Top plane seam */}
      <path d="M6 11 20 19 34 11" />

      {/* Front vertical seam */}
      <path d="M20 19V37" />

      {/* Delivery checkmark on the front face */}
      <path d="M13 23l5 5 10-10" />
    </svg>
  );
}
