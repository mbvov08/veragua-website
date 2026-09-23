"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

type NavLink = { href: string; label: string };

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
  links: NavLink[];
};

export function MobileMenu({ open, onClose, links }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-40 bg-verde-950 md:hidden"
        >
          <motion.nav
            initial={{ y: -16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -16, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="flex h-full flex-col items-center justify-center gap-8"
          >
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className="font-heading text-2xl tracking-wide text-beige-100"
              >
                {link.label}
              </Link>
            ))}
          </motion.nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
