import { MockPostCardTypes } from "@/types";

const PostCardMock: MockPostCardTypes[] = [
  {
    id: 1,
    title: "[취약성 경고] Microsoft의 여러  보안 취약점에 대한 CNNVD의",
    company: "Microsoft",
    reportContent:
      "Microsoft Windows 10 21H1 (OS 빌드 19043.1110)에서 발견된 취약점을 보고합니다.",
    date: new Date(2024, 7, 27), // 2024년 8월 27일
    views: "1200",
    label: "취약점 경고",
  },
  {
    id: 2,
    title: "취약점 보고서 2",
    company: "Adobe",
    reportContent:
      "Adobe Acrobat Reader에서 원격 코드 실행 취약점이 발견되었습니다.",
    date: new Date(2024, 0, 1), // 2024년 1월 1일
    views: "800",
    label: "취약점 보고서",
  },
  {
    id: 3,
    title: "취약점 보고서 3",
    company: "Apple",
    reportContent: "Apple iOS 15.1에서 제로데이 취약점이 보고되었습니다.",
    date: new Date(2024, 5, 3), // 2024년 6월 3일
    views: "1500",
    label: "취약점 경고",
  },
  {
    id: 4,
    title: "취약점 보고서 4",
    company: "Google",
    reportContent:
      "Google Chrome 브라우저에서 발견된 메모리 누수 취약점에 대한 보고서입니다.",
    date: new Date(2024, 6, 10), // 2024년 7월 10일
    views: "2000",
    label: "취약점 알림",
  },
  {
    id: 5,
    title: "취약점 보고서 5",
    company: "Linux",
    reportContent:
      "Linux Kernel 5.x 버전에서 발견된 권한 상승 취약점에 대한 보고서입니다.",
    date: new Date(2024, 5, 17), // 2024년 6월 17일
    views: "1100",
    label: "취약점 경고",
  },
  {
    id: 6,
    title: "취약점 보고서 6",
    company: "Oracle",
    reportContent:
      "Oracle WebLogic 서버에서 원격 코드 실행 취약점이 발견되었습니다.",
    date: new Date(2024, 7, 1), // 2024년 8월 1일
    views: "950",
    label: "취약점 보고서",
  },
  {
    id: 7,
    title: "취약점 보고서 7",
    company: "VMware",
    reportContent:
      "VMware vSphere에서 발견된 보안 취약점에 대한 긴급 보고서입니다.",
    date: new Date(2024, 7, 5), // 2024년 8월 5일
    views: "1300",
    label: "취약점 알림",
  },
  {
    id: 8,
    title: "취약점 보고서 8",
    company: "Cisco",
    reportContent: "Cisco ASA에서 발견된 보안 취약점에 대한 보고서입니다.",
    date: new Date(2024, 7, 3), // 2024년 8월 3일
    views: "700",
    label: "취약점 경고",
  },
  {
    id: 9,
    title: "취약점 보고서 9",
    company: "Microsoft",
    reportContent:
      "Microsoft Exchange 서버에서 발견된 보안 취약점에 대한 보고서입니다.",
    date: new Date(2024, 6, 20), // 2024년 7월 20일
    views: "1700",
    label: "취약점 보고서",
  },
  {
    id: 10,
    title: "취약점 보고서 10",
    company: "IBM",
    reportContent: "IBM DB2에서 발견된 권한 상승 취약점에 대한 보고서입니다.",
    date: new Date(2024, 6, 15), // 2024년 7월 15일
    views: "1400",
    label: "취약점 알림",
  },
  {
    id: 11,
    title: "취약점 보고서 11",
    company: "Google",
    reportContent: "Google Cloud에서 발견된 보안 취약점에 대한 보고서입니다.",
    date: new Date(2023, 8, 2),
    views: "2200",
    label: "취약점 경고",
  },
  {
    id: 12,
    title: "취약점 보고서 12",
    company: "Microsoft",
    reportContent: "Microsoft Azure에서 발생한 취약점에 대한 보고서입니다.",
    date: new Date(2023, 8, 3),
    views: "1800",
    label: "취약점 보고서",
  },
  {
    id: 13,
    title: "취약점 보고서 13",
    company: "Apple",
    reportContent: "Apple macOS에서 발견된 취약점 보고서입니다.",
    date: new Date(2023, 8, 4),
    views: "900",
    label: "취약점 알림",
  },
  {
    id: 14,
    title: "취약점 보고서 14",
    company: "Cisco",
    reportContent: "Cisco 장비에서 발생한 보안 취약점에 대한 보고서입니다.",
    date: new Date(2023, 8, 5),
    views: "800",
    label: "취약점 경고",
  },
  {
    id: 15,
    title: "취약점 보고서 15",
    company: "Adobe",
    reportContent: "Adobe Photoshop에서 발견된 취약점에 대한 보고서입니다.",
    date: new Date(2023, 8, 6),
    views: "500",
    label: "취약점 보고서",
  },
  {
    id: 16,
    title: "취약점 보고서 16",
    company: "Oracle",
    reportContent:
      "Oracle Database에서 발생한 보안 취약점에 대한 보고서입니다.",
    date: new Date(2023, 8, 7),
    views: "1300",
    label: "취약점 알림",
  },
  {
    id: 17,
    title: "취약점 보고서 17",
    company: "VMware",
    reportContent: "VMware ESXi에서 발생한 보안 취약점에 대한 보고서입니다.",
    date: new Date(2023, 8, 8),
    views: "1200",
    label: "취약점 경고",
  },
  {
    id: 18,
    title: "취약점 보고서 18",
    company: "Linux",
    reportContent: "Linux 서버에서 발생한 보안 취약점에 대한 보고서입니다.",
    date: new Date(2023, 8, 9),
    views: "900",
    label: "취약점 보고서",
  },
  {
    id: 19,
    title: "취약점 보고서 19",
    company: "Google",
    reportContent: "Google Android에서 발생한 취약점에 대한 보고서입니다.",
    date: new Date(2023, 8, 10),
    views: "1600",
    label: "취약점 알림",
  },
  {
    id: 20,
    title: "취약점 보고서 20",
    company: "Microsoft",
    reportContent: "Microsoft Office에서 발생한 취약점에 대한 보고서입니다.",
    date: new Date(2023, 8, 11),
    views: "1800",
    label: "취약점 경고",
  },
];

export default PostCardMock;
