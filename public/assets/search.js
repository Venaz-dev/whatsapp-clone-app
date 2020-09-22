import * as React from "react";

function Search({color}) {
  return (
    <svg width={25} height={25} viewBox="0 0 25 25" /*{...props}*/>
      <defs>
        <clipPath id="prefix__a">
          <path
            data-name="Rectangle 27"
            transform="translate(686 55)"
            fill="#ee7329"
            d="M0 0h25v25H0z"
          />
        </clipPath>
      </defs>
      <g
        data-name="Mask Group 4"
        transform="translate(-686 -55)"
        clipPath="url(#prefix__a)"
      >
        <g data-name="loupe (1)">
          <g data-name="Group 11">
            <path
              data-name="Path 649"
              d="M710.695 78.222l-7.109-7.109a9.915 9.915 0 10-1.473 1.473l7.109 7.109a1.042 1.042 0 101.473-1.473zM695.9 72.708a7.812 7.812 0 117.808-7.808 7.821 7.821 0 01-7.808 7.808z"
              fill={color}
            />
          </g>
        </g>
      </g>
    </svg>
  );
}

export default Search;
