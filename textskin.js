export default {
  knobX: 84,
  knobY: 84.5,
  svg: `
  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="200px" height="200px" viewBox="0 0 200 200" version="1.1">
  <!-- Generator: Sketch 47.1 (45422) - http://www.bohemiancoding.com/sketch -->
  <desc>Created with Sketch.</desc>
  <defs>
      <linearGradient x1="50%" y1="50%" x2="50%" y2="100%" id="aef09add-5e78-f6d8-fa5d-05a5a7a5952a">
          <stop stop-color="#696363" offset="0%"/>
          <stop stop-color="#353131" offset="100%"/>
      </linearGradient>
      <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="21a20885-4bb2-1cc0-f500-9d034ea44cdb">
          <stop stop-color="#747171" offset="0%"/>
          <stop stop-color="#858383" offset="0%"/>
          <stop stop-color="#939191" offset="6.74580791%"/>
          <stop stop-color="#939191" offset="6.74580791%"/>
          <stop stop-color="#EDEDED" offset="50.0553592%"/>
          <stop stop-color="#676565" offset="100%"/>
      </linearGradient>
      
      <filter x="-14.6%" y="-20.7%" width="129.3%" height="141.4%" filterUnits="objectBoundingBox" id="90b677ed-e5c3-914d-925f-adea9122bdbe">
          <feOffset dx="0" dy="0" in="SourceAlpha" result="shadowOffsetOuter1"/>
          <feGaussianBlur stdDeviation="2" in="shadowOffsetOuter1" result="shadowBlurOuter1"/>
          <feColorMatrix values="0 0 0 0 0.639215686   0 0 0 0 0.784313725   0 0 0 0 0.956862745  0 0 0 1 0" type="matrix" in="shadowBlurOuter1"/>
      </filter>
  </defs>
  <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
      <g id="s5">
          <g id="s5outer" fill-rule="nonzero" fill="url(#aef09add-5e78-f6d8-fa5d-05a5a7a5952a)">
              <g id="path-2-link">
                  <circle id="path-2" cx="100" cy="100" r="100"/>
              </g>
          </g>
          <g id="knob" transform="translate(16.000000, 15.000000)">
              <g id="s5inneroutercircle" transform="translate(0.000000, 1.000000)" stroke-width="6" stroke="#3D3D3D" fill="url(#21a20885-4bb2-1cc0-f500-9d034ea44cdb)">
                  <g id="path-5-link">
                      <circle id="path-5" cx="84" cy="84" r="84"/>
                  </g>
              </g>
              <g id="s5innercircle" transform="translate(44.000000, 45.000000)" fill-rule="nonzero" fill="#3D3D3D">
                  <g id="path-7-link">
                      <circle id="path-7" cx="40" cy="40" r="40"/>
                  </g>
              </g>
              <path d="M84.5,-6.28031714e-07 L101,61.0983616 C95.7956227,62.6405898 90.2956227,63.4029374 84.5,63.3854044 C78.7043773,63.3678715 73.2043773,62.6055239 68,61.0983616 L84.5,-6.28031714e-07 Z" id="s5marker" fill="#3D3D3D" fill-rule="nonzero" transform="translate(84.500000, 31.692850) scale(-1, 1) rotate(-180.000000) translate(-84.500000, -31.692850) "/>
          </g>
          <g id="s5label" transform="translate(80.000000, 84.000000)" fill="#A3C8F4">
              <g id="s5labeltext">
                  <g id="100">
                      <text id="b1560b49-9d56-9a7f-a123-317732728a3e" font-family="Helvetica" font-size="24" font-weight="normal" class="text-3" filter="url(#90b677ed-e5c3-914d-925f-adea9122bdbe)">
          <tspan x="0.72851562" y="23">100</tspan>
      </text>
                      <text id="03696ac6-c13b-7a28-b5ff-91dcbe4859fd" font-family="Helvetica" font-size="24" font-weight="normal" class="text-3">
          <tspan x="0.72851562" y="23">100</tspan>
      </text>
                      <text id="158c5fa5-ac26-6dda-8a27-0ee1ae843905" font-family="Helvetica" font-size="24" font-weight="normal" class="text-3">
          <tspan x="0.72851562" y="23">100</tspan>
      </text>
                  </g>
              </g>
          </g>
      </g>
  </g>
</svg>
    `,
  updateAttributes: [
    {
      element: "#s5labeltext text tspan",
      content: (props, value) => {
        return value.toFixed(0);
      },
      attrs: [
        {
          name: "text-anchor",
          value: (props, value) => {
            return "middle";
          }
        },
        {
          name: "x",
          value: (props, value) => {
            return "21";
          }
        }
      ]
    }
  ]
};
