import { SvgState } from "@/types";

export const LightModeIcon: React.FC<SvgState> = ({ className }) => (
  <svg className={className} width="16" height="16" xmlns="http://www.w3.org/2000/svg">
    <path className="light-mode-fill-300" d="M7 0h2v2H7zM12.88 1.637l1.414 1.415-1.415 1.413-1.413-1.414zM14 7h2v2h-2zM12.95 14.433l-1.414-1.413 1.413-1.415 1.415 1.414zM7 14h2v2H7zM2.98 14.364l-1.413-1.415 1.414-1.414 1.414 1.415zM0 7h2v2H0zM3.05 1.706 4.463 3.12 3.05 4.535 1.636 3.12z" />
    <path className="light-mode-fill-400" d="M8 4C5.8 4 4 5.8 4 8s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4Z" />
  </svg>
);

export const DarkModeIcon: React.FC<SvgState> = ({ className }) => (
  <svg className={className} width="16" height="16" xmlns="http://www.w3.org/2000/svg">
    <path className="dark-mode-fill-400" d="M6.2 1C3.2 1.8 1 4.6 1 7.9 1 11.8 4.2 15 8.1 15c3.3 0 6-2.2 6.9-5.2C9.7 11.2 4.8 6.3 6.2 1Z" />
    <path className="dark-mode-fill-500" d="M12.5 5a.625.625 0 0 1-.625-.625 1.252 1.252 0 0 0-1.25-1.25.625.625 0 1 1 0-1.25 1.252 1.252 0 0 0 1.25-1.25.625.625 0 1 1 1.25 0c.001.69.56 1.249 1.25 1.25a.625.625 0 1 1 0 1.25c-.69.001-1.249.56-1.25 1.25A.625.625 0 0 1 12.5 5Z" />
  </svg>
);

export const DropdownArrowIcon: React.FC<SvgState> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none">
    <path fill="currentColor" d="m20.03 9.53-7.5 7.5a.747.747 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 .53-1.28h15a.75.75 0 0 1 .53 1.28Z" />
  </svg>
);

export const DropdownCheckIcon: React.FC<SvgState> = ({ className }) => (
  <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <g id="Check">
      <path id="Vector" d="M22.2969 8.04597L10.2969 20.046C10.1924 20.1509 10.0682 20.2341 9.93142 20.2909C9.79467 20.3476 9.64806 20.3769 9.5 20.3769C9.35193 20.3769 9.20532 20.3476 9.06858 20.2909C8.93183 20.2341 8.80764 20.1509 8.70312 20.046L3.45312 14.796C3.34848 14.6913 3.26547 14.5671 3.20883 14.4304C3.1522 14.2936 3.12305 14.1471 3.12305 13.9991C3.12305 13.8511 3.1522 13.7046 3.20883 13.5678C3.26547 13.4311 3.34848 13.3069 3.45312 13.2022C3.55777 13.0976 3.682 13.0146 3.81873 12.9579C3.95546 12.9013 4.10201 12.8721 4.25 12.8721C4.39799 12.8721 4.54454 12.9013 4.68126 12.9579C4.81799 13.0146 4.94223 13.0976 5.04687 13.2022L9.50094 17.6563L20.705 6.4541C20.9163 6.24276 21.203 6.12402 21.5019 6.12402C21.8008 6.12402 22.0874 6.24276 22.2987 6.4541C22.5101 6.66544 22.6288 6.95209 22.6288 7.25098C22.6288 7.54986 22.5101 7.83651 22.2987 8.04785L22.2969 8.04597Z" fill="#343330"/>
    </g>
  </svg>
);


