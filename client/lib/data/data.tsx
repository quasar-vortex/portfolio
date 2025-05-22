import {
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiReact,
  SiTypescript,
  SiExpress,
  SiZod,
  SiPostman,
  SiTailwindcss,
  SiLinux,
  SiNginx,
  SiFirewalla,
  SiMikrotik,
} from "react-icons/si";
import { GrDocker, GrGithub } from "react-icons/gr";

export const siteData = {
  hero: {
    name: "Jeremy Barber",
    titles: [
      "Full-Stack Developer",
      "Infrastructure-Aware Coder",
      "Network Troubleshooter",
      "Root Cause Analyst",
      "Command Line Specialist",
      "MySQL Database Admin",
      "Linux Server Admin",
      "Node.js + React Specialist",
    ],

    description:
      "Former tech support engineer turned full-stack developer, combining hands-on Linux expertise with a strong foundation in backend systems. Focused on building robust web apps using React, Node.js, and MySQL.",
    cta: {
      label: "View Projects",
      href: "/projects",
    },
  },
  about: {
    title: "About Me",
    content: `
I'm a Fullstack Developer with a background in Linux systems, backend troubleshooting, and technical support for SaaS and on-premise platforms. After graduating from a fullstack coding bootcamp, I’ve spent the last few years working hands-on with production systems — writing and debugging SQL, managing VPNs and firewalls, configuring servers, and resolving real-world infrastructure issues.

Now, I’m focused on software engineering — building clean, maintainable code with React, Node.js, TypeScript, and MySQL. I bring a rare blend of frontend development skills, backend logic, and deep technical troubleshooting experience. I'm confident navigating both codebases and command lines, and I'm ready to contribute to a team building meaningful, production-ready software.
    `.trim(),
  },
  skills: [
    { label: "React.js", icon: SiReact },
    { label: "Next.js", icon: SiNextdotjs },
    { label: "Node.js", icon: SiNodedotjs },
    { label: "TypeScript", icon: SiTypescript },
    { label: "Express.js", icon: SiExpress },
    { label: "MySQL", icon: SiMysql },
    { label: "Zod Validation", icon: SiZod },
    { label: "Tailwind CSS", icon: SiTailwindcss },
    { label: "Linux (Ubuntu, RedHat, Oracle)", icon: SiLinux },
    { label: "Docker", icon: GrDocker },
    { label: "API Troubleshooting (REST/SOAP)", icon: SiPostman },
    { label: "Networking (TCP/IP, VPN, Firewalls)", icon: SiMikrotik },
    { label: "SSH & Remote Access", icon: GrGithub },
    { label: "Nginx", icon: SiNginx },
    { label: "Git & GitHub", icon: GrGithub },
  ],
  contact: {
    email: "jeremydanielbarber@outlook.com",
    phone: "702-513-6632",
    location: "Las Vegas, NV",
    cta: "Get in touch to collaborate or discuss opportunities.",
  },
};
