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
  SiMikrotik,
} from "react-icons/si";
import { GrGithub } from "react-icons/gr";

export const siteData = {
  hero: {
    name: "Jeremy Barber",
    titles: [
      "Application Support Engineer",
      "Infrastructure-Aware Developer",
      "Root Cause Analyst",
      "Linux & Networking Specialist",
      "Command Line Expert",
      "MySQL Troubleshooter",
      "Full-Stack Problem Solver",
      "Node.js + React Developer",
    ],
    description:
      "Application support engineer with full-stack development skills. I combine backend debugging and infrastructure knowledge to solve production issues and build reliable systems. Experienced with React, Node.js, MySQL, and Linux environments.",
    cta: {
      label: "View Projects",
      href: "/projects",
    },
  },
  about: {
    title: "About Me",
    content: `
I'm an Application Support Engineer and Developer with a strong background in Linux systems, backend diagnostics, and supporting production environments for SaaS and on-premise platforms. After completing a full-stack coding bootcamp, I spent the past few years troubleshooting and resolving real-world issues such as database inconsistencies, VPN and firewall misconfigurations, broken APIs, and server outages.

My development work focuses on building clean and maintainable software using React, Node.js, TypeScript, and MySQL. I bring a hybrid perspective to engineering by writing code with an understanding of production behavior and by supporting systems under real pressure. Whether I'm building features or resolving tough support cases, I provide value across the entire application lifecycle.
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
    { label: "API Troubleshooting (REST/SOAP)", icon: SiPostman },
    { label: "Networking (TCP/IP, VPN, Firewalls)", icon: SiMikrotik },
    { label: "SSH & Remote Access", icon: GrGithub },
    { label: "Nginx", icon: SiNginx },
    { label: "Git & GitHub", icon: GrGithub },
  ],
  contact: {
    email: "jeremydanielbarber@hotmail.com",
    phone: "702-513-6632",
    location: "Las Vegas, NV",
    cta: "Get in touch to collaborate or discuss opportunities.",
  },
};
