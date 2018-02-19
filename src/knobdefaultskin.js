export default  {
    knobX: 71,
    knobY: 71,
    svg:
`<svg width="208px" height="208px" viewBox="0 0 208 208" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <!-- Generator: Sketch 47.1 (45422) - http://www.bohemiancoding.com/sketch -->
    <desc>Created with Sketch.</desc>
    <defs>
        <linearGradient x1="50%" y1="50%" x2="50%" y2="100%" id="linearGradient-1">
            <stop stop-color="#444040" stop-opacity="0.51098279" offset="0%"></stop>
            <stop stop-color="#131111" stop-opacity="0.893200861" offset="100%"></stop>
        </linearGradient>
        <circle id="path-2" cx="100" cy="100" r="100"></circle>
        <filter x="-3.2%" y="-3.2%" width="106.5%" height="106.5%" filterUnits="objectBoundingBox" id="filter-3">
            <feMorphology radius="0.5" operator="dilate" in="SourceAlpha" result="shadowSpreadOuter1"></feMorphology>
            <feOffset dx="0" dy="0" in="shadowSpreadOuter1" result="shadowOffsetOuter1"></feOffset>
            <feGaussianBlur stdDeviation="2" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur>
            <feComposite in="shadowBlurOuter1" in2="SourceAlpha" operator="out" result="shadowBlurOuter1"></feComposite>
            <feColorMatrix values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.5 0" type="matrix" in="shadowBlurOuter1"></feColorMatrix>
        </filter>
        <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="linearGradient-4">
            <stop stop-color="#FFFFFF" stop-opacity="0.5" offset="0%"></stop>
            <stop stop-color="#000000" stop-opacity="0.5" offset="100%"></stop>
        </linearGradient>
        <circle id="path-5" cx="100" cy="100" r="86"></circle>
        <filter x="-4.1%" y="-3.5%" width="108.1%" height="108.1%" filterUnits="objectBoundingBox" id="filter-6">
            <feMorphology radius="0.5" operator="dilate" in="SourceAlpha" result="shadowSpreadOuter1"></feMorphology>
            <feOffset dx="0" dy="1" in="shadowSpreadOuter1" result="shadowOffsetOuter1"></feOffset>
            <feGaussianBlur stdDeviation="2" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur>
            <feComposite in="shadowBlurOuter1" in2="SourceAlpha" operator="out" result="shadowBlurOuter1"></feComposite>
            <feColorMatrix values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.5 0" type="matrix" in="shadowBlurOuter1"></feColorMatrix>
        </filter>
        <text id="text-7" font-family="Helvetica" font-size="48" font-weight="normal" fill="#A3C8F4">
            <tspan x="38" y="115.588235">10.10</tspan>
        </text>
        <filter x="-4.8%" y="-10.3%" width="109.6%" height="120.7%" filterUnits="objectBoundingBox" id="filter-8">
            <feOffset dx="0" dy="0" in="SourceAlpha" result="shadowOffsetOuter1"></feOffset>
            <feGaussianBlur stdDeviation="2" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur>
            <feColorMatrix values="0 0 0 0 0.639215686   0 0 0 0 0.784313725   0 0 0 0 0.956862745  0 0 0 1 0" type="matrix" in="shadowBlurOuter1"></feColorMatrix>
        </filter>
        <pattern id="pattern-9" width="8.04411765" height="8.04411765" x="21.9558824" y="21.3676471" patternUnits="userSpaceOnUse">
            <use xlink:href="#image-10" transform="scale(0.167585784,0.167585784)"></use>
        </pattern>
        <image id="image-10" width="48" height="48" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAEGWlDQ1BrQ0dDb2xvclNwYWNlR2VuZXJpY1JHQgAAOI2NVV1oHFUUPrtzZyMkzlNsNIV0qD8NJQ2TVjShtLp/3d02bpZJNtoi6GT27s6Yyc44M7v9oU9FUHwx6psUxL+3gCAo9Q/bPrQvlQol2tQgKD60+INQ6Ium65k7M5lpurHeZe58853vnnvuuWfvBei5qliWkRQBFpquLRcy4nOHj4g9K5CEh6AXBqFXUR0rXalMAjZPC3e1W99Dwntf2dXd/p+tt0YdFSBxH2Kz5qgLiI8B8KdVy3YBevqRHz/qWh72Yui3MUDEL3q44WPXw3M+fo1pZuQs4tOIBVVTaoiXEI/MxfhGDPsxsNZfoE1q66ro5aJim3XdoLFw72H+n23BaIXzbcOnz5mfPoTvYVz7KzUl5+FRxEuqkp9G/Ajia219thzg25abkRE/BpDc3pqvphHvRFys2weqvp+krbWKIX7nhDbzLOItiM8358pTwdirqpPFnMF2xLc1WvLyOwTAibpbmvHHcvttU57y5+XqNZrLe3lE/Pq8eUj2fXKfOe3pfOjzhJYtB/yll5SDFcSDiH+hRkH25+L+sdxKEAMZahrlSX8ukqMOWy/jXW2m6M9LDBc31B9LFuv6gVKg/0Szi3KAr1kGq1GMjU/aLbnq6/lRxc4XfJ98hTargX++DbMJBSiYMIe9Ck1YAxFkKEAG3xbYaKmDDgYyFK0UGYpfoWYXG+fAPPI6tJnNwb7ClP7IyF+D+bjOtCpkhz6CFrIa/I6sFtNl8auFXGMTP34sNwI/JhkgEtmDz14ySfaRcTIBInmKPE32kxyyE2Tv+thKbEVePDfW/byMM1Kmm0XdObS7oGD/MypMXFPXrCwOtoYjyyn7BV29/MZfsVzpLDdRtuIZnbpXzvlf+ev8MvYr/Gqk4H/kV/G3csdazLuyTMPsbFhzd1UabQbjFvDRmcWJxR3zcfHkVw9GfpbJmeev9F08WW8uDkaslwX6avlWGU6NRKz0g/SHtCy9J30o/ca9zX3Kfc19zn3BXQKRO8ud477hLnAfc1/G9mrzGlrfexZ5GLdn6ZZrrEohI2wVHhZywjbhUWEy8icMCGNCUdiBlq3r+xafL549HQ5jH+an+1y+LlYBifuxAvRN/lVVVOlwlCkdVm9NOL5BE4wkQ2SMlDZU97hX86EilU/lUmkQUztTE6mx1EEPh7OmdqBtAvv8HdWpbrJS6tJj3n0CWdM6busNzRV3S9KTYhqvNiqWmuroiKgYhshMjmhTh9ptWhsF7970j/SbMrsPE1suR5z7DMC+P/Hs+y7ijrQAlhyAgccjbhjPygfeBTjzhNqy28EdkUh8C+DU9+z2v/oyeH791OncxHOs5y2AtTc7nb/f73TWPkD/qwBnjX8BoJ98VQNcC+8AAAFFSURBVGgF7djbDYMwDAXQBjEMYqyqY1WMxTppLiJIQIA8ariWkp8IPuweO60am67r7MstY8wwjuPH7dMz3uUua63p+/7r9rePIRW/9QmQzCV9ub0YgSIgzhxvQkjFb1EZBAdEKolkfJTqtnb7bv/zOJm58moRE0AzYgFoRawAGhE7gDZEEKAJcQjQgjgFaEBcAtgRUQBmRDSAFZEEYEQkA9gQWQAmRDaABVEEYEAUAx5H4EaGOyw+SMl66mbXzNOD4k6gCPNUY/CFwF1YOn5zRxJJRINqaUbUuZA/79sd3wm3xIdbdS60rXzo2XVCbO60/HxKJgFKKv4CkEziuyKBWAE0InYAbYggQBPiEKAFcQrQgLgEsCOiAMyIaAArIgnAiEgGsCGyAEyIbAALogjAgCgGPI7AX9w6F3JtqHMhnMWLFSrSD9jOnakVHpZYAAAAAElFTkSuQmCC"></image>
    </defs>
    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="s12" transform="translate(4.000000, 4.000000)">
            <g id="container">
                <g id="Oval-2">
                    <use fill="black" fill-opacity="1" filter="url(#filter-3)" xlink:href="#path-2"></use>
                    <use stroke="#979797" stroke-width="1" fill="url(#linearGradient-1)" fill-rule="evenodd" xlink:href="#path-2"></use>
                </g>
                <g id="Oval-2">
                    <use fill="black" fill-opacity="1" filter="url(#filter-6)" xlink:href="#path-5"></use>
                    <use fill="" fill-rule="evenodd" xlink:href="#path-5"></use>
                    <use stroke="#4A4A4A" stroke-width="1" fill="url(#linearGradient-4)" fill-rule="evenodd" xlink:href="#path-5"></use>
                </g>
                <g id="knob" transform="translate(29.000000, 29.431373)">
                    <circle id="Oval-5" fill="#322E2E" cx="71" cy="71" r="71"></circle>
                    <path d="M72.5,0.941176471 L89,14.1141061 C81.8011199,15.3927214 76.3011199,16.0320291 72.5,16.0320291 C68.6988801,16.0320291 63.1988801,15.3927214 56,14.1141061 L72.5,0.941176471 Z" id="Rectangle" fill="#EF7C7C" transform="translate(72.500000, 8.486603) scale(1, -1) translate(-72.500000, -8.486603) "></path>
                </g>
                <g id="label" transform="translate(0.000000, 1.000000)">
                    <g id="labeltext" fill-opacity="1" fill="#A3C8F4">
                        <use filter="url(#filter-8)" xlink:href="#text-7"></use>
                        <use xlink:href="#text-7"></use>
                    </g>
                    <circle id="Oval-6" stroke="#979797" fill="url(#pattern-9)" transform="translate(100.349998, 99.761763) rotate(-45.000000) translate(-100.349998, -99.761763) " cx="100.349998" cy="99.7617632" r="70.3499985"></circle>
                </g>
            </g>
        </g>
    </g>
</svg>`
}