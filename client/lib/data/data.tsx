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
      "Support engineer and full-stack developer focused on Linux, infrastructure, and production systems. I troubleshoot live issues, debug backend code, and build reliable applications using React, Node.js, and MySQL. Currently pursuing AWS Solutions Architect certification.",
    cta: {
      label: "View Projects",
      href: "/projects",
    },
  },
  about: {
    title: "About Me",
    content: `
I'm a Linux-focused Application Support Engineer and Developer with hands-on experience supporting infrastructure and applications across SaaS and on-premise environments. I’ve solved issues ranging from database failures and broken APIs to VPN, firewall, and server misconfigurations.

I build clean, maintainable software using Node.js, TypeScript, React, and MySQL, always keeping production behavior and stability in mind. I regularly work in CLI environments, review system logs, tune configurations, and create tools that stand up to real-world demands. I'm currently pursuing the AWS Solutions Architect certification to deepen my cloud expertise and expand my infrastructure capabilities.
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
