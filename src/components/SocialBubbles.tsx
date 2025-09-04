
'use client';

import { Facebook, Twitter, Instagram, Linkedin, Github } from 'lucide-react';
import { motion } from 'framer-motion';

const socialLinks = [
  { icon: Facebook, href: '#', name: 'Facebook' },
  { icon: Twitter, href: '#', name: 'Twitter' },
  { icon: Instagram, href: 'https://www.instagram.com/kaif.________________?igsh=ZHlhY3VsbHJvdnVw&utm_source=qr', name: 'Instagram' },
  { icon: Linkedin, href: '#', name: 'LinkedIn' },
  { icon: Github, href: '#', name: 'GitHub' },
];

export function SocialBubbles() {
  return (
    <div className="flex justify-center items-center gap-2 md:gap-4 my-4 md:my-0">
      {socialLinks.map((social, index) => (
        <motion.div
          key={social.name}
          className="social-bubble-container"
          style={{
            animationDelay: `${index * 2}s`,
            animationDuration: `${10 + index * 2}s`
          }}
        >
          <a
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.name}
            className="social-bubble w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/20 border border-white/20 backdrop-blur-md flex items-center justify-center text-foreground hover:text-primary"
          >
            <social.icon className="w-5 h-5 md:w-6 md:h-6" />
          </a>
        </motion.div>
      ))}
    </div>
  );
}
