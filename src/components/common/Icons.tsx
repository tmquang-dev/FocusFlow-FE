import React from 'react';

// Eye Icon (16x16) - Exports with currentColor
export const EyeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <g clipPath="url(#clip0_120_99)">
            <path
                d="M0.666504 7.99999C0.666504 7.99999 3.33317 2.66666 7.99984 2.66666C12.6665 2.66666 15.3332 7.99999 15.3332 7.99999C15.3332 7.99999 12.6665 13.3333 7.99984 13.3333C3.33317 13.3333 0.666504 7.99999 0.666504 7.99999Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M7.99984 9.99999C9.10441 9.99999 9.99984 9.10456 9.99984 7.99999C9.99984 6.89542 9.10441 5.99999 7.99984 5.99999C6.89527 5.99999 5.99984 6.89542 5.99984 7.99999C5.99984 9.10456 6.89527 9.99999 7.99984 9.99999Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </g>
        <defs>
            <clipPath id="clip0_120_99">
                <rect width="16" height="16" fill="currentColor" />
            </clipPath>
        </defs>
    </svg>
);

// Eye Off Icon (16x16) - Exports with currentColor
export const EyeOffIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <g clipPath="url(#clip0_138_4504)">
            <path d="M11.9598 11.96C10.8202 12.8287 9.43258 13.3099 7.99984 13.3333C3.33317 13.3333 0.666504 7.99999 0.666504 7.99999C1.49576 6.45459 2.64593 5.10439 4.03984 4.03999M6.59984 2.82666C7.05872 2.71924 7.52855 2.66555 7.99984 2.66666C12.6665 2.66666 15.3332 7.99999 15.3332 7.99999C14.9285 8.75706 14.4459 9.46981 13.8932 10.1267M9.41317 9.41332C9.23007 9.60982 9.00927 9.76743 8.76394 9.87674C8.51861 9.98605 8.25377 10.0448 7.98523 10.0496C7.71669 10.0543 7.44995 10.0049 7.20091 9.90432C6.95188 9.80373 6.72565 9.65401 6.53573 9.46409C6.34582 9.27417 6.1961 9.04795 6.09551 8.79892C5.99492 8.54988 5.94552 8.28314 5.95026 8.0146C5.955 7.74605 6.01378 7.48122 6.12309 7.23589C6.2324 6.99056 6.39001 6.76976 6.5865 6.58666M0.666504 0.666656L15.3332 15.3333" stroke="#1E1E1E" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
            <clipPath id="clip0_138_4504">
                <rect width="16" height="16" fill="currentColor" />
            </clipPath>
        </defs>
    </svg>

);

// Logo Icon (19x24) - Exports with currentColor (lightning bolt)
export const LogoIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg width="18" height="23" viewBox="0 0 19 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path
            d="M4.66667 23.3333L5.83333 15.1667H0L10.5 0H12.8333L11.6667 9.33333H18.6667L7 23.3333H4.66667Z"
            fill="currentColor"
        />
    </svg>
);

// Google Icon (20x20) - Maintains original colorful vectors
export const GoogleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <mask id="mask0_63_3929" style={{ maskType: "luminance" }} maskUnits="userSpaceOnUse" x="0" y="0" width="20" height="20">
            <path
                d="M19.8079 8.14476H10.213V11.9894H15.7263C15.6377 12.5336 15.4387 13.0688 15.1472 13.5569C14.8133 14.1161 14.4006 14.5418 13.9775 14.866C12.7101 15.8372 11.2325 16.0358 10.2063 16.0358C7.61409 16.0358 5.39919 14.3604 4.54176 12.0838C4.50716 12.0012 4.48418 11.9159 4.4562 11.8315C4.26673 11.2521 4.1632 10.6384 4.1632 10.0006C4.1632 9.33685 4.27531 8.70145 4.47972 8.10134C5.28599 5.73451 7.55082 3.96672 10.2082 3.96672C10.7427 3.96672 11.2574 4.03034 11.7455 4.15724C12.861 4.44725 13.6501 5.01843 14.1336 5.47023L17.0511 2.61313C15.2764 0.985972 12.9629 2.46015e-09 10.2033 2.46015e-09C7.99721 -4.74827e-05 5.96042 0.687318 4.29133 1.84899C2.93776 2.79107 1.82764 4.0524 1.07844 5.5173C0.381576 6.87555 0 8.38075 0 9.99913C0 11.6176 0.382159 13.1384 1.07902 14.4841V14.4932C1.81508 15.9218 2.89146 17.1519 4.19967 18.0897C5.34254 18.9089 7.39181 20 10.2033 20C11.8202 20 13.2531 19.7085 14.5169 19.1622C15.4285 18.7681 16.2363 18.2541 16.9676 17.5935C17.9339 16.7206 18.6906 15.6409 19.2072 14.3987C19.7237 13.1565 20 11.7518 20 10.2289C20 9.51963 19.9288 8.79934 19.8079 8.14469V8.14476Z"
                fill="white"
            />
        </mask>
        <g mask="url(#mask0_63_3929)">
            <g filter="url(#filter0_f_63_3929)">
                <path
                    d="M-0.115479 10.0426C-0.104873 11.6355 0.349021 13.279 1.03607 14.6057V14.6149C1.53249 15.5784 2.21096 16.3395 2.98372 17.0936L7.65101 15.3906C6.76798 14.942 6.63324 14.6672 6.00026 14.1657C5.35341 13.5134 4.8713 12.7646 4.57106 11.8866H4.55897L4.57106 11.8775C4.37354 11.2977 4.35406 10.6822 4.34677 10.0426H-0.115479Z"
                    fill="url(#paint0_radial_63_3929)"
                />
            </g>
            <g filter="url(#filter1_f_63_3929)">
                <path
                    d="M10.2448 -0.097168C9.78351 1.52349 9.9599 3.09883 10.2448 4.01543C10.7775 4.01582 11.2907 4.07932 11.7773 4.20583C12.8928 4.49584 13.6818 5.06704 14.1653 5.51884L17.1574 2.58874C15.3849 0.963525 13.2517 -0.0946074 10.2448 -0.097168Z"
                    fill="url(#paint1_radial_63_3929)"
                />
            </g>
            <g filter="url(#filter2_f_63_3929)">
                <path
                    d="M10.2348 -0.109985C7.97202 -0.110034 5.88295 0.594978 4.17102 1.78647C3.53538 2.22888 2.95206 2.73992 2.43266 3.30822C2.29659 4.58477 3.45126 6.15378 5.73786 6.1408C6.84731 4.85026 8.48815 4.01528 10.3144 4.01528C10.3161 4.01528 10.3177 4.01542 10.3194 4.01543L10.2448 -0.109693C10.2414 -0.109695 10.2382 -0.109985 10.2348 -0.109985Z"
                    fill="url(#paint2_radial_63_3929)"
                />
            </g>
            <g filter="url(#filter3_f_63_3929)">
                <path
                    d="M17.7033 10.5045L15.6836 11.892C15.595 12.4361 15.3959 12.9714 15.1044 13.4595C14.7706 14.0186 14.3578 14.4444 13.9347 14.7686C12.6699 15.7378 11.1963 15.9373 10.1704 15.9381C9.10999 17.7441 8.92409 18.6487 10.2449 20.1063C11.8794 20.1051 13.3283 19.8101 14.6064 19.2576C15.5303 18.8582 16.3489 18.3373 17.09 17.6678C18.0692 16.7832 18.8363 15.689 19.3597 14.4302C19.8832 13.1713 20.1631 11.7478 20.1631 10.2045L17.7033 10.5045Z"
                    fill="url(#paint3_radial_63_3929)"
                />
            </g>
            <g filter="url(#filter4_f_63_3929)">
                <path d="M10.0957 7.97424V12.1111H19.8128C19.8983 11.5445 20.1809 10.8114 20.1809 10.2045C20.1809 9.49521 20.1098 8.62889 19.9889 7.97424H10.0957Z" fill="#3086FF" />
            </g>
            <g filter="url(#filter5_f_63_3929)">
                <path
                    d="M2.47909 3.16217C1.87944 3.81826 1.36716 4.55262 0.960978 5.34682C0.264127 6.70508 -0.117432 8.35634 -0.117432 9.97472C-0.117432 9.99752 -0.115544 10.0198 -0.115392 10.0426C0.193222 10.6343 4.14755 10.521 4.34686 10.0426C4.34661 10.0203 4.3441 9.99852 4.3441 9.97614C4.3441 9.31236 4.45624 8.8231 4.66065 8.22299C4.91281 7.48276 5.30764 6.80111 5.81252 6.21381C5.92697 6.0677 6.23225 5.75357 6.32132 5.56516C6.35525 5.49339 6.25972 5.45311 6.25438 5.42785C6.24841 5.39959 6.12033 5.42231 6.09164 5.40127C6.00054 5.33444 5.82014 5.29955 5.71059 5.26853C5.47645 5.20223 5.0884 5.05603 4.87287 4.90447C4.19158 4.42541 3.12837 3.85317 2.47909 3.16217Z"
                    fill="url(#paint4_radial_63_3929)"
                />
            </g>
            <g filter="url(#filter6_f_63_3929)">
                <path
                    d="M4.88756 5.43065C6.4674 6.38764 6.92173 4.9476 7.9721 4.49698L6.14495 0.707947C5.47282 0.990442 4.83779 1.34142 4.24858 1.7515C3.36865 2.36393 2.5916 3.11127 1.94971 3.96175L4.88756 5.43065Z"
                    fill="url(#paint5_radial_63_3929)"
                />
            </g>
            <g filter="url(#filter7_f_63_3929)">
                <path
                    d="M5.53052 15.0979C3.40979 15.8635 3.07778 15.8909 2.88257 17.2052C3.25561 17.5692 3.65642 17.906 4.08233 18.2113C5.2252 19.0305 7.42358 20.1216 10.2351 20.1216C10.2384 20.1216 10.2416 20.1213 10.2449 20.1213V15.8651C10.2427 15.8651 10.2403 15.8653 10.2382 15.8653C9.18535 15.8653 8.34405 15.5887 7.48144 15.1078C7.26876 14.9893 6.8829 15.3077 6.68675 15.1653C6.41622 14.969 5.76516 15.3345 5.53052 15.0979Z"
                    fill="url(#paint6_radial_63_3929)"
                />
            </g>
            <g opacity="0.5" filter="url(#filter8_f_63_3929)">
                <path
                    d="M9.00293 15.7311V20.0476C9.39631 20.0937 9.80571 20.1216 10.2352 20.1216C10.6657 20.1216 11.0822 20.0995 11.4869 20.0589V15.7602C11.0334 15.8377 10.6062 15.8653 10.2382 15.8653C9.81443 15.8653 9.40228 15.8159 9.00293 15.7311Z"
                    fill="url(#paint7_linear_63_3929)"
                />
            </g>
        </g>
        <defs>
            <filter id="filter0_f_63_3929" x="-0.585558" y="9.57252" width="8.70676" height="7.99112" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                <feGaussianBlur stdDeviation="0.23504" result="effect1_foregroundBlur_63_3929" />
            </filter>
            <filter id="filter1_f_63_3929" x="9.4911" y="-0.567247" width="8.13645" height="6.55619" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                <feGaussianBlur stdDeviation="0.23504" result="effect1_foregroundBlur_63_3929" />
            </filter>
            <filter id="filter2_f_63_3929" x="1.9518" y="-0.580065" width="8.83762" height="7.19101" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                <feGaussianBlur stdDeviation="0.23504" result="effect1_foregroundBlur_63_3929" />
            </filter>
            <filter id="filter3_f_63_3929" x="8.84413" y="9.73439" width="11.789" height="10.842" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                <feGaussianBlur stdDeviation="0.23504" result="effect1_foregroundBlur_63_3929" />
            </filter>
            <filter id="filter4_f_63_3929" x="9.62562" y="7.50416" width="11.0254" height="5.077" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                <feGaussianBlur stdDeviation="0.23504" result="effect1_foregroundBlur_63_3929" />
            </filter>
            <filter id="filter5_f_63_3929" x="-0.587511" y="2.69209" width="7.3862" height="8.223" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                <feGaussianBlur stdDeviation="0.23504" result="effect1_foregroundBlur_63_3929" />
            </filter>
            <filter id="filter6_f_63_3929" x="-1.35514" y="-2.5969" width="12.6322" height="11.6541" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                <feGaussianBlur stdDeviation="1.65243" result="effect1_foregroundBlur_63_3929" />
            </filter>
            <filter id="filter7_f_63_3929" x="2.41249" y="14.6107" width="8.30246" height="5.98093" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                <feGaussianBlur stdDeviation="0.23504" result="effect1_foregroundBlur_63_3929" />
            </filter>
            <filter id="filter8_f_63_3929" x="8.53285" y="15.261" width="3.42429" height="5.33072" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                <feGaussianBlur stdDeviation="0.23504" result="effect1_foregroundBlur_63_3929" />
            </filter>
            <radialGradient id="paint0_radial_63_3929" cx="0" cy="0" r="1" gradientTransform="matrix(-0.415601 -9.95993 14.9426 -0.597686 7.55757 16.9435)" gradientUnits="userSpaceOnUse">
                <stop offset="0.141612" stopColor="#1ABD4D" />
                <stop offset="0.247515" stopColor="#6EC30D" />
                <stop offset="0.311547" stopColor="#8AC502" />
                <stop offset="0.366013" stopColor="#A2C600" />
                <stop offset="0.445673" stopColor="#C8C903" />
                <stop offset="0.540305" stopColor="#EBCB03" />
                <stop offset="0.615636" stopColor="#F7CD07" />
                <stop offset="0.699345" stopColor="#FDCD04" />
                <stop offset="0.771242" stopColor="#FDCE05" />
                <stop offset="0.860566" stopColor="#FFCE0A" />
            </radialGradient>
            <radialGradient id="paint1_radial_63_3929" cx="0" cy="0" r="1" gradientTransform="matrix(7.05806 -1.69631e-05 -9.92038e-06 8.92438 16.8775 5.30683)" gradientUnits="userSpaceOnUse">
                <stop offset="0.408458" stopColor="#FB4E5A" />
                <stop offset="1" stopColor="#FF4540" />
            </radialGradient>
            <radialGradient id="paint2_radial_63_3929" cx="0" cy="0" r="1" gradientTransform="matrix(-9.88885 5.36243 7.4323 13.1383 13.023 -1.40182)" gradientUnits="userSpaceOnUse">
                <stop offset="0.231273" stopColor="#FF4541" />
                <stop offset="0.311547" stopColor="#FF4540" />
                <stop offset="0.457516" stopColor="#FF4640" />
                <stop offset="0.540305" stopColor="#FF473F" />
                <stop offset="0.699346" stopColor="#FF5138" />
                <stop offset="0.771242" stopColor="#FF5B33" />
                <stop offset="0.860566" stopColor="#FF6C29" />
                <stop offset="1" stopColor="#FF8C18" />
            </radialGradient>
            <radialGradient id="paint3_radial_63_3929" cx="0" cy="0" r="1" gradientTransform="matrix(-17.9337 -22.9206 -8.64137 6.48127 10.392 18.8119)" gradientUnits="userSpaceOnUse">
                <stop offset="0.131546" stopColor="#0CBA65" />
                <stop offset="0.209784" stopColor="#0BB86D" />
                <stop offset="0.297297" stopColor="#09B479" />
                <stop offset="0.396257" stopColor="#08AD93" />
                <stop offset="0.477124" stopColor="#0AA6A9" />
                <stop offset="0.568425" stopColor="#0D9CC6" />
                <stop offset="0.667385" stopColor="#1893DD" />
                <stop offset="0.768727" stopColor="#258BF1" />
                <stop offset="0.858506" stopColor="#3086FF" />
            </radialGradient>
            <radialGradient id="paint4_radial_63_3929" cx="0" cy="0" r="1" gradientTransform="matrix(-1.26913 10.7101 15.1251 1.71807 9.36848 1.77895)" gradientUnits="userSpaceOnUse">
                <stop offset="0.366013" stopColor="#FF4E3A" />
                <stop offset="0.457516" stopColor="#FF8A1B" />
                <stop offset="0.540305" stopColor="#FFA312" />
                <stop offset="0.615636" stopColor="#FFB60C" />
                <stop offset="0.771242" stopColor="#FFCD0A" />
                <stop offset="0.860566" stopColor="#FECF0A" />
                <stop offset="0.915033" stopColor="#FECF08" />
                <stop offset="1" stopColor="#FDCD01" />
            </radialGradient>
            <radialGradient id="paint5_radial_63_3929" cx="0" cy="0" r="1" gradientTransform="matrix(-3.66844 3.97231 -11.4435 -10.1305 7.58381 1.66783)" gradientUnits="userSpaceOnUse">
                <stop offset="0.315904" stopColor="#FF4C3C" />
                <stop offset="0.603818" stopColor="#FF692C" />
                <stop offset="0.726837" stopColor="#FF7825" />
                <stop offset="0.884534" stopColor="#FF8D1B" />
                <stop offset="1" stopColor="#FF9F13" />
            </radialGradient>
            <radialGradient id="paint6_radial_63_3929" cx="0" cy="0" r="1" gradientTransform="matrix(-9.88885 -5.36243 7.4323 -13.1383 13.0231 21.3527)" gradientUnits="userSpaceOnUse">
                <stop offset="0.231273" stopColor="#0FBC5F" />
                <stop offset="0.311547" stopColor="#0FBC5F" />
                <stop offset="0.366013" stopColor="#0FBC5E" />
                <stop offset="0.457516" stopColor="#0FBC5D" />
                <stop offset="0.540305" stopColor="#12BC58" />
                <stop offset="0.699346" stopColor="#28BF3C" />
                <stop offset="0.771242" stopColor="#38C02B" />
                <stop offset="0.860566" stopColor="#52C218" />
                <stop offset="0.915033" stopColor="#67C30F" />
                <stop offset="1" stopColor="#86C504" />
            </radialGradient>
            <linearGradient id="paint7_linear_63_3929" x1="9.00293" y1="17.9264" x2="11.4869" y2="17.9264" gradientUnits="userSpaceOnUse">
                <stop stopColor="#0FBC5C" />
                <stop offset="1" stopColor="#0CBA65" />
            </linearGradient>
        </defs>
    </svg>
);

// GitHub Icon (20x20) - Renders with its original static fill="white"
export const GithubIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <g clipPath="url(#clip0_63_3926)">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10.0083 0C4.47396 0 0 4.50694 0 10.0826C0 14.5396 2.86662 18.3123 6.84338 19.6476C7.34058 19.748 7.5227 19.4306 7.5227 19.1637C7.5227 18.93 7.50631 18.1288 7.50631 17.2939C4.72225 17.895 4.14249 16.092 4.14249 16.092C3.69508 14.9235 3.03215 14.6232 3.03215 14.6232C2.12092 14.0055 3.09852 14.0055 3.09852 14.0055C4.1093 14.0723 4.63969 15.0405 4.63969 15.0405C5.53432 16.5761 6.97592 16.1422 7.55588 15.8751C7.63865 15.224 7.90394 14.7733 8.18563 14.523C5.96514 14.2893 3.62891 13.4213 3.62891 9.54836C3.62891 8.44662 4.02634 7.54523 4.65608 6.8442C4.55672 6.59386 4.20866 5.5587 4.75564 4.17322C4.75564 4.17322 5.60069 3.90608 7.5061 5.20818C8.32188 4.98747 9.16317 4.8752 10.0083 4.87425C10.8533 4.87425 11.7148 4.99123 12.5102 5.20818C14.4159 3.90608 15.2609 4.17322 15.2609 4.17322C15.8079 5.5587 15.4596 6.59386 15.3603 6.8442C16.0066 7.54523 16.3876 8.44662 16.3876 9.54836C16.3876 13.4213 14.0514 14.2725 11.8143 14.523C12.179 14.8401 12.4936 15.441 12.4936 16.3926C12.4936 17.7446 12.4773 18.8298 12.4773 19.1635C12.4773 19.4306 12.6596 19.748 13.1566 19.6478C17.1333 18.3121 20 14.5396 20 10.0826C20.0163 4.50694 15.526 0 10.0083 0Z"
                fill="white"
            />
        </g>
        <defs>
            <clipPath id="clip0_63_3926">
                <rect width="20" height="20" fill="white" />
            </clipPath>
        </defs>
    </svg>
);
export const LoadingIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
    return (
        <svg className="animate-spin h-5 w-5 text-current shrink-0" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
    )
}

export const ChevronLeftIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
    return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path d="M12.6668 8.00004H3.3335M8.00016 3.33337L3.3335 8.00004L8.00016 12.6667" stroke="#111827" strokeWidth="round" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

    )
}