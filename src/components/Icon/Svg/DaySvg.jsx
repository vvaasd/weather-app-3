export const DaySvg = (props) => {
  return (
    <svg
      {...props}
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask
        id="mask0_2012_13402"
        style={{ maskType: 'alpha' }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="32"
        height="32"
      >
        <rect width="32" height="32" fill="url(#pattern0_2012_13402)" />
      </mask>
      <g mask="url(#mask0_2012_13402)">
        <rect width="32" height="32" fill="#F5F4F4" />
      </g>
      <defs>
        <pattern
          id="pattern0_2012_13402"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use href="#image0_2012_13402" transform="scale(0.005)" />
        </pattern>
        <image
          id="image0_2012_13402"
          width="200"
          height="200"
          href="data:image/png;base64,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"
        />
      </defs>
    </svg>
  );
};
