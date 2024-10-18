export const NightSvg = (props) => {
  return (
    <svg
      {...props}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask
        id="mask0_2012_13405"
        style={{ maskType: 'alpha' }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="24"
        height="24"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M24 0H0V24H24V0ZM20.25 3.75H11.25V12.75H20.25V3.75Z"
          fill="url(#pattern0_2012_13405)"
        />
      </mask>
      <g mask="url(#mask0_2012_13405)">
        <rect width="24" height="24" rx="4" fill="#202020" />
      </g>
      <mask
        id="mask1_2012_13405"
        style={{ maskType: 'alpha' }}
        maskUnits="userSpaceOnUse"
        x="11"
        y="3"
        width="10"
        height="10"
      >
        <rect
          x="11.25"
          y="3.75"
          width="9"
          height="9"
          fill="url(#pattern1_2012_13405)"
        />
      </mask>
      <g mask="url(#mask1_2012_13405)">
        <rect x="11.25" y="3.75" width="9" height="9" fill="#F5F4F4" />
      </g>
      <defs>
        <pattern
          id="pattern0_2012_13405"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use href="#image0_2012_13405" transform="scale(0.005)" />
        </pattern>
        <pattern
          id="pattern1_2012_13405"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use
            href="#image0_2012_13405"
            transform="translate(-1.25 -0.416667) scale(0.0133333)"
          />
        </pattern>
        <image
          id="image0_2012_13405"
          width="200"
          height="200"
          href="data:image/png;base64,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"
        />
      </defs>
    </svg>
  );
};
